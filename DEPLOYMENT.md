# Deployment Guide for Render

This guide will help you deploy your ORM Cashback System to Render and test it there.

## 🚀 Quick Deploy with render.yaml

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Sign up/Login

3. **Create New Blueprint**
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml` and create all services

## 📋 Manual Setup (Alternative)

If you prefer manual setup, follow these steps:

### 1. Create PostgreSQL Database

1. Go to Render Dashboard → "New +" → "PostgreSQL"
2. Name: `orm-cashback-db`
3. Database: `orm_db`
4. User: `orm_user`
5. Plan: Free
6. **Copy the Internal Database URL** (you'll need this)

### 2. Deploy Backend (Django)

1. Go to "New +" → "Web Service"
2. Connect your GitHub repository
3. Settings:
   - **Name**: `orm-cashback-backend`
   - **Environment**: `Python 3`
   - **Build Command**: 
     ```bash
     pip install -r orm-cashback-backend/requirements.txt && cd orm-cashback-backend && python manage.py collectstatic --noinput && python manage.py migrate
     ```
   - **Start Command**: 
     ```bash
     cd orm-cashback-backend && gunicorn orm_cashback.wsgi:application
     ```
   - **Root Directory**: Leave empty (or set to `orm-cashback-backend` if needed)

4. **Environment Variables** (in Render Dashboard):
   ```
   SECRET_KEY=<generate a secure random string>
   DEBUG=False
   ALLOWED_HOSTS=orm-cashback-backend.onrender.com,localhost,127.0.0.1
   DATABASE_URL=<from PostgreSQL service - Internal Database URL>
   CORS_ALLOWED_ORIGINS=https://orm-cashback-frontend.onrender.com
   ```
   
   Optional (for payments/email):
   ```
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   EMAIL_HOST=smtp.hostinger.com
   EMAIL_HOST_USER=your_email@domain.com
   EMAIL_HOST_PASSWORD=your_email_password
   ```

5. **Update Django Settings** (if using PostgreSQL):
   - Render provides `DATABASE_URL` automatically
   - You may need to install `dj-database-url` package:
     ```bash
     pip install dj-database-url
     ```
   - Update `orm-cashback-backend/orm_cashback/settings.py`:
     ```python
     import dj_database_url
     
     # Database
     DATABASES = {
         'default': dj_database_url.config(
             default=os.getenv('DATABASE_URL', 'sqlite:///db.sqlite3'),
             conn_max_age=600
         )
     }
     ```

### 3. Deploy Frontend (Next.js)

1. Go to "New +" → "Web Service"
2. Connect your GitHub repository
3. Settings:
   - **Name**: `orm-cashback-frontend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Root Directory**: Leave empty (root of repo)

4. **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://orm-cashback-backend.onrender.com/api
   NODE_ENV=production
   ```

## ✅ Testing on Render

Once deployed:

1. **Backend Health Check**:
   - Visit: `https://orm-cashback-backend.onrender.com/api/health/`
   - Should return: `{"status": "ok"}`

2. **Frontend**:
   - Visit: `https://orm-cashback-frontend.onrender.com`
   - You should see your app!

3. **Test Login**:
   - Use the test credentials created earlier:
     - **Admin**: `admin@test.com` / `admin123`
     - **Brand**: `brand@test.com` / `brand123`
     - **Shopper**: `shopper@test.com` / `shopper123`

## 🔧 Important Notes

### CORS Configuration
After deploying, update the backend's `CORS_ALLOWED_ORIGINS` to include your frontend URL:
```
CORS_ALLOWED_ORIGINS=https://orm-cashback-frontend.onrender.com
```

### Database Migrations
Migrations run automatically during build. If you need to run them manually:
```bash
cd orm-cashback-backend
python manage.py migrate
```

### Creating Test Users on Render
SSH into your backend service and run:
```bash
cd orm-cashback-backend
python manage.py create_test_users
```

### Static Files
Static files are collected during build. If you need to serve them:
- Install `whitenoise` (already in requirements.txt)
- Add to `MIDDLEWARE` in settings.py:
  ```python
  'whitenoise.middleware.WhiteNoiseMiddleware',
  ```

## 🐛 Troubleshooting

1. **Build Fails**:
   - Check build logs in Render dashboard
   - Ensure all dependencies are in `requirements.txt`

2. **Database Connection Error**:
   - Verify `DATABASE_URL` is set correctly
   - Check PostgreSQL service is running
   - Ensure database name/user match

3. **CORS Errors**:
   - Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL
   - Check backend logs for CORS errors

4. **API Not Found**:
   - Verify `NEXT_PUBLIC_API_URL` points to correct backend URL
   - Check backend is running and accessible

## 📝 Environment Variables Summary

### Backend Required:
- `SECRET_KEY` - Django secret key
- `DEBUG` - Set to `False` for production
- `ALLOWED_HOSTS` - Comma-separated list of allowed hosts
- `DATABASE_URL` - PostgreSQL connection string (auto-provided by Render)

### Backend Optional:
- `RAZORPAY_KEY_ID` - Payment gateway key
- `RAZORPAY_KEY_SECRET` - Payment gateway secret
- `EMAIL_HOST` - SMTP server
- `EMAIL_HOST_USER` - Email username
- `EMAIL_HOST_PASSWORD` - Email password

### Frontend Required:
- `NEXT_PUBLIC_API_URL` - Backend API URL (e.g., `https://orm-cashback-backend.onrender.com/api`)

## 🎉 You're Done!

Once deployed, you can:
- ✅ Test all features on Render
- ✅ Share the URL with others
- ✅ Use it as a staging/production environment
- ✅ Monitor logs and performance in Render dashboard

