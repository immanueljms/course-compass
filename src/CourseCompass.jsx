import React, { useState, useEffect } from "react";

// Simple SVG Icons to replace lucide-react
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const StarIcon = ({ filled = false, className = "w-4 h-4" }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const BookOpenIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

// Comprehensive course database from IIT Madras B.Tech curriculum
const initialCourses = [
  // Aerospace Engineering Courses
  {
    id: 1,
    code: "AM1100",
    name: "Engineering Mechanics",
    professor: "Dr. Aerospace Faculty",
    department: "Aerospace Engineering",
    credits: 10,
    semester: "Semester 1",
    description: "Fundamental principles of mechanics including statics, dynamics, and their applications in engineering systems.",
    difficulty: 3,
    workload: 4,
    rating: 4.2,
    totalReviews: 45,
    reviews: [
      { id: 1, rating: 5, comment: "Excellent foundation course! Very well structured.", author: "Student1", date: "2024-01-15" },
      { id: 2, rating: 4, comment: "Good course with practical applications.", author: "Student2", date: "2024-01-10" }
    ]
  },
  {
    id: 2,
    code: "AS1300",
    name: "Thermodynamics for Aerospace Engineering",
    professor: "Dr. Aerospace Faculty",
    department: "Aerospace Engineering",
    credits: 11,
    semester: "Semester 2",
    description: "Thermodynamic principles and their applications in aerospace systems and propulsion.",
    difficulty: 4,
    workload: 4,
    rating: 3.8,
    totalReviews: 32,
    reviews: [
      { id: 3, rating: 4, comment: "Challenging but essential for aerospace students.", author: "Student3", date: "2024-01-12" }
    ]
  },
  {
    id: 3,
    code: "AS1020",
    name: "Fluid Mechanics",
    professor: "Dr. Aerospace Faculty",
    department: "Aerospace Engineering",
    credits: 11,
    semester: "Semester 3",
    description: "Study of fluid behavior, flow patterns, and their applications in aerospace engineering.",
    difficulty: 4,
    workload: 5,
    rating: 4.1,
    totalReviews: 38,
    reviews: [
      { id: 4, rating: 4, comment: "Core course for understanding aerodynamics.", author: "Student4", date: "2024-01-08" }
    ]
  },
  {
    id: 4,
    code: "AS2050",
    name: "Aerodynamics",
    professor: "Dr. Aerospace Faculty",
    department: "Aerospace Engineering",
    credits: 11,
    semester: "Semester 4",
    description: "Principles of aerodynamics, airfoil theory, and aircraft performance analysis.",
    difficulty: 5,
    workload: 5,
    rating: 4.5,
    totalReviews: 28,
    reviews: [
      { id: 5, rating: 5, comment: "Fascinating course! The heart of aerospace engineering.", author: "Student5", date: "2024-01-14" }
    ]
  },
  {
    id: 5,
    code: "AS2040",
    name: "Flight Dynamics I",
    professor: "Dr. Aerospace Faculty",
    department: "Aerospace Engineering",
    credits: 12,
    semester: "Semester 5",
    description: "Aircraft stability and control, flight dynamics modeling and analysis.",
    difficulty: 5,
    workload: 5,
    rating: 4.3,
    totalReviews: 25,
    reviews: [
      { id: 6, rating: 4, comment: "Complex but very rewarding course.", author: "Student6", date: "2024-01-13" }
    ]
  },
  {
    id: 6,
    code: "AS3270",
    name: "Propulsion I",
    professor: "Dr. Aerospace Faculty",
    department: "Aerospace Engineering",
    credits: 10,
    semester: "Semester 5",
    description: "Fundamentals of aircraft propulsion systems and engine performance.",
    difficulty: 4,
    workload: 4,
    rating: 4.0,
    totalReviews: 30,
    reviews: [
      { id: 7, rating: 4, comment: "Essential for understanding aircraft propulsion.", author: "Student7", date: "2024-01-10" }
    ]
  },

  // Computer Science and Engineering Courses
  {
    id: 7,
    code: "CS1100",
    name: "Introduction to Programming",
    professor: "Dr. CS Faculty",
    department: "Computer Science and Engineering",
    credits: 12,
    semester: "Semester 1/2",
    description: "Fundamental programming concepts, algorithms, and problem-solving techniques.",
    difficulty: 2,
    workload: 4,
    rating: 4.4,
    totalReviews: 120,
    reviews: [
      { id: 8, rating: 5, comment: "Great introduction to programming! Very well taught.", author: "Student8", date: "2024-01-15" },
      { id: 9, rating: 4, comment: "Excellent foundation for CS students.", author: "Student9", date: "2024-01-12" }
    ]
  },
  {
    id: 8,
    code: "CS1200",
    name: "Discrete Mathematics for CS",
    professor: "Dr. CS Faculty",
    department: "Computer Science and Engineering",
    credits: 10,
    semester: "Semester 2",
    description: "Mathematical foundations for computer science including logic, sets, and combinatorics.",
    difficulty: 3,
    workload: 3,
    rating: 3.9,
    totalReviews: 85,
    reviews: [
      { id: 10, rating: 4, comment: "Important mathematical foundation for CS.", author: "Student10", date: "2024-01-10" }
    ]
  },
  {
    id: 9,
    code: "CS2700",
    name: "Programming and Data Structures",
    professor: "Dr. CS Faculty",
    department: "Computer Science and Engineering",
    credits: 10,
    semester: "Semester 3",
    description: "Advanced programming concepts and fundamental data structures implementation.",
    difficulty: 4,
    workload: 5,
    rating: 4.2,
    totalReviews: 95,
    reviews: [
      { id: 11, rating: 4, comment: "Challenging but essential course for CS majors.", author: "Student11", date: "2024-01-08" }
    ]
  },
  {
    id: 10,
    code: "CS2800",
    name: "Design and Analysis of Algorithms",
    professor: "Dr. CS Faculty",
    department: "Computer Science and Engineering",
    credits: 10,
    semester: "Semester 4",
    description: "Algorithm design techniques, complexity analysis, and optimization strategies.",
    difficulty: 5,
    workload: 5,
    rating: 4.6,
    totalReviews: 78,
    reviews: [
      { id: 12, rating: 5, comment: "One of the most important courses in CS!", author: "Student12", date: "2024-01-14" }
    ]
  },
  {
    id: 11,
    code: "CS2600",
    name: "Computer Organization and Architecture",
    professor: "Dr. CS Faculty",
    department: "Computer Science and Engineering",
    credits: 10,
    semester: "Semester 4",
    description: "Computer hardware organization, instruction set architecture, and system design.",
    difficulty: 4,
    workload: 4,
    rating: 4.1,
    totalReviews: 65,
    reviews: [
      { id: 13, rating: 4, comment: "Good understanding of computer hardware.", author: "Student13", date: "2024-01-09" }
    ]
  },
  {
    id: 12,
    code: "CS3500",
    name: "Operating Systems",
    professor: "Dr. CS Faculty",
    department: "Computer Science and Engineering",
    credits: 15,
    semester: "Semester 5",
    description: "Operating system concepts, process management, memory management, and file systems.",
    difficulty: 5,
    workload: 5,
    rating: 4.4,
    totalReviews: 55,
    reviews: [
      { id: 14, rating: 5, comment: "Excellent course on OS fundamentals.", author: "Student14", date: "2024-01-11" }
    ]
  },

  // Electrical Engineering Courses
  {
    id: 13,
    code: "EE1100",
    name: "Basic Electrical Engineering",
    professor: "Dr. EE Faculty",
    department: "Electrical Engineering",
    credits: 10,
    semester: "Semester 1/2",
    description: "Fundamental electrical engineering concepts, circuits, and basic electrical systems.",
    difficulty: 3,
    workload: 4,
    rating: 4.0,
    totalReviews: 110,
    reviews: [
      { id: 15, rating: 4, comment: "Good introduction to electrical engineering.", author: "Student15", date: "2024-01-15" }
    ]
  },
  {
    id: 14,
    code: "EE2001",
    name: "Digital Systems & Lab",
    professor: "Dr. EE Faculty",
    department: "Electrical Engineering",
    credits: 16,
    semester: "Semester 2",
    description: "Digital logic design, combinational and sequential circuits with laboratory work.",
    difficulty: 4,
    workload: 5,
    rating: 4.2,
    totalReviews: 75,
    reviews: [
      { id: 16, rating: 4, comment: "Practical course with good lab component.", author: "Student16", date: "2024-01-12" }
    ]
  },
  {
    id: 15,
    code: "EE2015",
    name: "Electric Circuits & Networks",
    professor: "Dr. EE Faculty",
    department: "Electrical Engineering",
    credits: 11,
    semester: "Semester 3",
    description: "Analysis of electrical circuits, network theorems, and circuit design principles.",
    difficulty: 4,
    workload: 4,
    rating: 4.1,
    totalReviews: 68,
    reviews: [
      { id: 17, rating: 4, comment: "Core course for understanding electrical circuits.", author: "Student17", date: "2024-01-10" }
    ]
  },
  {
    id: 16,
    code: "EE2004",
    name: "Digital Signal Processing",
    professor: "Dr. EE Faculty",
    department: "Electrical Engineering",
    credits: 11,
    semester: "Semester 4",
    description: "Digital signal processing techniques, filters, and signal analysis algorithms.",
    difficulty: 5,
    workload: 5,
    rating: 4.3,
    totalReviews: 45,
    reviews: [
      { id: 18, rating: 4, comment: "Challenging but very useful course.", author: "Student18", date: "2024-01-08" }
    ]
  },
  {
    id: 17,
    code: "EE3001",
    name: "Solid State Devices",
    professor: "Dr. EE Faculty",
    department: "Electrical Engineering",
    credits: 11,
    semester: "Semester 5",
    description: "Semiconductor physics, device operation, and electronic component characteristics.",
    difficulty: 4,
    workload: 4,
    rating: 4.0,
    totalReviews: 52,
    reviews: [
      { id: 19, rating: 4, comment: "Important for understanding electronic devices.", author: "Student19", date: "2024-01-09" }
    ]
  },

  // Mechanical Engineering Courses
  {
    id: 18,
    code: "ME1100",
    name: "Thermodynamics",
    professor: "Dr. ME Faculty",
    department: "Mechanical Engineering",
    credits: 10,
    semester: "Semester 1",
    description: "Fundamental principles of thermodynamics and energy conversion systems.",
    difficulty: 4,
    workload: 4,
    rating: 3.9,
    totalReviews: 95,
    reviews: [
      { id: 20, rating: 4, comment: "Essential course for mechanical engineering.", author: "Student20", date: "2024-01-15" }
    ]
  },
  {
    id: 19,
    code: "AM2200",
    name: "Strength of Materials",
    professor: "Dr. ME Faculty",
    department: "Mechanical Engineering",
    credits: 10,
    semester: "Semester 3",
    description: "Mechanics of materials, stress analysis, and structural behavior.",
    difficulty: 4,
    workload: 4,
    rating: 4.1,
    totalReviews: 82,
    reviews: [
      { id: 21, rating: 4, comment: "Good foundation for mechanical design.", author: "Student21", date: "2024-01-12" }
    ]
  },
  {
    id: 20,
    code: "ME2100",
    name: "Applied Thermal Engineering",
    professor: "Dr. ME Faculty",
    department: "Mechanical Engineering",
    credits: 10,
    semester: "Semester 3",
    description: "Applied thermodynamics, heat transfer, and thermal system design.",
    difficulty: 4,
    workload: 4,
    rating: 4.0,
    totalReviews: 70,
    reviews: [
      { id: 22, rating: 4, comment: "Practical applications of thermal engineering.", author: "Student22", date: "2024-01-10" }
    ]
  },
  {
    id: 21,
    code: "ME3101",
    name: "Heat Transfer",
    professor: "Dr. ME Faculty",
    department: "Mechanical Engineering",
    credits: 10,
    semester: "Semester 5",
    description: "Heat transfer mechanisms, conduction, convection, and radiation analysis.",
    difficulty: 4,
    workload: 4,
    rating: 4.2,
    totalReviews: 58,
    reviews: [
      { id: 23, rating: 4, comment: "Important course for thermal systems.", author: "Student23", date: "2024-01-08" }
    ]
  },
  {
    id: 22,
    code: "ME3201",
    name: "Design of Machine Elements",
    professor: "Dr. ME Faculty",
    department: "Mechanical Engineering",
    credits: 10,
    semester: "Semester 5",
    description: "Machine component design, stress analysis, and mechanical system design.",
    difficulty: 4,
    workload: 4,
    rating: 4.1,
    totalReviews: 65,
    reviews: [
      { id: 24, rating: 4, comment: "Practical design course for mechanical engineers.", author: "Student24", date: "2024-01-09" }
    ]
  },

  // Civil Engineering Courses
  {
    id: 23,
    code: "CE1010",
    name: "Introduction to Civil Engineering",
    professor: "Dr. CE Faculty",
    department: "Civil Engineering",
    credits: 8,
    semester: "Semester 1",
    description: "Overview of civil engineering disciplines and fundamental concepts.",
    difficulty: 2,
    workload: 3,
    rating: 4.0,
    totalReviews: 88,
    reviews: [
      { id: 25, rating: 4, comment: "Good introduction to civil engineering field.", author: "Student25", date: "2024-01-15" }
    ]
  },
  {
    id: 24,
    code: "CE2040",
    name: "Hydraulic Engineering",
    professor: "Dr. CE Faculty",
    department: "Civil Engineering",
    credits: 11,
    semester: "Semester 4",
    description: "Fluid mechanics applications in civil engineering, hydraulic systems design.",
    difficulty: 4,
    workload: 4,
    rating: 4.1,
    totalReviews: 45,
    reviews: [
      { id: 26, rating: 4, comment: "Important for water resources engineering.", author: "Student26", date: "2024-01-12" }
    ]
  },
  {
    id: 25,
    code: "CE2020",
    name: "Structural Analysis",
    professor: "Dr. CE Faculty",
    department: "Civil Engineering",
    credits: 11,
    semester: "Semester 4",
    description: "Analysis of structural systems, load calculations, and structural behavior.",
    difficulty: 4,
    workload: 4,
    rating: 4.2,
    totalReviews: 52,
    reviews: [
      { id: 27, rating: 4, comment: "Core course for structural engineering.", author: "Student27", date: "2024-01-10" }
    ]
  },
  {
    id: 26,
    code: "CE3030",
    name: "Water Resources Engineering",
    professor: "Dr. CE Faculty",
    department: "Civil Engineering",
    credits: 12,
    semester: "Semester 6",
    description: "Water resource management, hydrology, and water systems engineering.",
    difficulty: 4,
    workload: 4,
    rating: 4.0,
    totalReviews: 38,
    reviews: [
      { id: 28, rating: 4, comment: "Important for environmental and water engineering.", author: "Student28", date: "2024-01-08" }
    ]
  },

  // Chemical Engineering Courses
  {
    id: 27,
    code: "CH1020",
    name: "Principles & Calculations in Chemical Engineering",
    professor: "Dr. CH Faculty",
    department: "Chemical Engineering",
    credits: 10,
    semester: "Semester 2",
    description: "Fundamental principles and calculations in chemical engineering processes.",
    difficulty: 3,
    workload: 4,
    rating: 4.0,
    totalReviews: 75,
    reviews: [
      { id: 29, rating: 4, comment: "Good foundation for chemical engineering.", author: "Student29", date: "2024-01-15" }
    ]
  },
  {
    id: 28,
    code: "CH2010",
    name: "Chemical Engineering Thermodynamics",
    professor: "Dr. CH Faculty",
    department: "Chemical Engineering",
    credits: 10,
    semester: "Semester 3",
    description: "Thermodynamic principles applied to chemical processes and reactions.",
    difficulty: 4,
    workload: 4,
    rating: 4.1,
    totalReviews: 62,
    reviews: [
      { id: 30, rating: 4, comment: "Essential for understanding chemical processes.", author: "Student30", date: "2024-01-12" }
    ]
  },
  {
    id: 29,
    code: "CH3010",
    name: "Chemical Reaction Engineering",
    professor: "Dr. CH Faculty",
    department: "Chemical Engineering",
    credits: 10,
    semester: "Semester 5",
    description: "Chemical reaction kinetics, reactor design, and process optimization.",
    difficulty: 5,
    workload: 5,
    rating: 4.3,
    totalReviews: 48,
    reviews: [
      { id: 31, rating: 4, comment: "Core course for chemical reaction processes.", author: "Student31", date: "2024-01-10" }
    ]
  },

  // Physics and Mathematics Courses
  {
    id: 30,
    code: "PH1010",
    name: "Physics I",
    professor: "Dr. Physics Faculty",
    department: "Physics",
    credits: 10,
    semester: "Semester 1",
    description: "Fundamental physics concepts including mechanics, waves, and thermodynamics.",
    difficulty: 3,
    workload: 4,
    rating: 4.0,
    totalReviews: 200,
    reviews: [
      { id: 32, rating: 4, comment: "Good foundation in physics for engineering students.", author: "Student32", date: "2024-01-15" }
    ]
  },
  {
    id: 31,
    code: "MA1101",
    name: "Functions of Several Variables",
    professor: "Dr. Math Faculty",
    department: "Mathematics",
    credits: 10,
    semester: "Semester 1",
    description: "Multivariable calculus, partial derivatives, and vector calculus applications.",
    difficulty: 4,
    workload: 4,
    rating: 3.9,
    totalReviews: 180,
    reviews: [
      { id: 33, rating: 4, comment: "Important mathematical foundation for engineering.", author: "Student33", date: "2024-01-12" }
    ]
  },
  {
    id: 32,
    code: "MA1102",
    name: "Series and Matrices",
    professor: "Dr. Math Faculty",
    department: "Mathematics",
    credits: 10,
    semester: "Semester 2",
    description: "Mathematical series, matrix algebra, and linear algebra fundamentals.",
    difficulty: 3,
    workload: 3,
    rating: 4.1,
    totalReviews: 165,
    reviews: [
      { id: 34, rating: 4, comment: "Essential mathematics for engineering applications.", author: "Student34", date: "2024-01-10" }
    ]
  }
];

const departments = ["All Departments", "Aerospace Engineering", "Computer Science and Engineering", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Physics", "Mathematics"];

export default function CourseCompass() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState(initialCourses);
  const [filteredCourses, setFilteredCourses] = useState(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", author: "" });

  useEffect(() => {
    let filtered = courses.filter(course =>
      (course.name.toLowerCase().includes(search.toLowerCase()) ||
       course.professor.toLowerCase().includes(search.toLowerCase()) ||
       course.code.toLowerCase().includes(search.toLowerCase())) &&
      (selectedDepartment === "All Departments" || course.department === selectedDepartment)
    );

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "difficulty":
          return a.difficulty - b.difficulty;
        case "workload":
          return a.workload - b.workload;
        default:
          return 0;
      }
    });

    setFilteredCourses(filtered);
  }, [search, courses, selectedDepartment, sortBy]);

  const handleAddReview = () => {
    if (!newReview.comment.trim() || !newReview.author.trim()) return;
    
    const review = {
      id: Date.now(),
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      author: newReview.author.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        const newReviews = [...course.reviews, review];
        const newRating = newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length;
        return { 
          ...course, 
          reviews: newReviews,
          rating: Math.round(newRating * 10) / 10,
          totalReviews: newReviews.length
        };
      }
      return course;
    });

    setCourses(updatedCourses);
    setSelectedCourse(updatedCourses.find(course => course.id === selectedCourse.id));
    setNewReview({ rating: 5, comment: "", author: "" });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        filled={i < Math.floor(rating)}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const renderDifficultyBar = (difficulty) => {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Difficulty:</span>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i < difficulty ? 'bg-red-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderWorkloadBar = (workload) => {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Workload:</span>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i < workload ? 'bg-blue-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Course Compass</h1>
              <p className="text-gray-600 mt-1">IIT Madras - Make informed decisions about your courses and professors</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 text-primary-600">
                <BookOpenIcon />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedCourse ? (
          // Course Detail View
          <div className="space-y-6">
            <button 
              onClick={() => setSelectedCourse(null)} 
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeftIcon />
              <span>Back to Courses</span>
            </button>

            <div className="card p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.name}</h2>
                      <p className="text-lg text-gray-600 mt-1">{selectedCourse.code}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        {renderStars(selectedCourse.rating)}
                        <span className="text-sm text-gray-600 ml-1">({selectedCourse.rating})</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{selectedCourse.totalReviews} reviews</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center space-x-2">
                      <UserIcon />
                      <span className="text-gray-700">{selectedCourse.professor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpenIcon />
                      <span className="text-gray-700">{selectedCourse.department}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon />
                      <span className="text-gray-700">{selectedCourse.semester}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon />
                      <span className="text-gray-700">{selectedCourse.credits} credits</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-700">{selectedCourse.description}</p>
                  </div>

                  <div className="mt-4 space-y-2">
                    {renderDifficultyBar(selectedCourse.difficulty)}
                    {renderWorkloadBar(selectedCourse.workload)}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Reviews</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {selectedCourse.reviews.map((review) => (
                      <div key={review.id} className="border-l-4 border-primary-200 pl-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700 mt-2">{review.comment}</p>
                        <p className="text-sm text-gray-500 mt-1">- {review.author}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-3">Add Your Review</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <button
                              key={i}
                              onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                              className="focus:outline-none"
                            >
                              <StarIcon
                                filled={i < newReview.rating}
                                className={`w-5 h-5 ${i < newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          value={newReview.author}
                          onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                          className="input-field"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                        <textarea
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          className="input-field"
                          rows="3"
                          placeholder="Share your experience with this course..."
                        />
                      </div>
                      <button
                        onClick={handleAddReview}
                        className="btn-primary w-full"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Course List View
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search courses, professors, or course codes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pl-10"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 btn-secondary"
                >
                  <FilterIcon />
                  <span>Filters</span>
                </button>

                {showFilters && (
                  <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg border">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="input-field"
                      >
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="input-field"
                      >
                        <option value="name">Course Name</option>
                        <option value="rating">Rating</option>
                        <option value="difficulty">Difficulty</option>
                        <option value="workload">Workload</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map(course => (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className="card p-6 cursor-pointer hover:shadow-lg transition-all duration-200"
                >
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{course.code}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            {renderStars(course.rating)}
                            <span className="text-sm text-gray-600">({course.rating})</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <UserIcon />
                        <span>{course.professor}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <BookOpenIcon />
                        <span>{course.department}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <ClockIcon />
                        <span>{course.credits} credits</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {renderDifficultyBar(course.difficulty)}
                      {renderWorkloadBar(course.workload)}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{course.totalReviews} reviews</span>
                      <span>{course.semester}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="w-12 h-12 text-gray-400 mx-auto mb-4">
                  <BookOpenIcon />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

