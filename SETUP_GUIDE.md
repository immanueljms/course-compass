# Course Compass - Complete Setup Guide

A comprehensive guide to set up Course Compass, the IIT Madras course exploration and review platform.

## 🎯 Overview

Course Compass is a full-stack web application consisting of:
- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js/Express with MongoDB
- **Authentication**: Google OAuth (IIT Madras email only)
- **Database**: MongoDB with Mongoose ODM

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Google Cloud Console account
- Git

## 🚀 Quick Start

### 1. Clone and Navigate
```bash
cd C:\Users\Immanuel\Projects\course-compass
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend will run on: http://localhost:3000

### 3. Backend Setup
```bash
cd backend
npm install
```

### 4. Environment Configuration
Create `.env` file in the backend directory:
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

### 5. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set Application Type to "Web application"
6. Add Authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
7. Copy Client ID and Client Secret to `.env`

### 6. MongoDB Setup
#### Option A: Local MongoDB
1. Download and install MongoDB Community Server
2. Start MongoDB service:
   ```bash
   mongod
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI` in `.env`

### 7. Seed Database
```bash
cd backend
node scripts/seedDatabase.js
```

### 8. Start Backend
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

## 🔧 Detailed Setup

### Frontend Features
- ✅ Modern React.js with hooks
- ✅ Tailwind CSS for styling
- ✅ Responsive design
- ✅ Course search and filtering
- ✅ Course details and reviews
- ✅ User authentication UI
- ✅ Custom SVG icons

### Backend Features
- ✅ Express.js REST API
- ✅ MongoDB with Mongoose
- ✅ Google OAuth authentication
- ✅ JWT token management
- ✅ IIT Madras email validation
- ✅ Course management
- ✅ Review system with voting
- ✅ User management
- ✅ Admin controls
- ✅ Rate limiting and security
- ✅ Input validation

### Security Features
- ✅ Only `@smail.iitm.ac.in` emails allowed
- ✅ JWT token authentication
- ✅ Rate limiting
- ✅ Input validation
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Session management

## 📁 Project Structure

```
course-compass/
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── CourseCompass.jsx
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── backend/                  # Node.js backend
│   ├── config/
│   │   └── passport.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Course.js
│   │   ├── Review.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── reviews.js
│   │   └── users.js
│   ├── scripts/
│   │   └── seedDatabase.js
│   ├── server.js
│   ├── package.json
│   └── README.md
└── SETUP_GUIDE.md
```

## 🗄️ Database Schema

### Users
- IIT Madras email validation
- Department and year of study
- Profile information
- Review count and helpful votes
- Admin and verification status

### Courses
- Course code, name, description
- Department, credits, semester
- Difficulty and workload ratings
- Instructor information
- Prerequisites and tags

### Reviews
- User and course references
- Rating, comment, difficulty, workload
- Semester and year information
- Helpful voting system
- Reporting and moderation

## 🔐 Authentication Flow

1. User clicks "Login with Google"
2. Redirected to Google OAuth
3. Google validates IIT Madras email
4. Backend creates/updates user account
5. JWT token generated and returned
6. Frontend stores token for API calls

## 📱 API Endpoints

### Authentication
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - OAuth callback
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Courses
- `GET /api/courses` - Get all courses (with filtering)
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/search/query` - Search courses
- `GET /api/courses/popular/list` - Get popular courses

### Reviews
- `GET /api/reviews/course/:courseId` - Get course reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `POST /api/reviews/:id/vote` - Vote on review

### Users (Admin)
- `GET /api/users` - Get all users
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy build folder to hosting service
```

### Backend Deployment
```bash
cd backend
npm install --production
# Set NODE_ENV=production
# Update environment variables
npm start
```

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

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

## 🔧 Troubleshooting

### Common Issues

1. **PowerShell Execution Policy**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. **MongoDB Connection**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network access for cloud MongoDB

3. **Google OAuth**
   - Verify redirect URI matches exactly
   - Check Client ID and Secret
   - Ensure Google+ API is enabled

4. **CORS Issues**
   - Verify `FRONTEND_URL` in `.env`
   - Check browser console for errors

5. **Port Conflicts**
   - Frontend: Change port in `package.json`
   - Backend: Change `PORT` in `.env`

### Logs and Debugging

- Frontend: Check browser console
- Backend: Check terminal output
- Database: Check MongoDB logs
- Network: Use browser dev tools

## 📞 Support

For issues and questions:
1. Check this setup guide
2. Review README files in frontend/ and backend/
3. Check console logs and error messages
4. Verify all prerequisites are installed
5. Ensure environment variables are correct

## 🎉 Success!

Once everything is set up:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/api/health

The application should now be fully functional with:
- ✅ Course browsing and search
- ✅ User authentication (IIT Madras only)
- ✅ Course reviews and ratings
- ✅ Admin panel for management
- ✅ Secure API endpoints
- ✅ Database persistence

Happy coding! 🚀 