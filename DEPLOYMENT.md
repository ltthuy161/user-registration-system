# Deployment Checklist

## Pre-Deployment Setup

### Backend Preparation
- [ ] Environment variables configured in `.env.example`
- [ ] CORS origins updated in `main.ts`
- [ ] Production build tested locally: `npm run build && npm run start:prod`
- [ ] Database configuration reviewed (consider PostgreSQL for production)

### Frontend Preparation
- [ ] API URL environment variable configured
- [ ] Production build tested locally: `npm run build`
- [ ] React Router redirects configured in `_redirects`
- [ ] Netlify configuration reviewed in `netlify.toml`

## Backend Deployment (Railway/Render)

### Railway
- [ ] GitHub repository connected to Railway
- [ ] Environment variables set in Railway dashboard:
  - [ ] `NODE_ENV=production`
  - [ ] Other environment variables from `.env.example`
- [ ] Deployment successful and service running
- [ ] API endpoints accessible and CORS working

### Render (Alternative)
- [ ] GitHub repository connected to Render
- [ ] Web Service created
- [ ] Build command set: `cd backend && npm install && npm run build`
- [ ] Start command set: `cd backend && npm run start:prod`
- [ ] Environment variables configured
- [ ] Deployment successful

## Frontend Deployment (Netlify)

### Netlify Setup
- [ ] GitHub repository connected to Netlify
- [ ] Build settings configured:
  - [ ] Build command: `cd frontend && npm install && npm run build`
  - [ ] Publish directory: `frontend/build`
- [ ] Environment variables set in Netlify dashboard:
  - [ ] `REACT_APP_API_URL=https://your-backend-url.com`
- [ ] Deployment successful

### Post-Deployment
- [ ] Backend CORS updated with actual Netlify URL
- [ ] Backend redeployed with updated CORS settings
- [ ] Frontend can successfully communicate with backend API
- [ ] All pages and routes working correctly
- [ ] User registration flow tested end-to-end

## Production Considerations

### Security
- [ ] HTTPS enforced on both frontend and backend
- [ ] Environment variables properly secured
- [ ] CORS origins restricted to production domains only
- [ ] Input validation working properly

### Database
- [ ] Consider migrating from SQLite to PostgreSQL for production
- [ ] Database backups configured
- [ ] Database connection pooling if needed

### Monitoring
- [ ] Error tracking setup (Sentry, LogRocket, etc.)
- [ ] Performance monitoring
- [ ] Uptime monitoring for backend API

## Troubleshooting

### Common Issues
- [ ] CORS errors: Check CORS origins in backend main.ts
- [ ] 404 errors on refresh: Ensure `_redirects` file is in place
- [ ] API connection issues: Verify REACT_APP_API_URL environment variable
- [ ] Build failures: Check Node.js version compatibility

### Testing Endpoints
- [ ] GET health check endpoint (if available)
- [ ] POST /user/register with test data
- [ ] Verify error handling for invalid inputs