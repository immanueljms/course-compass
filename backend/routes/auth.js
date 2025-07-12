const express = require('express');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken, verifyIITMadrasEmail } = require('../middleware/auth');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Google OAuth login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login',
    failureFlash: true 
  }),
  (req, res) => {
    try {
      // Generate JWT token
      const token = generateToken(req.user._id);
      
      // Redirect to frontend with token
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user.fullProfile))}`);
    } catch (error) {
      console.error('Auth callback error:', error);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/error?message=${encodeURIComponent('Authentication failed')}`);
    }
  }
);

// Logout route
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ 
        error: 'Logout failed',
        message: 'Error during logout'
      });
    }
    res.json({ 
      message: 'Logged out successfully',
      success: true
    });
  });
});

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    res.json({
      success: true,
      user: user.fullProfile
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ 
      error: 'Failed to get user profile',
      message: 'Internal server error'
    });
  }
});

// Update user profile
router.put('/profile', [
  authenticateToken,
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

    const allowedUpdates = [
      'name', 'department', 'yearOfStudy', 'rollNumber', 'preferences'
    ];

    const updates = {};
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User profile not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: user.fullProfile
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      error: 'Failed to update profile',
      message: 'Internal server error'
    });
  }
});

// Check authentication status
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: req.user.fullProfile
    });
  } else {
    res.json({
      authenticated: false,
      user: null
    });
  }
});

// Refresh token
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    const newToken = generateToken(req.user._id);
    res.json({
      success: true,
      token: newToken,
      user: req.user.fullProfile
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ 
      error: 'Failed to refresh token',
      message: 'Internal server error'
    });
  }
});

// Delete account
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        message: 'User account not found'
      });
    }

    // Delete user's reviews
    const Review = require('../models/Review');
    await Review.deleteMany({ user: user._id });

    // Delete user account
    await User.findByIdAndDelete(user._id);

    // Logout
    req.logout((err) => {
      if (err) {
        console.error('Logout error during account deletion:', err);
      }
    });

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ 
      error: 'Failed to delete account',
      message: 'Internal server error'
    });
  }
});

// Get user statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const Review = require('../models/Review');
    
    const [userStats, reviewStats] = await Promise.all([
      User.getDepartmentStats(),
      Review.getStats()
    ]);

    res.json({
      success: true,
      stats: {
        userStats,
        reviewStats: reviewStats[0] || {
          totalReviews: 0,
          avgRating: 0,
          avgDifficulty: 0,
          avgWorkload: 0,
          totalHelpfulVotes: 0,
          totalNotHelpfulVotes: 0
        }
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      error: 'Failed to get statistics',
      message: 'Internal server error'
    });
  }
});

// Error handling middleware for auth routes
router.use((error, req, res, next) => {
  console.error('Auth route error:', error);
  
  if (error.message === 'Only IIT Madras student emails (@smail.iitm.ac.in) are allowed') {
    return res.status(403).json({
      error: 'Access denied',
      message: 'Only IIT Madras students can access this platform'
    });
  }
  
  res.status(500).json({
    error: 'Authentication error',
    message: 'Internal server error'
  });
});

module.exports = router; 