const express = require('express');
const User = require('../models/User');
const Review = require('../models/Review');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { body, validationResult, query } = require('express-validator');

const router = express.Router();

// Get all users (admin only)
router.get('/', [
  authenticateToken,
  requireAdmin,
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('department').optional().isString().withMessage('Department must be a string'),
  query('yearOfStudy').optional().isInt({ min: 1, max: 4 }).withMessage('Year of study must be between 1 and 4'),
  query('isVerified').optional().isBoolean().withMessage('isVerified must be boolean'),
  query('search').optional().isString().withMessage('Search query must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        message: 'Please check your query parameters',
        details: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};

    if (req.query.department) {
      query.department = req.query.department;
    }

    if (req.query.yearOfStudy) {
      query.yearOfStudy = parseInt(req.query.yearOfStudy);
    }

    if (req.query.isVerified !== undefined) {
      query.isVerified = req.query.isVerified === 'true';
    }

    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { rollNumber: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-__v')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: users.map(user => user.fullProfile),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch users',
      message: 'Internal server error'
    });
  }
});

// Get user by ID
router.get('/:userId', [authenticateToken, requireAdmin], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-__v');
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User with this ID does not exist'
      });
    }

    res.json({
      success: true,
      data: user.fullProfile
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user',
      message: 'Internal server error'
    });
  }
});

// Get user's reviews
router.get('/:userId/reviews', [
  authenticateToken,
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        message: 'Please check your query parameters',
        details: errors.array()
      });
    }

    // Check if user exists
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User with this ID does not exist'
      });
    }

    // Check if requesting user can view this user's reviews
    if (req.user._id.toString() !== req.params.userId && !req.user.isAdmin) {
      return res.status(403).json({ 
        error: 'Access denied',
        message: 'You can only view your own reviews'
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const options = { limit: limit + 1 };
    let reviews = await Review.findByUser(req.params.userId, options);
    
    const hasMore = reviews.length > limit;
    if (hasMore) {
      reviews = reviews.slice(0, limit);
    }

    const totalPages = Math.ceil(reviews.length / limit);

    res.json({
      success: true,
      data: reviews,
      user: user.fullProfile,
      pagination: {
        page,
        limit,
        total: reviews.length,
        totalPages,
        hasNext: hasMore,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user reviews',
      message: 'Internal server error'
    });
  }
});

// Update user (admin only)
router.put('/:userId', [
  authenticateToken,
  requireAdmin,
  body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('department').optional().isIn([
    'Aerospace Engineering',
    'Computer Science and Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Metallurgical and Materials Engineering',
    'Naval Architecture and Ocean Engineering',
    'Engineering Physics',
    'Other'
  ]).withMessage('Invalid department'),
  body('yearOfStudy').optional().isInt({ min: 1, max: 4 }).withMessage('Year of study must be between 1 and 4'),
  body('rollNumber').optional().trim().isLength({ min: 1, max: 20 }).withMessage('Roll number must be between 1 and 20 characters'),
  body('isVerified').optional().isBoolean().withMessage('isVerified must be boolean'),
  body('isAdmin').optional().isBoolean().withMessage('isAdmin must be boolean'),
  body('preferences.notifications').optional().isBoolean().withMessage('Notifications preference must be boolean'),
  body('preferences.emailUpdates').optional().isBoolean().withMessage('Email updates preference must be boolean'),
  body('preferences.theme').optional().isIn(['light', 'dark']).withMessage('Theme must be light or dark')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        message: 'Please check your input',
        details: errors.array()
      });
    }

    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User with this ID does not exist'
      });
    }

    const allowedUpdates = [
      'name', 'department', 'yearOfStudy', 'rollNumber', 
      'isVerified', 'isAdmin', 'preferences'
    ];

    const updates = {};
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-__v');

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser.fullProfile
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ 
      error: 'Failed to update user',
      message: 'Internal server error'
    });
  }
});

// Delete user (admin only)
router.delete('/:userId', [authenticateToken, requireAdmin], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User with this ID does not exist'
      });
    }

    // Delete user's reviews
    await Review.deleteMany({ user: user._id });

    // Delete user account
    await User.findByIdAndDelete(user._id);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ 
      error: 'Failed to delete user',
      message: 'Internal server error'
    });
  }
});

// Get user statistics
router.get('/stats/overview', [authenticateToken, requireAdmin], async (req, res) => {
  try {
    const [userStats, departmentStats] = await Promise.all([
      User.countDocuments(),
      User.getDepartmentStats()
    ]);

    res.json({
      success: true,
      data: {
        totalUsers: userStats,
        departmentStats
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user statistics',
      message: 'Internal server error'
    });
  }
});

// Get user activity
router.get('/:userId/activity', [authenticateToken], async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User with this ID does not exist'
      });
    }

    // Check if requesting user can view this user's activity
    if (req.user._id.toString() !== req.params.userId && !req.user.isAdmin) {
      return res.status(403).json({ 
        error: 'Access denied',
        message: 'You can only view your own activity'
      });
    }

    const [reviews, helpfulVotes] = await Promise.all([
      Review.findByUser(req.params.userId, { limit: 10 }),
      Review.aggregate([
        { $match: { 'votedBy.user': user._id } },
        { $group: { _id: null, count: { $sum: 1 } } }
      ])
    ]);

    res.json({
      success: true,
      data: {
        user: user.fullProfile,
        recentReviews: reviews,
        totalHelpfulVotes: helpfulVotes[0]?.count || 0,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Get user activity error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user activity',
      message: 'Internal server error'
    });
  }
});

// Verify user (admin only)
router.post('/:userId/verify', [authenticateToken, requireAdmin], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User with this ID does not exist'
      });
    }

    user.isVerified = true;
    await user.save();

    res.json({
      success: true,
      message: 'User verified successfully',
      data: user.fullProfile
    });
  } catch (error) {
    console.error('Verify user error:', error);
    res.status(500).json({ 
      error: 'Failed to verify user',
      message: 'Internal server error'
    });
  }
});

// Unverify user (admin only)
router.post('/:userId/unverify', [authenticateToken, requireAdmin], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User with this ID does not exist'
      });
    }

    user.isVerified = false;
    await user.save();

    res.json({
      success: true,
      message: 'User unverified successfully',
      data: user.fullProfile
    });
  } catch (error) {
    console.error('Unverify user error:', error);
    res.status(500).json({ 
      error: 'Failed to unverify user',
      message: 'Internal server error'
    });
  }
});

// Promote user to admin (admin only)
router.post('/:userId/promote', [authenticateToken, requireAdmin], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User with this ID does not exist'
      });
    }

    user.isAdmin = true;
    await user.save();

    res.json({
      success: true,
      message: 'User promoted to admin successfully',
      data: user.fullProfile
    });
  } catch (error) {
    console.error('Promote user error:', error);
    res.status(500).json({ 
      error: 'Failed to promote user',
      message: 'Internal server error'
    });
  }
});

// Demote user from admin (admin only)
router.post('/:userId/demote', [authenticateToken, requireAdmin], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User with this ID does not exist'
      });
    }

    // Prevent demoting yourself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ 
        error: 'Cannot demote yourself',
        message: 'You cannot demote yourself from admin'
      });
    }

    user.isAdmin = false;
    await user.save();

    res.json({
      success: true,
      message: 'User demoted from admin successfully',
      data: user.fullProfile
    });
  } catch (error) {
    console.error('Demote user error:', error);
    res.status(500).json({ 
      error: 'Failed to demote user',
      message: 'Internal server error'
    });
  }
});

module.exports = router; 