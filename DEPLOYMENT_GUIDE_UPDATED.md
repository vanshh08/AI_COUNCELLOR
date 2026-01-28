# 🚀 AI Counsellor - Deployment Guide

## **Quick Start (Local Development)**

### **Prerequisites**
- Python 3.9+
- Node.js 16+
- PostgreSQL 12+ (optional, SQLite works for testing)
- Git
- Anthropic API key

### **Step 1: Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and add your Anthropic API key
# ANTHROPIC_API_KEY=your_api_key_here

# Create database and seed universities
python seed_comprehensive.py

# Start backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### **Step 2: Frontend Setup**

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Edit .env.local with API URL
# VITE_API_URL=http://localhost:8000

# Start frontend development server
npm run dev
```

### **Step 3: Access the Application**

- **Frontend**: http://localhost:5173 (or 3000)
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

---

## **Production Deployment**

### **Option 1: Deploy Backend to Render**

#### **Steps:**

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create Render account** at https://render.com

3. **Connect GitHub repository**
   - Click "New +" → "Web Service"
   - Select your GitHub repository
   - Choose Python as build language

4. **Configure environment**
   ```
   Name: ai-counsellor-backend
   Environment: Python
   Build Command: pip install -r requirements.txt && python seed_comprehensive.py
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

5. **Add environment variables**
   ```
   DATABASE_URL=postgresql://user:password@host/ai_counsellor
   SECRET_KEY=your-super-secret-key
   ANTHROPIC_API_KEY=your_anthropic_key
   ```

6. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### **Option 2: Deploy Backend to Railway**

1. **Connect GitHub**
   - Login at https://railway.app
   - Click "New Project"
   - Select GitHub repository

2. **Configure service**
   - Railway auto-detects Python
   - Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Add environment variables**
   ```
   DATABASE_URL=postgresql://...
   ANTHROPIC_API_KEY=your_key
   SECRET_KEY=your_secret
   ```

4. **Deploy**
   - Railway deploys automatically on push

### **Option 3: Deploy Frontend to Vercel**

1. **Connect GitHub**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository

2. **Configure**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Environment variables**
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel builds and deploys automatically

### **Option 4: Deploy Frontend to Netlify**

1. **Connect GitHub**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Select repository

2. **Configure build**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Environment variables**
   - Add `VITE_API_URL` in Netlify dashboard

4. **Deploy**
   - Netlify deploys on push

---

## **Database Setup**

### **PostgreSQL on Render**

1. **Create PostgreSQL database**
   - Click "New +" → "PostgreSQL"
   - Name it `ai-counsellor-db`
   - Get connection string from dashboard

2. **Update backend environment**
   ```
   DATABASE_URL=postgresql://user:password@host:port/ai_counsellor
   ```

3. **Seed database**
   ```bash
   python seed_comprehensive.py
   ```

### **SQLite (For quick testing)**

- Already configured by default
- No additional setup needed

---

## **Environment Variables Checklist**

### **Backend (.env)**
- ✅ `DATABASE_URL` - Your database connection string
- ✅ `SECRET_KEY` - JWT secret (use strong key)
- ✅ `ANTHROPIC_API_KEY` - Anthropic API key
- ✅ `ALLOWED_ORIGINS` - Frontend URL (for CORS)

### **Frontend (.env.local)**
- ✅ `VITE_API_URL` - Backend API URL

---

## **Testing Endpoints**

### **Using cURL or Postman**

```bash
# Signup
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "full_name": "Test User",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get universities
curl http://localhost:8000/api/universities \
  -H "Authorization: Bearer your_token"

# Send chat message
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_token" \
  -d '{
    "message": "Can you recommend universities for me?"
  }'
```

---

## **Monitoring & Debugging**

### **Backend Logs**
```bash
# View logs on Render
# Dashboard → Your service → Logs

# Local logs
# Check terminal where you ran uvicorn
```

### **Frontend Debugging**
```bash
# Check browser console (F12)
# Network tab for API calls
# Local storage for tokens
```

### **Database Queries**
```bash
# Connect to PostgreSQL
psql postgresql://user:password@host/ai_counsellor

# View users
SELECT * FROM users;

# View universities
SELECT * FROM universities LIMIT 10;
```

---

## **Performance Optimization**

### **Backend**
- ✅ Database indexes on frequently queried columns
- ✅ Connection pooling for database
- ✅ Caching for university listings
- ✅ Pagination for large result sets

### **Frontend**
- ✅ Code splitting and lazy loading
- ✅ Image optimization
- ✅ Caching API responses
- ✅ Minified CSS/JS

---

## **Security Checklist**

- ✅ JWT tokens stored securely
- ✅ HTTPS enforced in production
- ✅ CORS configured properly
- ✅ Password hashing (bcrypt)
- ✅ API rate limiting (add if needed)
- ✅ Input validation on backend
- ✅ SQL injection protection (SQLAlchemy ORM)

---

## **Troubleshooting**

### **"Cannot connect to backend"**
- Check `VITE_API_URL` is correct
- Check backend is running
- Check CORS settings

### **"Invalid token"**
- Clear localStorage
- Login again
- Check token expiration

### **"Database connection error"**
- Check `DATABASE_URL`
- Verify PostgreSQL is running
- Check credentials

### **"Anthropic API error"**
- Verify API key is correct
- Check API key has sufficient credits
- Check rate limits

---

## **Rolling Back Changes**

```bash
# Backend
git revert <commit-hash>
git push

# Frontend
# Same as backend, or use Vercel/Netlify rollback feature
```

---

## **Monitoring Services**

- **Backend**: Render/Railway dashboards
- **Frontend**: Vercel/Netlify dashboards
- **Database**: Database provider dashboard
- **Analytics**: (Optional) Add later

---

## **Support & Resources**

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [React Documentation](https://react.dev)
- [Render Deployment](https://render.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Anthropic API Docs](https://docs.anthropic.com)

---

**Last Updated**: January 28, 2026
