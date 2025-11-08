# 🎨 HƯỚNG DẪN DEPLOY LÊN RENDER (THAY THẾ RAILWAY)

Render là platform tuyệt vời, tương tự Railway nhưng có free PostgreSQL database và interface đẹp hơn.

## ✨ Tại sao chọn Render?

- ✅ **Free tier tốt** - 750 hours/month (tương đương 24/7)
- ✅ **PostgreSQL miễn phí** - 100MB storage
- ✅ **Interface đẹp** và dễ sử dụng
- ✅ **Auto-deploy** từ GitHub
- ✅ **Custom domains** miễn phí
- ✅ **Built-in monitoring** và logs
- ✅ **No credit card required** cho free tier

## 🚀 HƯỚNG DẪN DEPLOY CHI TIẾT

### Bước 1: Chuẩn bị GitHub Repository

```bash
# Đẩy code lên GitHub (nếu chưa có)
git remote add origin https://github.com/[username]/user-registration-system.git
git branch -M main
git push -u origin main
```

### Bước 2: Deploy Backend lên Render

#### 2.1 Tạo tài khoản Render
1. Vào https://render.com
2. Sign up với GitHub account
3. Cho phép Render access repositories

#### 2.2 Deploy Backend Service
1. Click "New +" → "Web Service"
2. Connect GitHub repository
3. Cấu hình:
   - **Name**: `user-registration-backend`
   - **Runtime**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm run build && npm run start:prod`
   - **Plan**: `Free`

#### 2.3 Environment Variables cho Backend
Trong Advanced settings, thêm:
```
NODE_ENV=production
PORT=10000
```

#### 2.4 Lấy URL Backend
Sau khi deploy xong, copy URL (ví dụ: `https://user-registration-backend.onrender.com`)

### Bước 3: Deploy Frontend lên Render

#### 3.1 Tạo Static Site
1. Click "New +" → "Static Site"
2. Connect cùng GitHub repository
3. Cấu hình:
   - **Name**: `user-registration-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`

#### 3.2 Environment Variables cho Frontend
```
REACT_APP_API_URL=https://user-registration-backend.onrender.com
```

### Bước 4: Cập nhật CORS

#### 4.1 Lấy URL Frontend
Sau khi deploy, copy URL frontend (ví dụ: `https://user-registration-frontend.onrender.com`)

#### 4.2 Cập nhật CORS trong backend
```typescript
// backend/src/main.ts
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://user-registration-frontend.onrender.com', // URL thực tế
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});
```

#### 4.3 Push thay đổi
```bash
git add .
git commit -m "Update CORS for Render deployment"
git push origin main
```

Render sẽ tự động redeploy!

---

## 💾 BONUS: Thêm PostgreSQL Database (Miễn phí)

### Bước 1: Tạo Database
1. Trong Render dashboard, click "New +" → "PostgreSQL"
2. Cấu hình:
   - **Name**: `user-registration-db`
   - **Plan**: `Free` (100MB)
3. Click "Create Database"

### Bước 2: Cập nhật Backend để sử dụng PostgreSQL

#### 2.1 Install PostgreSQL driver
```bash
cd backend
npm install pg @types/pg
```

#### 2.2 Cập nhật AppModule
```typescript
// backend/src/app.module.ts
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT) || 5432,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      entities: [User],
      synchronize: true, // Chỉ để true trong development
      ssl: process.env.NODE_ENV === 'production',
    }),
    UserModule,
  ],
})
export class AppModule {}
```

### Bước 3: Environment Variables cho Database

Trong Render backend service, thêm biến từ database info:
```
PGHOST=dpg-xxxxx-xxxxxxxxx-a
PGPORT=5432
PGDATABASE=user_registration_xxxxx
PGUSER=user_registration_xxxxx_user
PGPASSWORD=xxxxx_long_password_xxxxx
```

(Copy từ database info trong Render dashboard)

---

## 🔧 RENDER VS RAILWAY

| Feature | Railway | Render |
|---------|---------|--------|
| **Free Tier** | $5 credit/month | 750 hours/month |
| **Database** | Paid add-on | Free PostgreSQL 100MB |
| **Interface** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Speed** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Documentation** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Support** | ⭐⭐⭐ | ⭐⭐⭐⭐ |

### 🏆 Kết luận: 
**Render thắng** về free tier và database miễn phí!

---

## 📋 RENDER DEPLOYMENT CHECKLIST

- [ ] GitHub repository ready
- [ ] Render account created
- [ ] Backend web service deployed
- [ ] Frontend static site deployed  
- [ ] Environment variables configured
- [ ] CORS updated and pushed
- [ ] (Optional) PostgreSQL database added
- [ ] Test application end-to-end

---

## 💡 TIPS VÀ TRICKS

### 1. Fix lỗi "nest: not found"
Nếu gặp lỗi này trong build:
```bash
sh: 1: nest: not found
```

**Giải pháp:**
- Đảm bảo `@nestjs/cli` và `typescript` có trong `dependencies` (không phải `devDependencies`)
- Sử dụng `npx nest build` thay vì `nest build`
- Build command: `cd backend && npm install`
- Start command: `cd backend && npm run build && npm run start:prod`

### 2. Auto-sleep và wake-up
- Free tier services sleep sau 15 phút không activity
- First request sau khi sleep có thể mất 30-60s để wake up
- Solution: Dùng cron job để ping service định kỳ

### 2. Custom Domain
```bash
# Trong Render dashboard
Settings → Custom Domains → Add domain
```

### 3. Build Optimization
```json
// Trong package.json
{
  "scripts": {
    "build": "npm ci && npm run build:prod"
  }
}
```

### 4. Environment Management
- Development: `.env`
- Production: Render dashboard Environment Variables
- Staging: Tạo separate services

---

## 🆚 SO SÁNH VỚI CÁC PLATFORM KHÁC

### Render vs Vercel:
- **Render**: Tốt cho traditional Node.js apps
- **Vercel**: Tốt cho JAMstack và serverless

### Render vs Heroku:
- **Render**: Free tier tốt hơn
- **Heroku**: Ecosystem phong phú hơn (nhưng không free)

### Render vs Netlify:
- **Render**: Full-stack deployment
- **Netlify**: Chuyên frontend + serverless functions

---

Bạn muốn tôi hướng dẫn deploy bằng Render không? Hay muốn thử Vercel?