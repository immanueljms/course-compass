const express = require('express');
const Course = require('../models/Course');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { body, validationResult, query } = require('express-validator');

const router = express.Router();

// Get all courses with pagination and filtering
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('department').optional().isString().withMessage('Department must be a string'),
  query('semester').optional().isString().withMessage('Semester must be a string'),
  query('search').optional().isString().withMessage('Search query must be a string'),
  query('sort').optional().isIn(['rating', 'name', 'code', 'credits', 'difficulty', 'workload']).withMessage('Invalid sort field'),
  query('order').optional().isIn(['asc', 'desc']).withMessage('Order must be asc or desc'),
  query('category').optional().isString().withMessage('Category must be a string'),
  query('minRating').optional().isFloat({ min: 0, max: 5 }).withMessage('Min rating must be between 0 and 5'),
  query('maxDifficulty').optional().isFloat({ min: 1, max: 5 }).withMessage('Max difficulty must be between 1 and 5'),
  query('maxWorkload').optional().isFloat({ min: 1, max: 5 }).withMessage('Max workload must be between 1 and 5')
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
    const query = { isActive: true };

    if (req.query.department) {
      query.department = req.query.department;
    }

    if (req.query.semester) {
      query.semester = req.query.semester;
    }

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.minRating) {
      query.rating = { $gte: parseFloat(req.query.minRating) };
    }

    if (req.query.maxDifficulty) {
      query.difficulty = { ...query.difficulty, $lte: parseFloat(req.query.maxDifficulty) };
    }

    if (req.query.maxWorkload) {
      query.workload = { ...query.workload, $lte: parseFloat(req.query.maxWorkload) };
    }

    // Build sort object
    const sortField = req.query.sort || 'rating';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;
    const sort = { [sortField]: sortOrder };

    let courses;
    let total;

    if (req.query.search) {
      // Use search method for text search
      courses = await Course.search(req.query.search);
      total = courses.length;
      courses = courses.slice(skip, skip + limit);
    } else {
      // Use regular query
      [courses, total] = await Promise.all([
        Course.find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .select('code name department credits semester rating totalReviews difficulty workload category'),
        Course.countDocuments(query)
      ]);
    }

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: courses,
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
    console.error('Get courses error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch courses',
      message: 'Internal server error'
    });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ 
        error: 'Course not found',
        message: 'Course with this ID does not exist'
      });
    }

    if (!course.isActive) {
      return res.status(404).json({ 
        error: 'Course not available',
        message: 'This course is not currently available'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Get course by ID error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch course',
      message: 'Internal server error'
    });
  }
});

// Get popular courses
router.get('/popular/list', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const courses = await Course.findPopular(limit);
    
    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Get popular courses error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch popular courses',
      message: 'Internal server error'
    });
  }
});

// Get courses by department
router.get('/department/:department', async (req, res) => {
  try {
    const courses = await Course.findByDepartment(req.params.department);
    
    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Get courses by department error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch courses by department',
      message: 'Internal server error'
    });
  }
});

// Get courses by semester
router.get('/semester/:semester', async (req, res) => {
  try {
    const courses = await Course.findBySemester(req.params.semester);
    
    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Get courses by semester error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch courses by semester',
      message: 'Internal server error'
    });
  }
});

// Search courses
router.get('/search/query', async (req, res) => {
  try {
    const { q: searchQuery } = req.query;
    
    if (!searchQuery || searchQuery.trim().length < 2) {
      return res.status(400).json({ 
        error: 'Invalid search query',
        message: 'Search query must be at least 2 characters long'
      });
    }

    const courses = await Course.search(searchQuery.trim());
    
    res.json({
      success: true,
      data: courses,
      query: searchQuery
    });
  } catch (error) {
    console.error('Search courses error:', error);
    res.status(500).json({ 
      error: 'Failed to search courses',
      message: 'Internal server error'
    });
  }
});

// Get department statistics
router.get('/stats/departments', async (req, res) => {
  try {
    const stats = await Course.getDepartmentStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get department stats error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch department statistics',
      message: 'Internal server error'
    });
  }
});

// Get course statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const [totalCourses, avgRating, totalReviews, popularCourses] = await Promise.all([
      Course.countDocuments({ isActive: true }),
      Course.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, avg: { $avg: '$rating' } } }
      ]),
      Course.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, total: { $sum: '$totalReviews' } } }
      ]),
      Course.findPopular(5)
    ]);

    res.json({
      success: true,
      data: {
        totalCourses,
        avgRating: avgRating[0]?.avg || 0,
        totalReviews: totalReviews[0]?.total || 0,
        popularCourses
      }
    });
  } catch (error) {
    console.error('Get course stats error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch course statistics',
      message: 'Internal server error'
    });
  }
});

// Admin routes for course management
router.post('/', [
  authenticateToken,
  requireAdmin,
  body('code').trim().notEmpty().withMessage('Course code is required'),
  body('name').trim().notEmpty().withMessage('Course name is required'),
  body('department').isIn([
    'Aerospace Engineering',
    'Computer Science and Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Metallurgical and Materials Engineering',
    'Naval Architecture and Ocean Engineering',
    'Engineering Physics',
    'Physics',
    'Mathematics',
    'Chemistry',
    'Biology',
    'Humanities',
    'Other'
  ]).withMessage('Invalid department'),
  body('credits').isInt({ min: 1, max: 20 }).withMessage('Credits must be between 1 and 20'),
  body('semester').isIn([
    'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4',
    'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8',
    'Summer', 'Winter'
  ]).withMessage('Invalid semester'),
  body('description').trim().notEmpty().withMessage('Course description is required'),
  body('difficulty').isInt({ min: 1, max: 5 }).withMessage('Difficulty must be between 1 and 5'),
  body('workload').isInt({ min: 1, max: 5 }).withMessage('Workload must be between 1 and 5')
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

    // Check if course code already exists
    const existingCourse = await Course.findOne({ code: req.body.code.toUpperCase() });
    if (existingCourse) {
      return res.status(400).json({ 
        error: 'Course code already exists',
        message: 'A course with this code already exists'
      });
    }

    const course = new Course({
      ...req.body,
      code: req.body.code.toUpperCase()
    });

    await course.save();

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ 
      error: 'Failed to create course',
      message: 'Internal server error'
    });
  }
});

// Update course (admin only)
router.put('/:id', [
  authenticateToken,
  requireAdmin,
  body('name').optional().trim().notEmpty().withMessage('Course name cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Course description cannot be empty'),
  body('difficulty').optional().isInt({ min: 1, max: 5 }).withMessage('Difficulty must be between 1 and 5'),
  body('workload').optional().isInt({ min: 1, max: 5 }).withMessage('Workload must be between 1 and 5'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean'),
  body('isPopular').optional().isBoolean().withMessage('isPopular must be boolean')
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

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ 
        error: 'Course not found',
        message: 'Course with this ID does not exist'
      });
    }

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ 
      error: 'Failed to update course',
      message: 'Internal server error'
    });
  }
});

// Delete course (admin only)
router.delete('/:id', [authenticateToken, requireAdmin], async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ 
        error: 'Course not found',
        message: 'Course with this ID does not exist'
      });
    }

    // Soft delete by setting isActive to false
    course.isActive = false;
    await course.save();

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ 
      error: 'Failed to delete course',
      message: 'Internal server error'
    });
  }
});

module.exports = router; 