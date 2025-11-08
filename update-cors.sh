#!/bin/bash

echo "🔧 CORS Configuration Helper"
echo "============================"
echo ""

echo "After deploying, update your CORS settings:"
echo ""
echo "1. Open backend/src/main.ts"
echo "2. Find the CORS configuration section"
echo "3. Replace 'https://your-app-name.netlify.app' with your actual Netlify URL"
echo ""
echo "Example:"
echo "origin: ["
echo "  'http://localhost:3000', // Keep for development"
echo "  'https://user-registration-app.netlify.app', // Your actual Netlify URL"
echo "],"
echo ""
echo "4. Commit and push the changes:"
echo "   git add ."
echo "   git commit -m 'Update CORS settings for production'"
echo "   git push origin main"
echo ""
echo "5. Railway/Render will automatically redeploy with the new settings"
echo ""

if [ "$1" != "" ]; then
    echo "Updating CORS settings with URL: $1"
    # This would be the automated way to update the file
    # sed -i.bak "s|https://your-app-name.netlify.app|$1|g" backend/src/main.ts
    echo "Manual update recommended for safety"
else
    echo "Usage: ./update-cors.sh https://your-netlify-url.netlify.app"
fi