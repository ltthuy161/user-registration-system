# ✅ RAILWAY DEPLOYMENT CHECKLIST

## Bước chuẩn bị (Bắt buộc)

### 1. GitHub Repository
- [ ] Tạo repository mới trên GitHub tên `user-registration-system`
- [ ] Thêm remote origin:
```bash
git remote add origin https://github.com/[your-username]/user-registration-system.git
```
- [ ] Push code lên GitHub:
```bash
git push -u origin main
```

## Bước deploy trên Railway

### 2. Tạo tài khoản Railway
- [ ] Vào https://railway.app
- [ ] Đăng nhập bằng GitHub account
- [ ] Cho phép Railway truy cập repositories

### 3. Deploy Backend Service
- [ ] Click "New Project" → "Deploy from GitHub repo"
- [ ] Chọn repository `user-registration-system`
- [ ] Đợi deploy xong (khoảng 2-3 phút)
- [ ] Vào Settings → Source → Set "Root Directory" = `backend`
- [ ] Chờ Railway redeploy
- [ ] Copy URL backend (ví dụ: `https://backend-production-abc123.up.railway.app`)

### 4. Deploy Frontend Service
- [ ] Trong cùng project, click "+ New Service"
- [ ] Chọn "GitHub Repo" → Select repository
- [ ] Vào Settings → Source → Set "Root Directory" = `frontend`
- [ ] Vào Settings → Deploy → Set "Start Command" = `npm run start:prod`
- [ ] Đợi deploy xong

### 5. Cấu hình Environment Variables
#### Frontend Service:
- [ ] Vào Settings → Variables
- [ ] Thêm biến mới:
  - Key: `REACT_APP_API_URL`
  - Value: `[URL backend từ bước 3]`
- [ ] Click "Add" và đợi redeploy

### 6. Cập nhật CORS
- [ ] Copy URL frontend từ Railway (ví dụ: `https://frontend-production-xyz789.up.railway.app`)
- [ ] Chạy script tự động:
```bash
./update-cors-railway.sh https://frontend-production-xyz789.up.railway.app
```
- [ ] Hoặc cập nhật manual trong `backend/src/main.ts`:
```typescript
origin: [
  'http://localhost:3000',
  'https://frontend-production-xyz789.up.railway.app', // URL thực tế
],
```
- [ ] Commit và push:
```bash
git add .
git commit -m "Update CORS for Railway deployment"
git push origin main
```

## Bước kiểm tra

### 7. Test Application
- [ ] Vào URL frontend trên Railway
- [ ] Kiểm tra trang chủ load được
- [ ] Test đăng ký user mới
- [ ] Check Network tab trong DevTools xem API calls có thành công
- [ ] Check Railway logs nếu có lỗi

### 8. Monitor Services
- [ ] Cả 2 services đều có status "Active"
- [ ] Check logs trong Railway dashboard
- [ ] Test với nhiều browsers khác nhau

## 🔧 Troubleshooting

### Lỗi thường gặp:

#### Backend không start:
- [ ] Check logs: `railway logs` hoặc trong dashboard
- [ ] Đảm bảo Root Directory = `backend`
- [ ] Check package.json có script `start:prod`

#### Frontend build fail:
- [ ] Check có install `serve` package chưa
- [ ] Đảm bảo Root Directory = `frontend`
- [ ] Check Start Command = `npm run start:prod`

#### CORS Error:
- [ ] Đảm bảo URL frontend đã được thêm vào CORS
- [ ] Check biến `REACT_APP_API_URL` đã đúng chưa
- [ ] Restart cả 2 services

#### 404 Error khi refresh page:
- [ ] Đảm bảo có file `frontend/public/_redirects`
- [ ] Check serve command đúng: `serve -s build`

## 🎉 Hoàn thành!

Sau khi hoàn tất checklist này:
- **Backend API**: `https://backend-production-[id].up.railway.app`
- **Frontend App**: `https://frontend-production-[id].up.railway.app`

### Tự động deployment:
Mỗi khi bạn push code mới lên GitHub, Railway sẽ tự động build và deploy lại!

### Useful Railway Commands:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# View logs
railway logs

# Open app in browser
railway open
```

## 💡 Lưu ý quan trọng:

1. **Free tier**: Railway có $5 free credit/tháng
2. **Custom domain**: Có thể add custom domain trong Settings
3. **Environment variables**: Có thể set khác nhau cho development/production
4. **Database**: Có thể thêm PostgreSQL database nếu cần
5. **Monitoring**: Railway có built-in monitoring và alerts

🚀 Chúc bạn deploy thành công!