// Course Compass - Vanilla JavaScript Version

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
        credits: 11,
        semester: "Semester 3",
        description: "Advanced programming concepts, data structures, and algorithm analysis.",
        difficulty: 3,
        workload: 5,
        rating: 4.2,
        totalReviews: 95,
        reviews: [
            { id: 11, rating: 4, comment: "Essential course for understanding data structures.", author: "Student11", date: "2024-01-14" }
        ]
    },
    {
        id: 10,
        code: "CS3100",
        name: "Computer Organization",
        professor: "Dr. CS Faculty",
        department: "Computer Science and Engineering",
        credits: 10,
        semester: "Semester 4",
        description: "Computer architecture, assembly language, and hardware-software interface.",
        difficulty: 4,
        workload: 4,
        rating: 3.7,
        totalReviews: 78,
        reviews: [
            { id: 12, rating: 4, comment: "Important for understanding how computers work.", author: "Student12", date: "2024-01-11" }
        ]
    },
    {
        id: 11,
        code: "CS4100",
        name: "Operating Systems",
        professor: "Dr. CS Faculty",
        department: "Computer Science and Engineering",
        credits: 11,
        semester: "Semester 5",
        description: "Operating system concepts, process management, and system programming.",
        difficulty: 4,
        workload: 5,
        rating: 4.1,
        totalReviews: 65,
        reviews: [
            { id: 13, rating: 4, comment: "Challenging but very informative course.", author: "Student13", date: "2024-01-13" }
        ]
    },
    {
        id: 12,
        code: "CS4200",
        name: "Database Systems",
        professor: "Dr. CS Faculty",
        department: "Computer Science and Engineering",
        credits: 10,
        semester: "Semester 5",
        description: "Database design, SQL, and data management systems.",
        difficulty: 3,
        workload: 4,
        rating: 4.3,
        totalReviews: 72,
        reviews: [
            { id: 14, rating: 5, comment: "Excellent practical course with real-world applications.", author: "Student14", date: "2024-01-15" }
        ]
    },

    // Electrical Engineering Courses
    {
        id: 13,
        code: "EE1100",
        name: "Electrical Circuits",
        professor: "Dr. EE Faculty",
        department: "Electrical Engineering",
        credits: 11,
        semester: "Semester 1",
        description: "Fundamental electrical circuit analysis and design principles.",
        difficulty: 3,
        workload: 4,
        rating: 4.0,
        totalReviews: 88,
        reviews: [
            { id: 15, rating: 4, comment: "Good foundation course for electrical engineering.", author: "Student15", date: "2024-01-12" }
        ]
    },
    {
        id: 14,
        code: "EE2100",
        name: "Electromagnetic Theory",
        professor: "Dr. EE Faculty",
        department: "Electrical Engineering",
        credits: 10,
        semester: "Semester 3",
        description: "Electromagnetic field theory and its applications in electrical systems.",
        difficulty: 4,
        workload: 4,
        rating: 3.6,
        totalReviews: 62,
        reviews: [
            { id: 16, rating: 4, comment: "Theoretical but important for understanding EM concepts.", author: "Student16", date: "2024-01-10" }
        ]
    },
    {
        id: 15,
        code: "EE3100",
        name: "Power Systems",
        professor: "Dr. EE Faculty",
        department: "Electrical Engineering",
        credits: 11,
        semester: "Semester 5",
        description: "Power generation, transmission, and distribution systems.",
        difficulty: 4,
        workload: 4,
        rating: 4.2,
        totalReviews: 55,
        reviews: [
            { id: 17, rating: 4, comment: "Practical course with industry applications.", author: "Student17", date: "2024-01-14" }
        ]
    },

    // Mechanical Engineering Courses
    {
        id: 16,
        code: "ME1100",
        name: "Engineering Drawing",
        professor: "Dr. ME Faculty",
        department: "Mechanical Engineering",
        credits: 8,
        semester: "Semester 1",
        description: "Technical drawing, CAD, and engineering graphics.",
        difficulty: 2,
        workload: 3,
        rating: 3.8,
        totalReviews: 95,
        reviews: [
            { id: 18, rating: 4, comment: "Practical course with hands-on experience.", author: "Student18", date: "2024-01-11" }
        ]
    },
    {
        id: 17,
        code: "ME2100",
        name: "Mechanics of Materials",
        professor: "Dr. ME Faculty",
        department: "Mechanical Engineering",
        credits: 10,
        semester: "Semester 3",
        description: "Stress, strain, and material behavior under various loading conditions.",
        difficulty: 4,
        workload: 4,
        rating: 4.1,
        totalReviews: 68,
        reviews: [
            { id: 19, rating: 4, comment: "Important course for understanding material behavior.", author: "Student19", date: "2024-01-13" }
        ]
    },
    {
        id: 18,
        code: "ME3100",
        name: "Machine Design",
        professor: "Dr. ME Faculty",
        department: "Mechanical Engineering",
        credits: 11,
        semester: "Semester 5",
        description: "Design principles and analysis of mechanical components and systems.",
        difficulty: 4,
        workload: 5,
        rating: 4.3,
        totalReviews: 52,
        reviews: [
            { id: 20, rating: 5, comment: "Excellent course with practical design projects.", author: "Student20", date: "2024-01-15" }
        ]
    },

    // Civil Engineering Courses
    {
        id: 19,
        code: "CE1100",
        name: "Engineering Surveying",
        professor: "Dr. CE Faculty",
        department: "Civil Engineering",
        credits: 9,
        semester: "Semester 1",
        description: "Surveying techniques and measurements for civil engineering projects.",
        difficulty: 2,
        workload: 3,
        rating: 3.9,
        totalReviews: 82,
        reviews: [
            { id: 21, rating: 4, comment: "Practical course with field work.", author: "Student21", date: "2024-01-12" }
        ]
    },
    {
        id: 20,
        code: "CE2100",
        name: "Structural Analysis",
        professor: "Dr. CE Faculty",
        department: "Civil Engineering",
        credits: 11,
        semester: "Semester 3",
        description: "Analysis of structures under various loading conditions.",
        difficulty: 4,
        workload: 4,
        rating: 4.0,
        totalReviews: 58,
        reviews: [
            { id: 22, rating: 4, comment: "Core course for structural engineering.", author: "Student22", date: "2024-01-10" }
        ]
    },
    {
        id: 21,
        code: "CE3100",
        name: "Reinforced Concrete Design",
        professor: "Dr. CE Faculty",
        department: "Civil Engineering",
        credits: 10,
        semester: "Semester 5",
        description: "Design principles for reinforced concrete structures.",
        difficulty: 4,
        workload: 4,
        rating: 4.2,
        totalReviews: 45,
        reviews: [
            { id: 23, rating: 4, comment: "Important for structural design.", author: "Student23", date: "2024-01-14" }
        ]
    },

    // Chemical Engineering Courses
    {
        id: 22,
        code: "CH1100",
        name: "Chemical Process Calculations",
        professor: "Dr. CH Faculty",
        department: "Chemical Engineering",
        credits: 10,
        semester: "Semester 1",
        description: "Material and energy balance calculations for chemical processes.",
        difficulty: 3,
        workload: 4,
        rating: 3.8,
        totalReviews: 75,
        reviews: [
            { id: 24, rating: 4, comment: "Foundation course for chemical engineering.", author: "Student24", date: "2024-01-11" }
        ]
    },
    {
        id: 23,
        code: "CH2100",
        name: "Transport Phenomena",
        professor: "Dr. CH Faculty",
        department: "Chemical Engineering",
        credits: 11,
        semester: "Semester 3",
        description: "Momentum, heat, and mass transfer in chemical processes.",
        difficulty: 4,
        workload: 5,
        rating: 3.9,
        totalReviews: 48,
        reviews: [
            { id: 25, rating: 4, comment: "Challenging but essential course.", author: "Student25", date: "2024-01-13" }
        ]
    },
    {
        id: 24,
        code: "CH3100",
        name: "Chemical Reaction Engineering",
        professor: "Dr. CH Faculty",
        department: "Chemical Engineering",
        credits: 10,
        semester: "Semester 5",
        description: "Design and analysis of chemical reactors.",
        difficulty: 4,
        workload: 4,
        rating: 4.1,
        totalReviews: 42,
        reviews: [
            { id: 26, rating: 4, comment: "Core course for chemical engineering.", author: "Student26", date: "2024-01-15" }
        ]
    },

    // Physics Courses
    {
        id: 25,
        code: "PH1100",
        name: "Engineering Physics",
        professor: "Dr. Physics Faculty",
        department: "Physics",
        credits: 10,
        semester: "Semester 1",
        description: "Fundamental physics concepts and their engineering applications.",
        difficulty: 3,
        workload: 3,
        rating: 4.0,
        totalReviews: 150,
        reviews: [
            { id: 27, rating: 4, comment: "Good foundation in physics for engineering.", author: "Student27", date: "2024-01-10" }
        ]
    },
    {
        id: 26,
        code: "PH2100",
        name: "Quantum Mechanics",
        professor: "Dr. Physics Faculty",
        department: "Physics",
        credits: 11,
        semester: "Semester 3",
        description: "Quantum mechanical principles and their applications.",
        difficulty: 5,
        workload: 4,
        rating: 3.7,
        totalReviews: 35,
        reviews: [
            { id: 28, rating: 4, comment: "Challenging but fascinating subject.", author: "Student28", date: "2024-01-12" }
        ]
    },

    // Mathematics Courses
    {
        id: 27,
        code: "MA1100",
        name: "Calculus and Linear Algebra",
        professor: "Dr. Math Faculty",
        department: "Mathematics",
        credits: 12,
        semester: "Semester 1",
        description: "Differential and integral calculus, linear algebra fundamentals.",
        difficulty: 3,
        workload: 4,
        rating: 4.2,
        totalReviews: 180,
        reviews: [
            { id: 29, rating: 4, comment: "Essential mathematics for engineering.", author: "Student29", date: "2024-01-15" }
        ]
    },
    {
        id: 28,
        code: "MA2100",
        name: "Differential Equations",
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
            { id: 30, rating: 4, comment: "Important mathematics for engineering applications.", author: "Student30", date: "2024-01-10" }
        ]
    }
];

// Application State
let courses = [...initialCourses];
let filteredCourses = [...initialCourses];
let selectedCourse = null;
let currentRating = 5;

// DOM Elements
const courseListView = document.getElementById('courseListView');
const courseDetailView = document.getElementById('courseDetailView');
const courseGrid = document.getElementById('courseGrid');
const searchInput = document.getElementById('searchInput');
const filterToggle = document.getElementById('filterToggle');
const filterPanel = document.getElementById('filterPanel');
const departmentFilter = document.getElementById('departmentFilter');
const sortFilter = document.getElementById('sortFilter');
const noResults = document.getElementById('noResults');
const backButton = document.getElementById('backButton');

// Course Detail Elements
const courseName = document.getElementById('courseName');
const courseCode = document.getElementById('courseCode');
const courseProfessor = document.getElementById('courseProfessor');
const courseDepartment = document.getElementById('courseDepartment');
const courseSemester = document.getElementById('courseSemester');
const courseCredits = document.getElementById('courseCredits');
const courseDescription = document.getElementById('courseDescription');
const courseStars = document.getElementById('courseStars');
const courseRatingText = document.getElementById('courseRatingText');
const courseDifficulty = document.getElementById('courseDifficulty');
const courseWorkload = document.getElementById('courseWorkload');
const reviewsList = document.getElementById('reviewsList');
const ratingStars = document.getElementById('ratingStars');
const reviewAuthor = document.getElementById('reviewAuthor');
const reviewComment = document.getElementById('reviewComment');
const submitReview = document.getElementById('submitReview');

// Utility Functions
function renderStars(rating, container, size = 'w-4 h-4', interactive = false) {
    container.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('svg');
        star.className = `star ${size} ${i < Math.floor(rating) ? 'filled' : ''}`;
        star.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
            </path>
        `;
        
        if (interactive) {
            star.style.cursor = 'pointer';
            star.addEventListener('click', () => {
                currentRating = i + 1;
                renderStars(currentRating, container, size, true);
            });
        }
        
        container.appendChild(star);
    }
}

function renderDifficultyBar(difficulty, container) {
    container.innerHTML = `
        <div class="metric-bar">
            <span class="metric-label">Difficulty:</span>
            <div class="metric-dots">
                ${Array.from({ length: 5 }, (_, i) => 
                    `<div class="metric-dot ${i < difficulty ? 'filled' : ''}"></div>`
                ).join('')}
            </div>
        </div>
    `;
}

function renderWorkloadBar(workload, container) {
    container.innerHTML = `
        <div class="metric-bar">
            <span class="metric-label">Workload:</span>
            <div class="metric-dots">
                ${Array.from({ length: 5 }, (_, i) => 
                    `<div class="metric-dot ${i < workload ? 'filled workload' : ''}"></div>`
                ).join('')}
            </div>
        </div>
    `;
}

function renderCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.addEventListener('click', () => showCourseDetail(course));
    
    card.innerHTML = `
        <div class="course-card-header">
            <div>
                <h3 class="course-card-title">${course.name}</h3>
                <p class="course-card-code">${course.code}</p>
            </div>
            <div class="course-card-rating">
                <div class="stars">
                    ${Array.from({ length: 5 }, (_, i) => 
                        `<svg class="star ${i < Math.floor(course.rating) ? 'filled' : ''}" fill="${i < Math.floor(course.rating) ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        </svg>`
                    ).join('')}
                </div>
                <span class="text-sm text-gray-600">(${course.rating})</span>
            </div>
        </div>
        
        <div class="course-card-meta">
            <div class="meta-item">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span>${course.professor}</span>
            </div>
            <div class="meta-item">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                <span>${course.department}</span>
            </div>
            <div class="meta-item">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>${course.credits} credits</span>
            </div>
        </div>
        
        <div class="course-card-metrics">
            ${renderDifficultyBar(course.difficulty, document.createElement('div')).innerHTML}
            ${renderWorkloadBar(course.workload, document.createElement('div')).innerHTML}
        </div>
        
        <div class="course-card-footer">
            <span>${course.totalReviews} reviews</span>
            <span>${course.semester}</span>
        </div>
    `;
    
    return card;
}

function renderReviews(reviews) {
    reviewsList.innerHTML = '';
    reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        reviewItem.innerHTML = `
            <div class="review-header">
                <div class="stars">
                    ${Array.from({ length: 5 }, (_, i) => 
                        `<svg class="star ${i < review.rating ? 'filled' : ''}" fill="${i < review.rating ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        </svg>`
                    ).join('')}
                </div>
                <span class="review-date">${review.date}</span>
            </div>
            <p class="review-comment">${review.comment}</p>
            <p class="review-author">- ${review.author}</p>
        `;
        
        reviewsList.appendChild(reviewItem);
    });
}

function filterAndSortCourses() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedDepartment = departmentFilter.value;
    const sortBy = sortFilter.value;
    
    filteredCourses = courses.filter(course =>
        (course.name.toLowerCase().includes(searchTerm) ||
         course.professor.toLowerCase().includes(searchTerm) ||
         course.code.toLowerCase().includes(searchTerm)) &&
        (selectedDepartment === "All Departments" || course.department === selectedDepartment)
    );
    
    // Sort courses
    filteredCourses.sort((a, b) => {
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
    
    renderCourseList();
}

function renderCourseList() {
    courseGrid.innerHTML = '';
    
    if (filteredCourses.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    filteredCourses.forEach(course => {
        courseGrid.appendChild(renderCourseCard(course));
    });
}

function showCourseDetail(course) {
    selectedCourse = course;
    
    // Update course details
    courseName.textContent = course.name;
    courseCode.textContent = course.code;
    courseProfessor.textContent = course.professor;
    courseDepartment.textContent = course.department;
    courseSemester.textContent = course.semester;
    courseCredits.textContent = `${course.credits} credits`;
    courseDescription.textContent = course.description;
    
    // Update rating
    renderStars(course.rating, courseStars);
    courseRatingText.textContent = `(${course.rating}) ${course.totalReviews} reviews`;
    
    // Update metrics
    renderDifficultyBar(course.difficulty, courseDifficulty);
    renderWorkloadBar(course.workload, courseWorkload);
    
    // Update reviews
    renderReviews(course.reviews);
    
    // Setup rating stars for new review
    renderStars(currentRating, ratingStars, 'w-5 h-5', true);
    
    // Clear form
    reviewAuthor.value = '';
    reviewComment.value = '';
    currentRating = 5;
    
    // Show detail view
    courseListView.classList.add('hidden');
    courseDetailView.classList.remove('hidden');
}

function showCourseList() {
    selectedCourse = null;
    courseDetailView.classList.add('hidden');
    courseListView.classList.remove('hidden');
}

function addReview() {
    if (!reviewComment.value.trim() || !reviewAuthor.value.trim()) return;
    
    const review = {
        id: Date.now(),
        rating: currentRating,
        comment: reviewComment.value.trim(),
        author: reviewAuthor.value.trim(),
        date: new Date().toISOString().split('T')[0]
    };
    
    // Update course
    const courseIndex = courses.findIndex(c => c.id === selectedCourse.id);
    if (courseIndex !== -1) {
        courses[courseIndex].reviews.push(review);
        courses[courseIndex].totalReviews = courses[courseIndex].reviews.length;
        courses[courseIndex].rating = Math.round(
            courses[courseIndex].reviews.reduce((sum, r) => sum + r.rating, 0) / 
            courses[courseIndex].reviews.length * 10
        ) / 10;
        
        selectedCourse = courses[courseIndex];
        
        // Update display
        renderStars(selectedCourse.rating, courseStars);
        courseRatingText.textContent = `(${selectedCourse.rating}) ${selectedCourse.totalReviews} reviews`;
        renderReviews(selectedCourse.reviews);
        
        // Clear form
        reviewAuthor.value = '';
        reviewComment.value = '';
        currentRating = 5;
        renderStars(currentRating, ratingStars, 'w-5 h-5', true);
    }
}

// Event Listeners
searchInput.addEventListener('input', filterAndSortCourses);
departmentFilter.addEventListener('change', filterAndSortCourses);
sortFilter.addEventListener('change', filterAndSortCourses);

filterToggle.addEventListener('click', () => {
    filterPanel.classList.toggle('hidden');
});

backButton.addEventListener('click', showCourseList);

submitReview.addEventListener('click', addReview);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderCourseList();
}); 