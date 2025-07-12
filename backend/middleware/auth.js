const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        error: 'Access denied. No token provided.',
        message: 'Please log in to access this resource'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const user = await User.findById(decoded.userId).select('-__v');

    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid token.',
        message: 'User not found'
      });
    }

    // Check if user is still an IIT Madras student
    if (!user.isIITMadrasStudent()) {
      return res.status(403).json({ 
        error: 'Access denied.',
        message: 'Only IIT Madras students can access this resource'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Invalid token.',
        message: 'Token is malformed or invalid'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expired.',
        message: 'Please log in again'
      });
    } else {
      console.error('Auth middleware error:', error);
      return res.status(500).json({ 
        error: 'Authentication error.',
        message: 'Internal server error'
      });
    }
  }
};

// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required.',
        message: 'Please log in first'
      });
    }

    if (!req.user.isAdmin) {
      return res.status(403).json({ 
        error: 'Admin access required.',
        message: 'You do not have permission to access this resource'
      });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    return res.status(500).json({ 
      error: 'Authorization error.',
      message: 'Internal server error'
    });
  }
};

// Middleware to check if user is verified
const requireVerified = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required.',
        message: 'Please log in first'
      });
    }

    if (!req.user.isVerified) {
      return res.status(403).json({ 
        error: 'Verification required.',
        message: 'Your account needs to be verified to access this resource'
      });
    }

    next();
  } catch (error) {
    console.error('Verification middleware error:', error);
    return res.status(500).json({ 
      error: 'Authorization error.',
      message: 'Internal server error'
    });
  }
};

// Middleware to check if user can review (has reviewed less than 50 courses)
const canReview = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required.',
        message: 'Please log in first'
      });
    }

    if (req.user.reviewCount >= 50) {
      return res.status(403).json({ 
        error: 'Review limit reached.',
        message: 'You have reached the maximum number of reviews allowed'
      });
    }

    next();
  } catch (error) {
    console.error('Review permission middleware error:', error);
    return res.status(500).json({ 
      error: 'Authorization error.',
      message: 'Internal server error'
    });
  }
};

// Middleware to rate limit based on user
const rateLimitByUser = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();

  return (req, res, next) => {
    if (!req.user) {
      return next();
    }

    const userId = req.user._id.toString();
    const now = Date.now();
    const userRequests = requests.get(userId) || [];

    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => now - time < windowMs);

    if (validRequests.length >= maxRequests) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded.',
        message: 'Too many requests. Please try again later.'
      });
    }

    validRequests.push(now);
    requests.set(userId, validRequests);

    next();
  };
};

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Helper function to verify IIT Madras email
const verifyIITMadrasEmail = (email) => {
  return email && email.toLowerCase().endsWith('@smail.iitm.ac.in');
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireVerified,
  canReview,
  rateLimitByUser,
  generateToken,
  verifyIITMadrasEmail
}; 