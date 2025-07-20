# Course Compass - Vanilla JavaScript Version

A comprehensive course exploration and review platform for IIT Madras, built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

- **Course Database** - Comprehensive IIT Madras B.Tech curriculum
- **Search & Filter** - Find courses by name, professor, or course code
- **Department Filtering** - Filter by specific departments
- **Sorting Options** - Sort by name, rating, difficulty, or workload
- **Course Details** - Detailed view with reviews and ratings
- **Review System** - Add and view course reviews
- **Responsive Design** - Works on desktop, tablet, and mobile
- **No Dependencies** - Pure vanilla JavaScript, no frameworks

## 📁 File Structure

```
course-compass/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── vercel.json         # Vercel deployment config
└── README_VANILLA.md   # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **Vanilla JavaScript** - No frameworks or libraries
- **Google Fonts** - Inter font family
- **SVG Icons** - Custom SVG icons for UI elements

## 🎨 Design Features

- **Modern UI** - Clean, professional design
- **Responsive Layout** - Mobile-first approach
- **Interactive Elements** - Hover effects and transitions
- **Accessibility** - Semantic HTML and keyboard navigation
- **Performance** - Lightweight and fast loading

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Local Development
Simply open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

### Vercel Deployment
The project is configured for easy deployment on Vercel:

1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

## 📊 Course Data

The application includes courses from:
- Aerospace Engineering
- Computer Science and Engineering
- Electrical Engineering
- Mechanical Engineering
- Civil Engineering
- Chemical Engineering
- Physics
- Mathematics

Each course includes:
- Course code and name
- Professor information
- Department and semester
- Credit hours
- Difficulty and workload ratings
- Student reviews and ratings
- Course descriptions

## 🔧 Customization

### Adding New Courses
Edit the `initialCourses` array in `script.js`:

```javascript
{
    id: 29,
    code: "NEW1000",
    name: "New Course",
    professor: "Dr. New Faculty",
    department: "New Department",
    credits: 10,
    semester: "Semester 1",
    description: "Course description...",
    difficulty: 3,
    workload: 4,
    rating: 4.0,
    totalReviews: 0,
    reviews: []
}
```

### Styling Changes
Modify `styles.css` to customize:
- Colors and themes
- Layout and spacing
- Typography
- Responsive breakpoints

### Functionality Extensions
Add new features in `script.js`:
- Additional filtering options
- Export functionality
- Data persistence
- Advanced search

## 🌟 Key Features Explained

### Search Functionality
- Real-time search as you type
- Searches course name, professor, and course code
- Case-insensitive matching

### Filtering System
- Department-based filtering
- Multiple sorting options
- Dynamic filter panel

### Review System
- Star rating system (1-5 stars)
- Anonymous reviews
- Real-time rating updates
- Review history

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🎯 Performance Optimizations

- **Minimal Dependencies** - No external libraries
- **Efficient DOM Manipulation** - Minimal re-renders
- **Optimized CSS** - Efficient selectors and properties
- **Fast Loading** - Small file sizes

## 🔒 Data Persistence

Currently, all data is stored in memory. For production use, consider:
- Local Storage for client-side persistence
- Backend API for server-side storage
- Database integration for permanent storage

## 🚀 Future Enhancements

- **User Authentication** - Login system
- **Data Persistence** - Save reviews and ratings
- **Advanced Search** - Full-text search
- **Export Features** - PDF/Excel export
- **Admin Panel** - Course management
- **API Integration** - Real course data

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for IIT Madras students** 