const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const { verifyIITMadrasEmail } = require('../middleware/auth');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
  scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ googleId: profile.id });

    if (user) {
      // Update last login
      user.lastLogin = new Date();
      await user.save();
      return done(null, user);
    }

    // Check if user exists with same email
    user = await User.findOne({ email: profile.emails[0].value });

    if (user) {
      // Link Google account to existing user
      user.googleId = profile.id;
      user.profilePicture = profile.photos[0]?.value || user.profilePicture;
      user.lastLogin = new Date();
      await user.save();
      return done(null, user);
    }

    // Validate IIT Madras email
    if (!verifyIITMadrasEmail(profile.emails[0].value)) {
      return done(new Error('Only IIT Madras student emails (@smail.iitm.ac.in) are allowed'), null);
    }

    // Create new user
    user = new User({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      profilePicture: profile.photos[0]?.value || '',
      isVerified: true, // Auto-verify IIT Madras students
      lastLogin: new Date()
    });

    await user.save();
    return done(null, user);

  } catch (error) {
    console.error('Google OAuth error:', error);
    return done(error, null);
  }
}));

// JWT Strategy for API authentication
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'fallback-secret'
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.userId);
    
    if (!user) {
      return done(null, false);
    }

    // Check if user is still an IIT Madras student
    if (!user.isIITMadrasStudent()) {
      return done(new Error('Only IIT Madras students can access this resource'), false);
    }

    return done(null, user);
  } catch (error) {
    console.error('JWT Strategy error:', error);
    return done(error, false);
  }
}));

// Custom middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ 
    error: 'Authentication required',
    message: 'Please log in to access this resource'
  });
};

// Custom middleware to check if user is IIT Madras student
const isIITMadrasStudent = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isIITMadrasStudent()) {
    return next();
  }
  res.status(403).json({ 
    error: 'Access denied',
    message: 'Only IIT Madras students can access this resource'
  });
};

module.exports = {
  isAuthenticated,
  isIITMadrasStudent
}; 