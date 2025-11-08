# User Registration System

A full-stack application with NestJS backend and React frontend for user registration and authentication.

## Project Structure

```
UserRegistration/
├── backend/          # NestJS API server
├── frontend/         # React application
└── README.md
```

## Getting Started

### Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev
```

### Frontend (React)
```bash
cd frontend
npm install
npm start
```

## Deployment

This project can be deployed with the frontend on Netlify and the backend on Railway, Render, or similar platforms.

### Backend Deployment (Railway/Render)

1. **Prepare the backend:**
   ```bash
   cd backend
   npm install
   npm run build
   ```

2. **Deploy to Railway:**
   - Connect your GitHub repository to Railway
   - Railway will automatically detect the Node.js project
   - Set environment variables in Railway dashboard:
     - `NODE_ENV=production`
     - `PORT` (automatically set by Railway)
   - The `Procfile` is already configured for deployment

3. **Deploy to Render:**
   - Connect your GitHub repository to Render
   - Create a new Web Service
   - Set build command: `cd backend && npm install && npm run build`
   - Set start command: `cd backend && npm run start:prod`
   - Set environment variables as needed

### Frontend Deployment (Netlify)

1. **Prepare the frontend:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build settings:
     - Build command: `cd frontend && npm install && npm run build`
     - Publish directory: `frontend/build`
   - Set environment variables in Netlify dashboard:
     - `REACT_APP_API_URL=https://your-backend-url.com`
   - The `netlify.toml` file is already configured

3. **Update CORS settings:**
   - After deployment, update the `main.ts` file in the backend
   - Replace `'https://your-app-name.netlify.app'` with your actual Netlify URL
   - Redeploy the backend

### Environment Variables

#### Backend (.env)
```
NODE_ENV=production
PORT=3001
DB_TYPE=sqlite
DB_DATABASE=database.sqlite
CORS_ORIGINS=https://your-app-name.netlify.app
```

#### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.com
```

### Post-Deployment Steps

1. Update the CORS origins in `backend/src/main.ts` with your actual Netlify URL
2. Set the `REACT_APP_API_URL` environment variable in Netlify to your backend URL
3. Test the deployed application thoroughly
4. Consider using a custom domain for both frontend and backend

## Features

- User registration with email/password
- Form validation
- Password hashing
- Error handling
- Responsive UI with shadcn/ui
- API state management with React Query

## Tech Stack

**Backend:**
- NestJS
- TypeORM
- SQLite (for development)
- bcrypt for password hashing
- class-validator for validation

**Frontend:**
- React 18
- TypeScript
- React Router
- React Hook Form
- React Query
- shadcn/ui
- Tailwind CSS