@echo off
REM Course Compass Frontend-Only Vercel Deployment Script for Windows

echo 🚀 Starting Course Compass frontend deployment to Vercel...

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
)

REM Check if user is logged in to Vercel
vercel whoami >nul 2>&1
if errorlevel 1 (
    echo 🔐 Please log in to Vercel...
    vercel login
)

REM Build the project
echo 📦 Building the project...
npm run build

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
vercel --prod

echo ✅ Deployment completed!
echo 🌐 Your frontend should be available at the URL shown above.
echo 📝 Note: This is a frontend-only deployment without backend functionality.

pause 