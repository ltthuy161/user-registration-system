# 🚀 HƯỚNG DẪN DEPLOY LÊN VERCEL (DỄ NHẤT)

Vercel là platform tuyệt vời cho React + NestJS, rất dễ sử dụng và có free tier tốt.

## ✨ Tại sao chọn Vercel?

- ✅ **Cực kỳ dễ sử dụng** - chỉ cần kết nối GitHub
- ✅ **Free tier tốt** - 100GB bandwidth, unlimited projects
- ✅ **Tự động deploy** khi push code
- ✅ **Global CDN** - tốc độ cực nhanh
- ✅ **Built-in analytics** và monitoring
- ✅ **Custom domains** miễn phí

## 🎯 CÁCH DEPLOY

### Bước 1: Chuẩn bị code cho Vercel

#### 1.1 Tạo vercel.json cho toàn bộ dự án
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    },
    {
      "src": "backend/src/main.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/src/main.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

#### 1.2 Cập nhật API URL trong frontend
```typescript
// frontend/src/services/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://localhost:3001'
  );
```

#### 1.3 Cập nhật backend cho serverless
```typescript
// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// For Vercel serverless
export default async function handler(req: any, res: any) {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: true, // Allow all origins for simplicity
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.init();
  
  // Handle the request
  return app.getHttpAdapter().getInstance()(req, res);
}

// Keep the original bootstrap for local development
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: ['http://localhost:3000', 'https://*.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend server is running on port ${port}`);
}

// Only run bootstrap if not in Vercel environment
if (process.env.VERCEL !== '1') {
  bootstrap();
}
```

### Bước 2: Deploy lên Vercel

#### 2.1 Sử dụng Vercel Website (Dễ nhất)
1. Vào https://vercel.com
2. Đăng nhập bằng GitHub
3. Click "New Project"
4. Import GitHub repository
5. Vercel tự động detect và deploy!

#### 2.2 Sử dụng Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /Users/thanhthuy/Documents/IA_AWAD/UserRegistration
vercel

# Follow prompts:
# - Link to existing project? N
# - Project name: user-registration-system
# - Deploy? Y
```

### Bước 3: Cấu hình Environment Variables

Trong Vercel dashboard:
1. Vào Project Settings
2. Environment Variables
3. Thêm:
```
NODE_ENV=production
REACT_APP_API_URL=/api
```

---

## 🔄 RENDER (Thay thế Railway dễ dàng)

Nếu bạn muốn thử platform khác tương tự Railway:

### Ưu điểm của Render:
- ✅ **Free tier tốt hơn Railway**
- ✅ **PostgreSQL database miễn phí**
- ✅ **Interface dễ sử dụng**
- ✅ **Auto-deploy từ GitHub**

### Cách deploy trên Render:
1. Vào https://render.com
2. Đăng nhập bằng GitHub
3. **Deploy Backend:**
   - New Web Service
   - Connect repository
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm run start:prod`
   - Environment Variables: `NODE_ENV=production`

4. **Deploy Frontend:**
   - New Static Site
   - Connect repository
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/build`
   - Environment Variables: `REACT_APP_API_URL=https://your-backend.onrender.com`

---

## 📊 SO SÁNH NHANH

| Feature | Railway | Vercel | Render |
|---------|---------|--------|--------|
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Free Tier** | $5 credit | 100GB bandwidth | 750h/month |
| **Speed** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Database** | Add-on | External | Free PostgreSQL |
| **Best For** | Full-stack apps | Frontend + API | Traditional apps |

---

## 💡 KHUYẾN NGHỊ

### Cho dự án của bạn, tôi khuyến nghị:

1. **Vercel** - Nếu bạn muốn deploy nhanh và đơn giản nhất
2. **Render** - Nếu bạn muốn thay thế Railway với free database
3. **Netlify + Railway** - Như hiện tại, ổn định

Bạn muốn tôi hướng dẫn chi tiết platform nào?