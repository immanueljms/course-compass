# Course Compass Backend API

A comprehensive backend API for Course Compass - IIT Madras's course exploration and review platform.

## 🚀 Features

- **Google OAuth Authentication** - Secure login with IIT Madras email validation
- **Course Management** - Full CRUD operations for courses
- **Review System** - User reviews with helpful voting and reporting
- **User Management** - Profile management and admin controls
- **Database Persistence** - MongoDB with Mongoose ODM
- **Security** - JWT tokens, rate limiting, input validation
- **IIT Madras Exclusive** - Only `@smail.iitm.ac.in` emails allowed

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Google OAuth credentials

## 🛠️ Installation

1. **Clone the repository and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/course-compass
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   
   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
   
   # Session Configuration
   SESSION_SECRET=your-session-secret-key-change-this-in-production
   
   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:3000
   ```

4. **Set up Google OAuth:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
   - Copy Client ID and Client Secret to `.env`

5. **Start MongoDB:**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env
   ```

6. **Seed the database:**
   ```bash
   node scripts/seedDatabase.js
   ```

7. **Start the server:**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

#### Google OAuth Login
```
GET /api/auth/google
```
Redirects to Google OAuth for authentication.

#### OAuth Callback
```
GET /api/auth/google/callback
```
Handles OAuth callback and returns JWT token.

#### Logout
```
POST /api/auth/logout
```
Logs out the user and invalidates session.

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>
```
Returns current user profile.

#### Update Profile
```
PUT /api/auth/profile
Authorization: Bearer <token>
```
Updates user profile information.

### Course Endpoints

#### Get All Courses
```
GET /api/courses?page=1&limit=20&department=Computer Science and Engineering&sort=rating&order=desc
```
Returns paginated list of courses with filtering and sorting.

#### Get Course by ID
```
GET /api/courses/:id
```
Returns detailed course information.

#### Search Courses
```
GET /api/courses/search/query?q=programming
```
Searches courses by code, name, department, or tags.

#### Get Popular Courses
```
GET /api/courses/popular/list?limit=10
```
Returns most popular courses.

#### Get Courses by Department
```
GET /api/courses/department/:department
```
Returns all courses from a specific department.

### Review Endpoints

#### Get Course Reviews
```
GET /api/reviews/course/:courseId?page=1&limit=20&sort=helpful&verifiedOnly=true
```
Returns paginated reviews for a course.

#### Create Review
```
POST /api/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "course_id",
  "rating": 4,
  "comment": "Great course with practical applications",
  "difficulty": 3,
  "workload": 4,
  "semester": "Semester 5",
  "year": 2024,
  "professor": "Dr. Smith",
  "isAnonymous": false,
  "tags": ["practical", "well-structured"]
}
```

#### Update Review
```
PUT /api/reviews/:reviewId
Authorization: Bearer <token>
```
Updates an existing review.

#### Delete Review
```
DELETE /api/reviews/:reviewId
Authorization: Bearer <token>
```
Deletes a review.

#### Vote on Review
```
POST /api/reviews/:reviewId/vote
Authorization: Bearer <token>
Content-Type: application/json

{
  "vote": "helpful"
}
```

#### Report Review
```
POST /api/reviews/:reviewId/report
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "spam",
  "description": "This review appears to be spam"
}
```

### User Endpoints (Admin Only)

#### Get All Users
```
GET /api/users?page=1&limit=20&department=Computer Science and Engineering
Authorization: Bearer <token>
```
Returns paginated list of users (admin only).

#### Get User by ID
```
GET /api/users/:userId
Authorization: Bearer <token>
```
Returns user profile (admin only).

#### Update User
```
PUT /api/users/:userId
Authorization: Bearer <token>
```
Updates user information (admin only).

#### Delete User
```
DELETE /api/users/:userId
Authorization: Bearer <token>
```
Deletes user account (admin only).

## 🔐 Security Features

- **IIT Madras Email Validation** - Only `@smail.iitm.ac.in` emails allowed
- **JWT Authentication** - Secure token-based authentication
- **Rate Limiting** - Prevents abuse with request limits
- **Input Validation** - Comprehensive validation using express-validator
- **CORS Protection** - Configured for frontend domain
- **Helmet Security** - Security headers and protection
- **Session Management** - Secure session handling with MongoDB store

## 🗄️ Database Schema

### User Model
- Basic info (name, email, profile picture)
- Department and year of study
- Verification and admin status
- Review count and helpful votes
- User preferences

### Course Model
- Course details (code, name, description)
- Department, credits, semester
- Difficulty and workload ratings
- Instructor information
- Prerequisites and corequisites
- Tags and categories

### Review Model
- Course and user references
- Rating, comment, difficulty, workload
- Semester and year information
- Helpful voting system
- Reporting and moderation features
- Edit history tracking

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/course-compass
JWT_SECRET=very-long-secure-secret-key
SESSION_SECRET=very-long-session-secret
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-client-secret
GOOGLE_CALLBACK_URL=https://yourdomain.com/api/auth/google/callback
FRONTEND_URL=https://yourdomain.com
```

### PM2 Deployment
```bash
npm install -g pm2
pm2 start server.js --name "course-compass-backend"
pm2 save
pm2 startup
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Scripts

```bash
# Development
npm run dev

# Production
npm start

# Seed database
node scripts/seedDatabase.js

# Test
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation

## 🔄 API Versioning

The API is currently at version 1.0. Future versions will be available at `/api/v2/`, etc.

## 📊 Monitoring

The API includes health check endpoints:
```
GET /api/health
```

Returns server status and basic information. 