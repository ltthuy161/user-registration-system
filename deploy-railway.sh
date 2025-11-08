#!/bin/bash

echo "🚂 RAILWAY DEPLOYMENT SCRIPT"
echo "============================"
echo ""

# Màu sắc cho output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Bước 1: Kiểm tra Git repository${NC}"
if [ -d ".git" ]; then
    echo -e "${GREEN}✓ Git repository đã được khởi tạo${NC}"
else
    echo -e "${RED}✗ Chưa có Git repository. Chạy: git init${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Bước 2: Kiểm tra và commit thay đổi${NC}"
if [[ -n $(git status --porcelain) ]]; then
    echo -e "${YELLOW}! Có thay đổi chưa được commit${NC}"
    echo "Đang commit tự động..."
    git add .
    git commit -m "Auto commit for Railway deployment - $(date)"
    echo -e "${GREEN}✓ Đã commit thay đổi${NC}"
else
    echo -e "${GREEN}✓ Tất cả thay đổi đã được commit${NC}"
fi

echo ""
echo -e "${BLUE}Bước 3: Kiểm tra remote GitHub${NC}"
if git remote get-url origin >/dev/null 2>&1; then
    echo -e "${GREEN}✓ GitHub remote đã được cấu hình${NC}"
    echo "Remote URL: $(git remote get-url origin)"
else
    echo -e "${YELLOW}! Chưa có GitHub remote${NC}"
    echo "Vui lòng thêm remote GitHub:"
    echo "git remote add origin https://github.com/[username]/[repo].git"
fi

echo ""
echo -e "${BLUE}Bước 4: Push code lên GitHub${NC}"
echo "Đang push code..."
if git push origin main; then
    echo -e "${GREEN}✓ Đã push code lên GitHub thành công${NC}"
else
    echo -e "${YELLOW}! Push không thành công. Có thể cần set upstream:${NC}"
    echo "git push -u origin main"
fi

echo ""
echo -e "${BLUE}Bước 5: Hướng dẫn deploy lên Railway${NC}"
echo "=========================================="
echo ""
echo "1. Vào https://railway.app và đăng nhập bằng GitHub"
echo ""
echo "2. DEPLOY BACKEND:"
echo "   - Click 'New Project' → 'Deploy from GitHub repo'"
echo "   - Chọn repository của bạn"
echo "   - Trong Settings → Source, set Root Directory = 'backend'"
echo "   - Railway sẽ tự động build và deploy"
echo ""
echo "3. DEPLOY FRONTEND:"
echo "   - Trong cùng project, click 'New Service'"
echo "   - Chọn 'GitHub Repo' → chọn cùng repository"
echo "   - Trong Settings → Source, set Root Directory = 'frontend'"
echo "   - Trong Settings → Deploy, set Start Command = 'npm run start:prod'"
echo ""
echo "4. CẤU HÌNH ENVIRONMENT VARIABLES:"
echo "   Frontend Service:"
echo "   - REACT_APP_API_URL = [URL của backend service]"
echo ""
echo "5. CẬP NHẬT CORS:"
echo "   - Lấy URL frontend từ Railway"
echo "   - Cập nhật backend/src/main.ts với URL frontend"
echo "   - Push thay đổi lên GitHub"
echo ""
echo -e "${GREEN}🎉 Xong! Railway sẽ tự động deploy khi bạn push code mới${NC}"
echo ""
echo -e "${BLUE}📋 Useful commands:${NC}"
echo "- Xem logs: railway logs"
echo "- Mở app: railway open"
echo "- Deploy local: railway up"
echo ""
echo -e "${YELLOW}📖 Chi tiết hơn trong file RAILWAY-DEPLOY.md${NC}"