#!/bin/bash

echo "🔧 FIX RENDER DEPLOYMENT ERROR"
echo "=============================="

echo "Fixing 'nest: not found' error..."

# Backup original package.json
cp backend/package.json backend/package.json.backup

echo "✅ Backed up package.json"

# The fix has already been applied, but let's verify
if grep -q '"@nestjs/cli".*"dependencies"' backend/package.json; then
    echo "✅ @nestjs/cli is already in dependencies"
else
    echo "❌ @nestjs/cli not found in dependencies"
    echo "Manual fix required - check package.json"
fi

if grep -q 'npx nest build' backend/package.json; then
    echo "✅ Build script uses npx nest build"
else
    echo "❌ Build script doesn't use npx"
    echo "Manual fix required - update build script"
fi

echo ""
echo "🎯 RENDER CONFIGURATION:"
echo "========================"
echo "Build Command: cd backend && npm install"
echo "Start Command: cd backend && npm run build && npm run start:prod"
echo ""
echo "Environment Variables:"
echo "- NODE_ENV=production"
echo "- PORT=10000"
echo ""

# Test build locally
echo "🧪 Testing build locally..."
cd backend
if npm run build; then
    echo "✅ Build test successful!"
else
    echo "❌ Build test failed!"
    exit 1
fi

echo ""
echo "🚀 Ready to deploy!"
echo "==================="
echo "1. Commit and push changes:"
echo "   git add ."
echo "   git commit -m 'Fix Render build error: move @nestjs/cli to dependencies'"
echo "   git push origin main"
echo ""
echo "2. Render will automatically redeploy"
echo "3. Check deployment logs in Render dashboard"
echo ""
echo "💡 If still having issues:"
echo "   - Check Render build logs"
echo "   - Verify Node.js version (should be 18+ or 20+)"
echo "   - Make sure all TypeScript files compile correctly"