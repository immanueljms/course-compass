# Course Compass 🧭

**IIT Madras Course Exploration and Review Platform**

A comprehensive web application for IIT Madras students to explore courses, read reviews, and share their experiences. Built with React.js frontend and Node.js backend, featuring Google OAuth authentication exclusively for IIT Madras students.

## 🌟 Features

### Frontend (React.js)
- **Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- **Course Browsing** - Search, filter, and explore courses by department
- **Course Details** - Comprehensive course information and reviews
- **User Authentication** - Google OAuth integration (IIT Madras only)
- **Review System** - Rate courses and share experiences
- **Real-time Search** - Instant course search with filters
- **Mobile Responsive** - Optimized for all devices

### Backend (Node.js/Express)
- **RESTful API** - Complete CRUD operations for courses and reviews
- **Google OAuth** - Secure authentication with IIT Madras email validation
- **MongoDB Database** - Persistent data storage with Mongoose ODM
- **JWT Authentication** - Secure token-based API access
- **Admin Panel** - User and content management
- **Rate Limiting** - Protection against abuse
- **Input Validation** - Comprehensive data validation

### Security Features
- **IIT Madras Exclusive** - Only `@smail.iitm.ac.in` emails allowed
- **JWT Tokens** - Secure authentication
- **Rate Limiting** - API abuse protection
- **CORS Protection** - Cross-origin request security
- **Input Validation** - XSS and injection protection

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Google Cloud Console account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/immanueljms/course-compass.git
   cd course-compass
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend runs on: http://localhost:3000

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   Edit `.env` with your configuration (see setup guide)

5. **Google OAuth Setup**
   - Create project in [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add redirect URI: `http://localhost:5000/api/auth/google/callback`

6. **Database Setup**
   ```bash
   # Start MongoDB (local or cloud)
   # Seed the database
   node scripts/seedDatabase.js
   ```

7. **Start Backend**
   ```bash
   npm run dev
   ```
   Backend runs on: http://localhost:5000

## 📁 Project Structure

```
course-compass/
├── frontend/                 # React.js frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── CourseCompass.jsx # Main app component
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── backend/                  # Node.js backend
│   ├── config/
│   │   └── passport.js      # OAuth configuration
│   ├── middleware/
│   │   └── auth.js          # Authentication middleware
│   ├── models/
│   │   ├── Course.js        # Course data model
│   │   ├── Review.js        # Review data model
│   │   └── User.js          # User data model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── courses.js       # Course management routes
│   │   ├── reviews.js       # Review management routes
│   │   └── users.js         # User management routes
│   ├── scripts/
│   │   └── seedDatabase.js  # Database seeding
│   ├── server.js            # Main server file
│   ├── package.json
│   └── README.md
├── .gitignore
├── README.md
└── SETUP_GUIDE.md           # Detailed setup instructions
```

## 🗄️ Database Schema

### Users
- IIT Madras email validation (`@smail.iitm.ac.in`)
- Department and year of study
- Profile information and preferences
- Review count and helpful votes
- Admin and verification status

### Courses
- Course code, name, and description
- Department, credits, and semester
- Difficulty and workload ratings
- Instructor information
- Prerequisites, corequisites, and tags

### Reviews
- User and course references
- Rating, comment, difficulty, workload
- Semester and year information
- Helpful voting system
- Reporting and moderation features

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

## 🛠️ Technologies Used

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Styling
- **JavaScript (ES6+)** - Programming language
- **HTML5** - Markup
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Passport.js** - Authentication
- **JWT** - Token management
- **bcryptjs** - Password hashing

### Development Tools
- **Git** - Version control
- **npm** - Package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy build folder to hosting service (Vercel, Netlify, etc.)
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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Immanuel JMS** - Full Stack Developer
- **IIT Madras Students** - Beta Testers and Feedback

## 🙏 Acknowledgments

- IIT Madras for course data and support
- Google for OAuth authentication
- MongoDB for database services
- React and Node.js communities

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions
- Review the [Backend README](backend/README.md) for API documentation

## 🔄 Version History

- **v1.0.0** - Initial release with basic course browsing and reviews
- **v1.1.0** - Added Google OAuth authentication
- **v1.2.0** - Enhanced review system with voting
- **v1.3.0** - Added admin panel and user management

## 🎯 Roadmap

- [ ] Real-time notifications
- [ ] Course recommendations
- [ ] Advanced search filters
- [ ] Mobile app development
- [ ] Integration with IITM systems
- [ ] Analytics dashboard

---

**Made with ❤️ for IIT Madras Students**

*Course Compass - Your Academic Journey Navigator*
