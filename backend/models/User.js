const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(email) {
        // Only allow @smail.iitm.ac.in email addresses
        return email.endsWith('@smail.iitm.ac.in');
      },
      message: 'Only IIT Madras student emails (@smail.iitm.ac.in) are allowed'
    }
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  department: {
    type: String,
    enum: [
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
    ],
    default: 'Other'
  },
  yearOfStudy: {
    type: Number,
    min: 1,
    max: 4,
    default: 1
  },
  rollNumber: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  helpfulVotes: {
    type: Number,
    default: 0
  },
  preferences: {
    notifications: {
      type: Boolean,
      default: true
    },
    emailUpdates: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    }
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ department: 1 });

// Virtual for user's full profile
userSchema.virtual('fullProfile').get(function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    department: this.department,
    yearOfStudy: this.yearOfStudy,
    profilePicture: this.profilePicture,
    reviewCount: this.reviewCount,
    helpfulVotes: this.helpfulVotes,
    isVerified: this.isVerified,
    createdAt: this.createdAt
  };
});

// Method to check if user is IIT Madras student
userSchema.methods.isIITMadrasStudent = function() {
  return this.email.endsWith('@smail.iitm.ac.in');
};

// Method to update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

// Method to increment review count
userSchema.methods.incrementReviewCount = function() {
  this.reviewCount += 1;
  return this.save();
};

// Method to add helpful vote
userSchema.methods.addHelpfulVote = function() {
  this.helpfulVotes += 1;
  return this.save();
};

// Static method to find by email domain
userSchema.statics.findByEmailDomain = function(domain) {
  return this.find({ email: { $regex: `@${domain}$` } });
};

// Static method to get department statistics
userSchema.statics.getDepartmentStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$department',
        count: { $sum: 1 },
        avgReviewCount: { $avg: '$reviewCount' },
        avgHelpfulVotes: { $avg: '$helpfulVotes' }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};

// Pre-save middleware to validate email domain
userSchema.pre('save', function(next) {
  if (this.isModified('email') && !this.email.endsWith('@smail.iitm.ac.in')) {
    return next(new Error('Only IIT Madras student emails are allowed'));
  }
  next();
});

// Pre-save middleware to update timestamps
userSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('User', userSchema); 