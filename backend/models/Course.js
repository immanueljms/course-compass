const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Course code is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
    maxlength: [200, 'Course name cannot exceed 200 characters']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
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
      'Physics',
      'Mathematics',
      'Chemistry',
      'Biology',
      'Humanities',
      'Other'
    ]
  },
  credits: {
    type: Number,
    required: [true, 'Credits are required'],
    min: [1, 'Credits must be at least 1'],
    max: [20, 'Credits cannot exceed 20']
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
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  difficulty: {
    type: Number,
    required: [true, 'Difficulty rating is required'],
    min: [1, 'Difficulty must be at least 1'],
    max: [5, 'Difficulty cannot exceed 5'],
    default: 3
  },
  workload: {
    type: Number,
    required: [true, 'Workload rating is required'],
    min: [1, 'Workload must be at least 1'],
    max: [5, 'Workload cannot exceed 5'],
    default: 3
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  },
  totalReviews: {
    type: Number,
    default: 0,
    min: [0, 'Total reviews cannot be negative']
  },
  totalHelpfulVotes: {
    type: Number,
    default: 0,
    min: [0, 'Total helpful votes cannot be negative']
  },
  category: {
    type: String,
    enum: ['Core', 'Elective', 'Lab', 'Project', 'Seminar', 'Workshop', 'Other'],
    default: 'Core'
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  corequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  instructors: [{
    name: {
      type: String,
      required: true
    },
    email: String,
    department: String
  }],
  syllabus: [{
    week: Number,
    topic: String,
    description: String
  }],
  gradingPolicy: {
    assignments: {
      type: Number,
      min: 0,
      max: 100,
      default: 30
    },
    midterm: {
      type: Number,
      min: 0,
      max: 100,
      default: 30
    },
    final: {
      type: Number,
      min: 0,
      max: 100,
      default: 40
    }
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  enrollmentCount: {
    type: Number,
    default: 0,
    min: 0
  },
  maxEnrollment: {
    type: Number,
    default: null
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
courseSchema.index({ code: 1 });
courseSchema.index({ department: 1 });
courseSchema.index({ semester: 1 });
courseSchema.index({ rating: -1 });
courseSchema.index({ totalReviews: -1 });
courseSchema.index({ isActive: 1 });
courseSchema.index({ tags: 1 });

// Virtual for course summary
courseSchema.virtual('summary').get(function() {
  return {
    id: this._id,
    code: this.code,
    name: this.name,
    department: this.department,
    credits: this.credits,
    semester: this.semester,
    rating: this.rating,
    totalReviews: this.totalReviews,
    difficulty: this.difficulty,
    workload: this.workload,
    isActive: this.isActive
  };
});

// Virtual for course statistics
courseSchema.virtual('stats').get(function() {
  return {
    rating: this.rating,
    totalReviews: this.totalReviews,
    totalHelpfulVotes: this.totalHelpfulVotes,
    enrollmentCount: this.enrollmentCount,
    difficulty: this.difficulty,
    workload: this.workload
  };
});

// Method to update rating
courseSchema.methods.updateRating = function() {
  return this.model('Review').aggregate([
    { $match: { course: this._id } },
    { $group: { _id: null, avgRating: { $avg: '$rating' } } }
  ]).then(result => {
    if (result.length > 0) {
      this.rating = Math.round(result[0].avgRating * 10) / 10;
    } else {
      this.rating = 0;
    }
    return this.save();
  });
};

// Method to increment review count
courseSchema.methods.incrementReviewCount = function() {
  this.totalReviews += 1;
  return this.save();
};

// Method to decrement review count
courseSchema.methods.decrementReviewCount = function() {
  this.totalReviews = Math.max(0, this.totalReviews - 1);
  return this.save();
};

// Method to add helpful vote
courseSchema.methods.addHelpfulVote = function() {
  this.totalHelpfulVotes += 1;
  return this.save();
};

// Method to remove helpful vote
courseSchema.methods.removeHelpfulVote = function() {
  this.totalHelpfulVotes = Math.max(0, this.totalHelpfulVotes - 1);
  return this.save();
};

// Static method to find popular courses
courseSchema.statics.findPopular = function(limit = 10) {
  return this.find({ isActive: true })
    .sort({ rating: -1, totalReviews: -1 })
    .limit(limit);
};

// Static method to find courses by department
courseSchema.statics.findByDepartment = function(department) {
  return this.find({ department, isActive: true })
    .sort({ code: 1 });
};

// Static method to find courses by semester
courseSchema.statics.findBySemester = function(semester) {
  return this.find({ semester, isActive: true })
    .sort({ code: 1 });
};

// Static method to search courses
courseSchema.statics.search = function(query) {
  return this.find({
    $and: [
      { isActive: true },
      {
        $or: [
          { code: { $regex: query, $options: 'i' } },
          { name: { $regex: query, $options: 'i' } },
          { department: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ]
      }
    ]
  }).sort({ rating: -1, totalReviews: -1 });
};

// Static method to get department statistics
courseSchema.statics.getDepartmentStats = function() {
  return this.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$department',
        courseCount: { $sum: 1 },
        avgRating: { $avg: '$rating' },
        avgDifficulty: { $avg: '$difficulty' },
        avgWorkload: { $avg: '$workload' },
        totalReviews: { $sum: '$totalReviews' }
      }
    },
    { $sort: { courseCount: -1 } }
  ]);
};

// Pre-save middleware to update lastUpdated
courseSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.lastUpdated = new Date();
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema); 