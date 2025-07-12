const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

// Course data from the frontend
const coursesData = [
  {
    code: "MA11001",
    name: "Mathematics I",
    department: "Mathematics",
    credits: 4,
    semester: "Semester 1",
    description: "Calculus, Linear Algebra, and Differential Equations",
    difficulty: 3,
    workload: 4,
    category: "Core",
    tags: ["calculus", "linear algebra", "differential equations", "mathematics"]
  },
  {
    code: "PH11001",
    name: "Physics I",
    department: "Physics",
    credits: 4,
    semester: "Semester 1",
    description: "Mechanics, Waves, and Thermodynamics",
    difficulty: 3,
    workload: 4,
    category: "Core",
    tags: ["mechanics", "waves", "thermodynamics", "physics"]
  },
  {
    code: "CH11001",
    name: "Chemistry I",
    department: "Chemistry",
    credits: 3,
    semester: "Semester 1",
    description: "Physical Chemistry and Inorganic Chemistry",
    difficulty: 2,
    workload: 3,
    category: "Core",
    tags: ["physical chemistry", "inorganic chemistry", "chemistry"]
  },
  {
    code: "CS11001",
    name: "Computer Programming",
    department: "Computer Science and Engineering",
    credits: 3,
    semester: "Semester 1",
    description: "Introduction to Programming with C and Python",
    difficulty: 2,
    workload: 4,
    category: "Core",
    tags: ["programming", "C", "Python", "computer science"]
  },
  {
    code: "MA11002",
    name: "Mathematics II",
    department: "Mathematics",
    credits: 4,
    semester: "Semester 2",
    description: "Multivariable Calculus, Vector Calculus, and Complex Analysis",
    difficulty: 4,
    workload: 4,
    category: "Core",
    tags: ["multivariable calculus", "vector calculus", "complex analysis", "mathematics"]
  },
  {
    code: "PH11002",
    name: "Physics II",
    department: "Physics",
    credits: 4,
    semester: "Semester 2",
    description: "Electromagnetism and Optics",
    difficulty: 4,
    workload: 4,
    category: "Core",
    tags: ["electromagnetism", "optics", "physics"]
  },
  {
    code: "CS11002",
    name: "Data Structures and Algorithms",
    department: "Computer Science and Engineering",
    credits: 4,
    semester: "Semester 2",
    description: "Fundamental data structures and algorithm design",
    difficulty: 4,
    workload: 5,
    category: "Core",
    tags: ["data structures", "algorithms", "programming", "computer science"]
  },
  {
    code: "CS21001",
    name: "Object Oriented Programming",
    department: "Computer Science and Engineering",
    credits: 3,
    semester: "Semester 3",
    description: "Java programming and object-oriented design principles",
    difficulty: 3,
    workload: 4,
    category: "Core",
    tags: ["Java", "OOP", "programming", "computer science"]
  },
  {
    code: "CS21002",
    name: "Digital Logic Design",
    department: "Computer Science and Engineering",
    credits: 3,
    semester: "Semester 3",
    description: "Boolean algebra, combinational and sequential circuits",
    difficulty: 3,
    workload: 3,
    category: "Core",
    tags: ["digital logic", "boolean algebra", "circuits", "computer science"]
  },
  {
    code: "CS21003",
    name: "Computer Organization",
    department: "Computer Science and Engineering",
    credits: 3,
    semester: "Semester 3",
    description: "Computer architecture and assembly programming",
    difficulty: 4,
    workload: 4,
    category: "Core",
    tags: ["computer architecture", "assembly", "computer science"]
  },
  {
    code: "CS31001",
    name: "Database Management Systems",
    department: "Computer Science and Engineering",
    credits: 3,
    semester: "Semester 5",
    description: "Database design, SQL, and transaction management",
    difficulty: 3,
    workload: 4,
    category: "Core",
    tags: ["databases", "SQL", "computer science"]
  },
  {
    code: "CS31002",
    name: "Operating Systems",
    department: "Computer Science and Engineering",
    credits: 3,
    semester: "Semester 5",
    description: "Process management, memory management, and file systems",
    difficulty: 4,
    workload: 4,
    category: "Core",
    tags: ["operating systems", "processes", "memory", "computer science"]
  },
  {
    code: "CS31003",
    name: "Computer Networks",
    department: "Computer Science and Engineering",
    credits: 3,
    semester: "Semester 5",
    description: "Network protocols, routing, and network security",
    difficulty: 3,
    workload: 3,
    category: "Core",
    tags: ["networks", "protocols", "routing", "computer science"]
  },
  {
    code: "CS41001",
    name: "Software Engineering",
    department: "Computer Science and Engineering",
    credits: 3,
    semester: "Semester 7",
    description: "Software development lifecycle and project management",
    difficulty: 3,
    workload: 4,
    category: "Core",
    tags: ["software engineering", "project management", "computer science"]
  },
  {
    code: "CS41002",
    name: "Artificial Intelligence",
    department: "Computer Science and Engineering",
    credits: 3,
    semester: "Semester 7",
    description: "Machine learning, neural networks, and AI algorithms",
    difficulty: 4,
    workload: 4,
    category: "Core",
    tags: ["artificial intelligence", "machine learning", "neural networks", "computer science"]
  },
  {
    code: "EE11001",
    name: "Electrical Engineering",
    department: "Electrical Engineering",
    credits: 3,
    semester: "Semester 1",
    description: "Basic electrical circuits and electronics",
    difficulty: 3,
    workload: 3,
    category: "Core",
    tags: ["electrical circuits", "electronics", "electrical engineering"]
  },
  {
    code: "ME11001",
    name: "Engineering Drawing",
    department: "Mechanical Engineering",
    credits: 2,
    semester: "Semester 1",
    description: "Technical drawing and CAD basics",
    difficulty: 2,
    workload: 2,
    category: "Core",
    tags: ["engineering drawing", "CAD", "mechanical engineering"]
  },
  {
    code: "CE11001",
    name: "Engineering Mechanics",
    department: "Civil Engineering",
    credits: 3,
    semester: "Semester 1",
    description: "Statics, dynamics, and mechanics of materials",
    difficulty: 3,
    workload: 3,
    category: "Core",
    tags: ["mechanics", "statics", "dynamics", "civil engineering"]
  },
  {
    code: "AE11001",
    name: "Introduction to Aerospace Engineering",
    department: "Aerospace Engineering",
    credits: 2,
    semester: "Semester 1",
    description: "Fundamentals of aerospace engineering and flight mechanics",
    difficulty: 3,
    workload: 3,
    category: "Core",
    tags: ["aerospace", "flight mechanics", "aeronautics"]
  },
  {
    code: "CH11002",
    name: "Chemistry II",
    department: "Chemistry",
    credits: 3,
    semester: "Semester 2",
    description: "Organic Chemistry and Chemical Bonding",
    difficulty: 3,
    workload: 3,
    category: "Core",
    tags: ["organic chemistry", "chemical bonding", "chemistry"]
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/course-compass', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('🗑️  Cleared existing courses');

    // Insert new courses
    const courses = await Course.insertMany(coursesData);
    console.log(`✅ Inserted ${courses.length} courses`);

    // Set some courses as popular
    const popularCourseCodes = ['CS11002', 'CS21001', 'CS31001', 'MA11001', 'PH11001'];
    await Course.updateMany(
      { code: { $in: popularCourseCodes } },
      { isPopular: true }
    );
    console.log('⭐ Set popular courses');

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase(); 