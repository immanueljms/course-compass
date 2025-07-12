const express = require('express');
const Review = require('../models/Review');
const Course = require('../models/Course');
const { authenticateToken, canReview, requireVerified } = require('../middleware/auth');
const { body, validationResult, query } = require('express-validator');

const router = express.Router();

// Get reviews for a course
router.get('/course/:courseId', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('verifiedOnly').optional().isBoolean().withMessage('verifiedOnly must be boolean'),
  query('sort').optional().isIn(['helpful', 'recent', 'rating']).withMessage('Invalid sort field')
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
    const verifiedOnly = req.query.verifiedOnly === 'true';
    const sort = req.query.sort || 'helpful';

    // Check if course exists
    const course = await Course.findById(req.params.courseId);
    if (!course || !course.isActive) {
      return res.status(404).json({ 
        error: 'Course not found',
        message: 'Course with this ID does not exist or is not active'
      });
    }

    // Get reviews with options
    const options = {
      verifiedOnly,
      limit: limit + 1 // Get one extra to check if there are more
    };

    let reviews = await Review.findByCourse(req.params.courseId, options);
    const hasMore = reviews.length > limit;
    
    if (hasMore) {
      reviews = reviews.slice(0, limit);
    }

    // Apply sorting
    if (sort === 'recent') {
      reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'rating') {
      reviews.sort((a, b) => b.rating - a.rating);
    }
    // 'helpful' is already sorted by the findByCourse method

    const totalPages = Math.ceil(reviews.length / limit);

    res.json({
      success: true,
      data: reviews,
      course: course.summary,
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
    console.error('Get course reviews error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch reviews',
      message: 'Internal server error'
    });
  }
});

// Get user's reviews
router.get('/user/me', [
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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const options = { limit: limit + 1 };
    let reviews = await Review.findByUser(req.user._id, options);
    
    const hasMore = reviews.length > limit;
    if (hasMore) {
      reviews = reviews.slice(0, limit);
    }

    const totalPages = Math.ceil(reviews.length / limit);

    res.json({
      success: true,
      data: reviews,
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

// Get helpful reviews
router.get('/helpful/list', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const reviews = await Review.findHelpful(limit);
    
    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error('Get helpful reviews error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch helpful reviews',
      message: 'Internal server error'
    });
  }
});

// Create a new review
router.post('/', [
  authenticateToken,
  requireVerified,
  canReview,
  body('courseId').isMongoId().withMessage('Valid course ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().isLength({ min: 10, max: 2000 }).withMessage('Comment must be between 10 and 2000 characters'),
  body('difficulty').optional().isInt({ min: 1, max: 5 }).withMessage('Difficulty must be between 1 and 5'),
  body('workload').optional().isInt({ min: 1, max: 5 }).withMessage('Workload must be between 1 and 5'),
  body('semester').isIn([
    'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4',
    'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8',
    'Summer', 'Winter'
  ]).withMessage('Invalid semester'),
  body('year').isInt({ min: 2020, max: 2030 }).withMessage('Year must be between 2020 and 2030'),
  body('professor').optional().trim().isLength({ max: 100 }).withMessage('Professor name cannot exceed 100 characters'),
  body('isAnonymous').optional().isBoolean().withMessage('isAnonymous must be boolean'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('tags.*').optional().trim().isLength({ max: 50 }).withMessage('Tag cannot exceed 50 characters')
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

    // Check if course exists and is active
    const course = await Course.findById(req.body.courseId);
    if (!course || !course.isActive) {
      return res.status(404).json({ 
        error: 'Course not found',
        message: 'Course with this ID does not exist or is not active'
      });
    }

    // Check if user has already reviewed this course
    const existingReview = await Review.findOne({
      user: req.user._id,
      course: req.body.courseId
    });

    if (existingReview) {
      return res.status(400).json({ 
        error: 'Review already exists',
        message: 'You have already reviewed this course'
      });
    }

    // Create new review
    const review = new Review({
      course: req.body.courseId,
      user: req.user._id,
      rating: req.body.rating,
      comment: req.body.comment,
      difficulty: req.body.difficulty || 3,
      workload: req.body.workload || 3,
      semester: req.body.semester,
      year: req.body.year,
      professor: req.body.professor,
      isAnonymous: req.body.isAnonymous || false,
      tags: req.body.tags || []
    });

    await review.save();

    // Populate user and course info for response
    await review.populate('user', 'name profilePicture department yearOfStudy');
    await review.populate('course', 'code name department');

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ 
      error: 'Failed to create review',
      message: 'Internal server error'
    });
  }
});

// Update a review
router.put('/:reviewId', [
  authenticateToken,
  requireVerified,
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().isLength({ min: 10, max: 2000 }).withMessage('Comment must be between 10 and 2000 characters'),
  body('difficulty').optional().isInt({ min: 1, max: 5 }).withMessage('Difficulty must be between 1 and 5'),
  body('workload').optional().isInt({ min: 1, max: 5 }).withMessage('Workload must be between 1 and 5'),
  body('professor').optional().trim().isLength({ max: 100 }).withMessage('Professor name cannot exceed 100 characters'),
  body('isAnonymous').optional().isBoolean().withMessage('isAnonymous must be boolean'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('tags.*').optional().trim().isLength({ max: 50 }).withMessage('Tag cannot exceed 50 characters')
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

    const review = await Review.findById(req.params.reviewId);
    
    if (!review) {
      return res.status(404).json({ 
        error: 'Review not found',
        message: 'Review with this ID does not exist'
      });
    }

    // Check if user owns this review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        error: 'Access denied',
        message: 'You can only edit your own reviews'
      });
    }

    // Update review
    const updates = {};
    const allowedFields = ['rating', 'comment', 'difficulty', 'workload', 'professor', 'isAnonymous', 'tags'];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    await review.editReview(updates);

    // Populate user and course info for response
    await review.populate('user', 'name profilePicture department yearOfStudy');
    await review.populate('course', 'code name department');

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ 
      error: 'Failed to update review',
      message: 'Internal server error'
    });
  }
});

// Delete a review
router.delete('/:reviewId', [authenticateToken, requireVerified], async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    
    if (!review) {
      return res.status(404).json({ 
        error: 'Review not found',
        message: 'Review with this ID does not exist'
      });
    }

    // Check if user owns this review or is admin
    if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ 
        error: 'Access denied',
        message: 'You can only delete your own reviews'
      });
    }

    await review.remove();

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ 
      error: 'Failed to delete review',
      message: 'Internal server error'
    });
  }
});

// Vote on review (helpful/not helpful)
router.post('/:reviewId/vote', [
  authenticateToken,
  requireVerified,
  body('vote').isIn(['helpful', 'notHelpful']).withMessage('Vote must be helpful or notHelpful')
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

    const review = await Review.findById(req.params.reviewId);
    
    if (!review) {
      return res.status(404).json({ 
        error: 'Review not found',
        message: 'Review with this ID does not exist'
      });
    }

    if (review.isHidden) {
      return res.status(404).json({ 
        error: 'Review not available',
        message: 'This review is not available for voting'
      });
    }

    // Check if user is voting on their own review
    if (review.user.toString() === req.user._id.toString()) {
      return res.status(400).json({ 
        error: 'Cannot vote on own review',
        message: 'You cannot vote on your own review'
      });
    }

    // Add vote
    if (req.body.vote === 'helpful') {
      await review.addHelpfulVote(req.user._id);
    } else {
      await review.addNotHelpfulVote(req.user._id);
    }

    res.json({
      success: true,
      message: 'Vote recorded successfully',
      data: {
        helpfulVotes: review.helpfulVotes,
        notHelpfulVotes: review.notHelpfulVotes,
        helpfulScore: review.helpfulScore
      }
    });
  } catch (error) {
    console.error('Vote on review error:', error);
    res.status(500).json({ 
      error: 'Failed to record vote',
      message: 'Internal server error'
    });
  }
});

// Remove vote on review
router.delete('/:reviewId/vote', [authenticateToken, requireVerified], async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    
    if (!review) {
      return res.status(404).json({ 
        error: 'Review not found',
        message: 'Review with this ID does not exist'
      });
    }

    await review.removeVote(req.user._id);

    res.json({
      success: true,
      message: 'Vote removed successfully',
      data: {
        helpfulVotes: review.helpfulVotes,
        notHelpfulVotes: review.notHelpfulVotes,
        helpfulScore: review.helpfulScore
      }
    });
  } catch (error) {
    console.error('Remove vote error:', error);
    res.status(500).json({ 
      error: 'Failed to remove vote',
      message: 'Internal server error'
    });
  }
});

// Report a review
router.post('/:reviewId/report', [
  authenticateToken,
  requireVerified,
  body('reason').isIn(['spam', 'inappropriate', 'fake', 'other']).withMessage('Invalid report reason'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
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

    const review = await Review.findById(req.params.reviewId);
    
    if (!review) {
      return res.status(404).json({ 
        error: 'Review not found',
        message: 'Review with this ID does not exist'
      });
    }

    if (review.isHidden) {
      return res.status(404).json({ 
        error: 'Review not available',
        message: 'This review is not available for reporting'
      });
    }

    // Check if user is reporting their own review
    if (review.user.toString() === req.user._id.toString()) {
      return res.status(400).json({ 
        error: 'Cannot report own review',
        message: 'You cannot report your own review'
      });
    }

    await review.reportReview(req.user._id, req.body.reason, req.body.description);

    res.json({
      success: true,
      message: 'Review reported successfully'
    });
  } catch (error) {
    console.error('Report review error:', error);
    res.status(500).json({ 
      error: 'Failed to report review',
      message: 'Internal server error'
    });
  }
});

// Get review statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Review.getStats();
    
    res.json({
      success: true,
      data: stats[0] || {
        totalReviews: 0,
        avgRating: 0,
        avgDifficulty: 0,
        avgWorkload: 0,
        totalHelpfulVotes: 0,
        totalNotHelpfulVotes: 0
      }
    });
  } catch (error) {
    console.error('Get review stats error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch review statistics',
      message: 'Internal server error'
    });
  }
});

module.exports = router; 