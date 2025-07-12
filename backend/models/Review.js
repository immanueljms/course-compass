const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    trim: true,
    minlength: [10, 'Review must be at least 10 characters long'],
    maxlength: [2000, 'Review cannot exceed 2000 characters']
  },
  difficulty: {
    type: Number,
    min: [1, 'Difficulty must be at least 1'],
    max: [5, 'Difficulty cannot exceed 5']
  },
  workload: {
    type: Number,
    min: [1, 'Workload must be at least 1'],
    max: [5, 'Workload cannot exceed 5']
  },
  semester: {
    type: String,
    required: [true, 'Semester is required'],
    enum: [
      'Semester 1',
      'Semester 2',
      'Semester 3',
      'Semester 4',
      'Semester 5',
      'Semester 6',
      'Semester 7',
      'Semester 8',
      'Summer',
      'Winter'
    ]
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [2020, 'Year must be 2020 or later'],
    max: [2030, 'Year cannot exceed 2030']
  },
  professor: {
    type: String,
    trim: true,
    maxlength: [100, 'Professor name cannot exceed 100 characters']
  },
  helpfulVotes: {
    type: Number,
    default: 0,
    min: [0, 'Helpful votes cannot be negative']
  },
  notHelpfulVotes: {
    type: Number,
    default: 0,
    min: [0, 'Not helpful votes cannot be negative']
  },
  votedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    vote: {
      type: String,
      enum: ['helpful', 'notHelpful']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  }],
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
    default: 'neutral'
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  editHistory: [{
    comment: String,
    rating: Number,
    difficulty: Number,
    workload: Number,
    editedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isReported: {
    type: Boolean,
    default: false
  },
  reportCount: {
    type: Number,
    default: 0,
    min: [0, 'Report count cannot be negative']
  },
  reportedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: {
      type: String,
      enum: ['spam', 'inappropriate', 'fake', 'other'],
      required: true
    },
    description: String,
    reportedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isHidden: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for better query performance
reviewSchema.index({ course: 1, createdAt: -1 });
reviewSchema.index({ user: 1, createdAt: -1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ helpfulVotes: -1 });
reviewSchema.index({ isVerified: 1 });
reviewSchema.index({ isHidden: 1 });
reviewSchema.index({ tags: 1 });

// Compound index for unique user-course review
reviewSchema.index({ user: 1, course: 1 }, { unique: true });

// Virtual for review summary
reviewSchema.virtual('summary').get(function() {
  return {
    id: this._id,
    course: this.course,
    user: this.user,
    rating: this.rating,
    comment: this.comment,
    helpfulVotes: this.helpfulVotes,
    notHelpfulVotes: this.notHelpfulVotes,
    createdAt: this.createdAt,
    isVerified: this.isVerified,
    isAnonymous: this.isAnonymous
  };
});

// Virtual for helpful score
reviewSchema.virtual('helpfulScore').get(function() {
  const total = this.helpfulVotes + this.notHelpfulVotes;
  return total > 0 ? (this.helpfulVotes / total) * 100 : 0;
});

// Method to add helpful vote
reviewSchema.methods.addHelpfulVote = function(userId) {
  const existingVote = this.votedBy.find(vote => vote.user.toString() === userId.toString());
  
  if (existingVote) {
    if (existingVote.vote === 'helpful') {
      return Promise.resolve(this); // Already voted helpful
    } else if (existingVote.vote === 'notHelpful') {
      // Change from not helpful to helpful
      this.notHelpfulVotes = Math.max(0, this.notHelpfulVotes - 1);
      this.helpfulVotes += 1;
      existingVote.vote = 'helpful';
    }
  } else {
    // New helpful vote
    this.helpfulVotes += 1;
    this.votedBy.push({
      user: userId,
      vote: 'helpful'
    });
  }
  
  return this.save();
};

// Method to add not helpful vote
reviewSchema.methods.addNotHelpfulVote = function(userId) {
  const existingVote = this.votedBy.find(vote => vote.user.toString() === userId.toString());
  
  if (existingVote) {
    if (existingVote.vote === 'notHelpful') {
      return Promise.resolve(this); // Already voted not helpful
    } else if (existingVote.vote === 'helpful') {
      // Change from helpful to not helpful
      this.helpfulVotes = Math.max(0, this.helpfulVotes - 1);
      this.notHelpfulVotes += 1;
      existingVote.vote = 'notHelpful';
    }
  } else {
    // New not helpful vote
    this.notHelpfulVotes += 1;
    this.votedBy.push({
      user: userId,
      vote: 'notHelpful'
    });
  }
  
  return this.save();
};

// Method to remove vote
reviewSchema.methods.removeVote = function(userId) {
  const voteIndex = this.votedBy.findIndex(vote => vote.user.toString() === userId.toString());
  
  if (voteIndex !== -1) {
    const vote = this.votedBy[voteIndex];
    if (vote.vote === 'helpful') {
      this.helpfulVotes = Math.max(0, this.helpfulVotes - 1);
    } else if (vote.vote === 'notHelpful') {
      this.notHelpfulVotes = Math.max(0, this.notHelpfulVotes - 1);
    }
    this.votedBy.splice(voteIndex, 1);
    return this.save();
  }
  
  return Promise.resolve(this);
};

// Method to report review
reviewSchema.methods.reportReview = function(userId, reason, description = '') {
  const existingReport = this.reportedBy.find(report => report.user.toString() === userId.toString());
  
  if (!existingReport) {
    this.reportedBy.push({
      user: userId,
      reason,
      description
    });
    this.reportCount += 1;
    
    // Auto-hide review if it gets too many reports
    if (this.reportCount >= 5) {
      this.isHidden = true;
    }
    
    return this.save();
  }
  
  return Promise.resolve(this);
};

// Method to edit review
reviewSchema.methods.editReview = function(updates) {
  // Store current values in edit history
  this.editHistory.push({
    comment: this.comment,
    rating: this.rating,
    difficulty: this.difficulty,
    workload: this.workload
  });
  
  // Update fields
  if (updates.comment) this.comment = updates.comment;
  if (updates.rating) this.rating = updates.rating;
  if (updates.difficulty) this.difficulty = updates.difficulty;
  if (updates.workload) this.workload = updates.workload;
  if (updates.professor) this.professor = updates.professor;
  if (updates.tags) this.tags = updates.tags;
  
  this.isEdited = true;
  return this.save();
};

// Static method to find reviews by course
reviewSchema.statics.findByCourse = function(courseId, options = {}) {
  const query = { course: courseId, isHidden: false };
  
  if (options.verifiedOnly) {
    query.isVerified = true;
  }
  
  return this.find(query)
    .populate('user', 'name profilePicture department yearOfStudy')
    .sort({ helpfulVotes: -1, createdAt: -1 })
    .limit(options.limit || 50);
};

// Static method to find reviews by user
reviewSchema.statics.findByUser = function(userId, options = {}) {
  const query = { user: userId, isHidden: false };
  
  return this.find(query)
    .populate('course', 'code name department')
    .sort({ createdAt: -1 })
    .limit(options.limit || 50);
};

// Static method to find helpful reviews
reviewSchema.statics.findHelpful = function(limit = 10) {
  return this.find({ isHidden: false })
    .populate('course', 'code name department')
    .populate('user', 'name profilePicture')
    .sort({ helpfulVotes: -1, createdAt: -1 })
    .limit(limit);
};

// Static method to get review statistics
reviewSchema.statics.getStats = function() {
  return this.aggregate([
    { $match: { isHidden: false } },
    {
      $group: {
        _id: null,
        totalReviews: { $sum: 1 },
        avgRating: { $avg: '$rating' },
        avgDifficulty: { $avg: '$difficulty' },
        avgWorkload: { $avg: '$workload' },
        totalHelpfulVotes: { $sum: '$helpfulVotes' },
        totalNotHelpfulVotes: { $sum: '$notHelpfulVotes' }
      }
    }
  ]);
};

// Pre-save middleware to update course rating
reviewSchema.pre('save', async function(next) {
  if (this.isModified('rating')) {
    try {
      await this.model('Course').findById(this.course).then(course => {
        if (course) {
          course.updateRating();
        }
      });
    } catch (error) {
      console.error('Error updating course rating:', error);
    }
  }
  next();
});

// Pre-save middleware to update user review count
reviewSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      await this.model('User').findById(this.user).then(user => {
        if (user) {
          user.incrementReviewCount();
        }
      });
    } catch (error) {
      console.error('Error updating user review count:', error);
    }
  }
  next();
});

// Pre-remove middleware to update course rating and user review count
reviewSchema.pre('remove', async function(next) {
  try {
    // Update course rating
    await this.model('Course').findById(this.course).then(course => {
      if (course) {
        course.updateRating();
        course.decrementReviewCount();
      }
    });
    
    // Update user review count
    await this.model('User').findById(this.user).then(user => {
      if (user) {
        user.reviewCount = Math.max(0, user.reviewCount - 1);
        user.save();
      }
    });
  } catch (error) {
    console.error('Error in review removal middleware:', error);
  }
  next();
});

module.exports = mongoose.model('Review', reviewSchema); 