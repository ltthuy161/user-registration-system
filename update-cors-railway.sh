#!/bin/bash

echo "🔧 CORS Configuration Helper cho Railway"
echo "======================================="

if [ "$1" = "" ]; then
    echo "Usage: ./update-cors-railway.sh <frontend-url>"
    echo "Ví dụ: ./update-cors-railway.sh https://frontend-production-abc123.up.railway.app"
    echo ""
    echo "Các bước manual:"
    echo "1. Lấy URL frontend từ Railway dashboard"
    echo "2. Chạy script này với URL đó"
    echo "3. Script sẽ tự động cập nhật CORS trong backend/src/main.ts"
    exit 1
fi

FRONTEND_URL="$1"
echo "Frontend URL: $FRONTEND_URL"

# Backup file gốc
cp backend/src/main.ts backend/src/main.ts.backup

# Cập nhật CORS
sed -i.tmp "s|'https://your-app-name.netlify.app'|'$FRONTEND_URL'|g" backend/src/main.ts
rm -f backend/src/main.ts.tmp

echo ""
echo "✅ Đã cập nhật CORS trong backend/src/main.ts"
echo "📄 File backup: backend/src/main.ts.backup"
echo ""

# Hiển thị thay đổi
echo "🔍 Xem thay đổi:"
echo "=================="
if command -v diff &> /dev/null; then
    diff backend/src/main.ts.backup backend/src/main.ts || true
else
    echo "Không thể hiển thị diff. Vui lòng kiểm tra file backend/src/main.ts"
fi

echo ""
echo "📋 Các bước tiếp theo:"
echo "1. Kiểm tra file backend/src/main.ts có chính xác không"
echo "2. Commit và push:"
echo "   git add ."
echo "   git commit -m 'Update CORS for Railway frontend'"
echo "   git push origin main"
echo "3. Railway sẽ tự động redeploy backend"
echo ""

# Hỏi có muốn commit không
read -p "Bạn có muốn commit và push luôn? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Đang commit và push..."
    git add .
    git commit -m "Update CORS for Railway frontend: $FRONTEND_URL"
    git push origin main
    echo "✅ Đã push thành công!"
else
    echo "⏸️  Bạn có thể commit sau bằng các lệnh ở trên"
fi