# 🚂 HƯỚNG DẪN DEPLOY LÊN RAILWAY CHI TIẾT

## Bước 1: Chuẩn bị Repository trên GitHub

### 1.1 Tạo repository trên GitHub
1. Vào https://github.com
2. Tạo repository mới tên `user-registration-system`
3. Không chọn README, .gitignore hay license (vì đã có sẵn)

### 1.2 Đẩy code lên GitHub
```bash
# Thêm remote origin
git remote add origin https://github.com/[username]/user-registration-system.git

# Đẩy code lên GitHub
git branch -M main
git push -u origin main
```

## Bước 2: Deploy Backend lên Railway

### 2.1 Tạo tài khoản Railway
1. Vào https://railway.app
2. Click "Login" → "Login with GitHub"
3. Cho phép Railway truy cập GitHub

### 2.2 Deploy Backend
1. Click "New Project" → "Deploy from GitHub repo"
2. Chọn repository `user-registration-system`
3. Railway sẽ tự detect Node.js project
4. Click "Deploy Now"

### 2.3 Cấu hình Backend Service
1. Sau khi deploy, click vào service backend
2. Vào tab "Settings" → "Environment"
3. Thêm các biến môi trường:
```
NODE_ENV=production
PORT=$PORT
```

### 2.4 Cấu hình Root Directory cho Backend
1. Trong Settings → "Source"
2. Set "Root Directory" = `backend`
3. Click "Save Changes"

### 2.5 Lấy URL Backend
1. Vào tab "Settings" → "Domains"
2. Copy URL (ví dụ: `https://backend-production-abc123.up.railway.app`)

## Bước 3: Deploy Frontend lên Railway

### 3.1 Tạo Service mới cho Frontend
1. Trong cùng project, click "New Service"
2. Chọn "GitHub Repo" → chọn cùng repository
3. Click "Deploy"

### 3.2 Cấu hình Frontend Service
1. Click vào service frontend
2. Vào "Settings" → "Source"
3. Set "Root Directory" = `frontend`

### 3.3 Cấu hình Build Command
1. Trong "Settings" → "Build"
2. Set "Build Command":
```bash
npm install && npm run build
```

### 3.4 Cấu hình Start Command
1. Set "Start Command":
```bash
npx serve -s build -l $PORT
```

### 3.5 Thêm serve package
Cần cập nhật package.json frontend để có serve:
```bash
cd frontend
npm install --save serve
```

### 3.6 Cấu hình Environment cho Frontend
1. Vào "Settings" → "Environment"
2. Thêm biến:
```
REACT_APP_API_URL=https://backend-production-abc123.up.railway.app
```
(Thay bằng URL backend thực tế từ bước 2.5)

## Bước 4: Cập nhật CORS

### 4.1 Lấy URL Frontend
1. Vào frontend service → "Settings" → "Domains"
2. Copy URL frontend (ví dụ: `https://frontend-production-xyz789.up.railway.app`)

### 4.2 Cập nhật CORS trong Backend
Cập nhật file `backend/src/main.ts`:
```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://frontend-production-xyz789.up.railway.app', // URL frontend thực tế
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});
```

### 4.3 Push thay đổi
```bash
git add .
git commit -m "Update CORS for Railway deployment"
git push origin main
```

Railway sẽ tự động redeploy khi có thay đổi.

## Bước 5: Kiểm tra và Test

### 5.1 Kiểm tra Services
1. Đảm bảo cả 2 services đều "Active" và "Healthy"
2. Check logs nếu có lỗi

### 5.2 Test Application
1. Vào URL frontend
2. Thử đăng ký user mới
3. Check Network tab trong DevTools

## 🔧 Troubleshooting

### Lỗi thường gặp:

#### Backend không start
- Check logs: có thể thiếu dependencies
- Đảm bảo ROOT_DIRECTORY = `backend`

#### Frontend build fail
- Check package.json có đầy đủ dependencies
- Đảm bảo ROOT_DIRECTORY = `frontend`

#### CORS Error
- Đảm bảo URL frontend đã được thêm vào CORS
- Check REACT_APP_API_URL đúng chưa

#### 404 Error khi refresh
- Thêm vào package.json frontend:
```json
{
  "scripts": {
    "start": "serve -s build -l $PORT"
  }
}
```

## 🎉 Hoàn thành!

Sau khi hoàn tất các bước trên, bạn sẽ có:
- **Backend**: `https://backend-production-[id].up.railway.app`
- **Frontend**: `https://frontend-production-[id].up.railway.app`

Cả hai đều sẽ tự động deploy khi bạn push code mới lên GitHub!

## 💡 Tips

1. **Custom Domain**: Railway cho phép thêm custom domain
2. **Environment Variables**: Có thể set khác nhau cho từng branch
3. **Monitoring**: Railway có built-in monitoring và logs
4. **Database**: Có thể thêm PostgreSQL database nếu cần

Railway sẽ tự động handle scaling và có $5 free credit mỗi tháng!