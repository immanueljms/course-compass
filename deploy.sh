#!/bin/bash

# Course Compass Frontend-Only Vercel Deployment Script

echo "🚀 Starting Course Compass frontend deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel..."
    vercel login
fi

# Build the project
echo "📦 Building the project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed!"
echo "🌐 Your frontend should be available at the URL shown above."
echo "📝 Note: This is a frontend-only deployment without backend functionality." 