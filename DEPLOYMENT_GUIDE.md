# AI Counsellor - Complete Setup & Deployment Guide

## 🎯 Project Overview

AI Counsellor is a stage-based platform that guides students through their study-abroad journey using an intelligent AI counsellor powered by Claude API.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Database Setup](#database-setup)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Production Deployment](#production-deployment)
7. [API Documentation](#api-documentation)
8. [Architecture](#architecture)

---

## Prerequisites

### Required Software
- **Node.js** 18+ and npm
- **Python** 3.10+
- **PostgreSQL** 14+
- **Git**

### Required Accounts
- **Anthropic API Key** (for Claude AI)
- **Vercel Account** (for frontend deployment)
- **Render/Railway Account** (for backend deployment)
- **Supabase/Neon** (for managed PostgreSQL)

---

## Local Development Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ai-counsellor
```

### 2. Project Structure
```
ai-counsellor/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── seed_db.py           # Database seeding script
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables
├── frontend/
│   ├── pages/
│   │   └── index.jsx        # Main React app
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env.local
└── README.md
```

---

## Database Setup

### Option 1: Local PostgreSQL

1. **Install PostgreSQL**
```bash
# macOS
brew install postgresql@14
brew services start postgresql@14

# Ubuntu
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

2. **Create Database**
```bash
psql postgres
CREATE DATABASE ai_counsellor;
CREATE USER ai_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE ai_counsellor TO ai_user;
\q
```

3. **Update DATABASE_URL**
```
DATABASE_URL=postgresql://ai_user:your_secure_password@localhost:5432/ai_counsellor
```

### Option 2: Managed Database (Recommended for Production)

**Using Supabase:**
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy the connection string from Settings > Database
4. Use the "Connection Pooling" URL for better performance

**Using Neon:**
1. Go to [neon.tech](https://neon.tech)
2. Create new project
3. Copy the connection string
4. Use the pooled connection string

---

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Create Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Create .env File
```bash
# backend/.env
DATABASE_URL=postgresql://user:password@host:port/dbname
SECRET_KEY=your-super-secret-jwt-key-change-this
ANTHROPIC_API_KEY=your-anthropic-api-key
```

**Get Anthropic API Key:**
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create account or login
3. Navigate to API Keys
4. Create new key

### 5. Initialize Database
```bash
# This will create all tables
python main.py
# Or use Alembic for migrations (advanced)
```

### 6. Seed University Data
```bash
python seed_db.py
```

### 7. Run Backend Server
```bash
uvicorn main:app --reload --port 8000
```

Backend should now be running at `http://localhost:8000`

### 8. Test API
```bash
curl http://localhost:8000/
# Should return: {"message": "AI Counsellor API is running"}
```

---

## Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create .env.local File
```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 4. Setup Tailwind CSS

Create `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Create `postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Create `styles/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Create Next.js Page Structure

Create `pages/_app.jsx`:
```javascript
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

Create `pages/index.jsx`:
```javascript
import AICountellorApp from '../components/AICountellorApp'

export default function Home() {
  return <AICountellorApp />
}
```

Move the main app component to `components/AICountellorApp.jsx`

### 6. Run Frontend
```bash
npm run dev
```

Frontend should now be running at `http://localhost:3000`

---

## Production Deployment

### Backend Deployment (Render)

1. **Prepare for Deployment**
```bash
# Create render.yaml in backend/
```

```yaml
services:
  - type: web
    name: ai-counsellor-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: SECRET_KEY
        sync: false
      - key: ANTHROPIC_API_KEY
        sync: false
      - key: PYTHON_VERSION
        value: 3.10.0
```

2. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repo
   - Select `backend` directory
   - Add environment variables
   - Deploy

3. **Run Database Migration**
```bash
# SSH into Render instance or use Render Shell
python seed_db.py
```

### Frontend Deployment (Vercel)

1. **Prepare for Deployment**

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Select `frontend` directory
   - Add environment variable:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
     ```
   - Deploy

### Alternative: Railway Deployment

**Full-Stack on Railway:**
```yaml
# railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## API Documentation

### Authentication Endpoints

#### POST /api/auth/signup
```json
Request:
{
  "email": "user@example.com",
  "full_name": "John Doe",
  "password": "securepassword123"
}

Response:
{
  "access_token": "jwt-token",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe"
  }
}
```

#### POST /api/auth/login
```json
Request:
{
  "email": "user@example.com",
  "password": "securepassword123"
}

Response:
{
  "access_token": "jwt-token",
  "token_type": "bearer",
  "user": {...}
}
```

### Profile Endpoints

#### POST /api/profile
Create user profile after onboarding
```json
Request:
{
  "education_level": "undergraduate",
  "current_degree": "Bachelor of Technology",
  "major": "Computer Science",
  "graduation_year": "2024",
  "gpa": 3.6,
  "target_degree": "masters",
  "field_of_study": "Computer Science",
  "target_intake_year": "2025",
  "preferred_countries": ["USA", "Canada"],
  "budget_range": "20000-40000",
  "funding_plan": "self",
  "ielts_status": "completed",
  "ielts_score": 7.5,
  "gre_status": "completed",
  "gre_score": 320,
  "sop_status": "draft"
}
```

#### GET /api/profile
Get current user's profile

#### PUT /api/profile
Update profile (partial updates supported)

### University Endpoints

#### GET /api/universities
Get filtered universities
```
Query params:
- country: filter by country
- category: dream/target/safe
- max_tuition: maximum tuition amount
```

#### POST /api/universities/{id}/shortlist
Shortlist a university

#### POST /api/universities/{id}/lock
Lock university for application

#### DELETE /api/universities/{id}/unlock
Unlock a university

### Todo Endpoints

#### GET /api/todos
Get all user todos

#### POST /api/todos
Create new todo

#### PATCH /api/todos/{id}
Update todo completion status

### AI Chat Endpoint

#### POST /api/chat
```json
Request:
{
  "message": "Can you recommend some universities for me?"
}

Response:
{
  "response": "Based on your profile..."
}
```

### Dashboard Endpoint

#### GET /api/dashboard
Get dashboard summary data

---

## Architecture

### System Architecture
```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│             │         │              │         │             │
│   React     │────────▶│   FastAPI    │────────▶│ PostgreSQL  │
│  Frontend   │         │   Backend    │         │  Database   │
│             │         │              │         │             │
└─────────────┘         └──────────────┘         └─────────────┘
                               │
                               │
                               ▼
                        ┌──────────────┐
                        │   Claude AI  │
                        │  (Anthropic) │
                        └──────────────┘
```

### Data Flow

1. **User Onboarding**
   - User creates account → JWT token issued
   - User completes onboarding → Profile created
   - Profile strength calculated → Initial todos generated

2. **AI Counsellor Interaction**
   - User sends message → Saved to chat_messages
   - Context built from profile + history
   - Claude API called → Response generated
   - Response saved → Returned to user

3. **University Discovery**
   - Universities filtered by profile
   - Recommendations categorized (Dream/Target/Safe)
   - User can shortlist → Saved to shortlisted_universities
   - User can lock → Saved to locked_universities + todos generated

4. **Application Process**
   - Locked universities trigger application tasks
   - Tasks tracked in todos table
   - Progress visible on dashboard

### Database Schema

**Key Tables:**
- `users`: User authentication
- `user_profiles`: Student academic/goal data
- `universities`: University information
- `shortlisted_universities`: User shortlists
- `locked_universities`: Committed applications
- `todos`: Task management
- `chat_messages`: AI conversation history

---

## Environment Variables Reference

### Backend (.env)
```bash
DATABASE_URL=postgresql://user:pass@host:port/dbname
SECRET_KEY=your-jwt-secret-key-min-32-chars
ANTHROPIC_API_KEY=sk-ant-api03-...
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api  # Local
# or
NEXT_PUBLIC_API_URL=https://your-api.onrender.com/api  # Production
```

---

## Testing

### Manual Testing Flow

1. **Landing Page** → Sign Up
2. **Onboarding** → Complete all 4 steps
3. **Dashboard** → Verify profile summary
4. **AI Counsellor** → Ask for recommendations
5. **Universities** → Shortlist and lock universities
6. **Todos** → Mark tasks complete

### API Testing with cURL

```bash
# Signup
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","full_name":"Test User","password":"test123"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get Universities (with token)
curl -X GET http://localhost:8000/api/universities \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Common Issues & Solutions

### Issue: Database Connection Failed
**Solution:** Check DATABASE_URL format and credentials

### Issue: CORS Errors
**Solution:** Ensure CORS middleware is configured in main.py

### Issue: AI Not Responding
**Solution:** Verify ANTHROPIC_API_KEY is valid and has credits

### Issue: Frontend Can't Connect to Backend
**Solution:** Check NEXT_PUBLIC_API_URL matches backend URL

---

## Performance Optimization

### Backend
- Enable connection pooling in PostgreSQL
- Add Redis for session caching (optional)
- Implement request rate limiting
- Use async/await for all DB operations

### Frontend
- Implement React.lazy for code splitting
- Add loading states for better UX
- Cache API responses in localStorage
- Optimize images with Next.js Image component

---

## Security Best Practices

1. **Never commit .env files**
2. **Use HTTPS in production**
3. **Implement rate limiting on API**
4. **Validate all user inputs**
5. **Use parameterized queries (already done with SQLAlchemy)**
6. **Rotate JWT secrets regularly**
7. **Enable CORS only for trusted domains in production**

---

## Monitoring & Logging

### Production Monitoring
- Set up error tracking (Sentry)
- Monitor API response times
- Track database query performance
- Set up uptime monitoring (UptimeRobot)

### Logging
```python
# Add to main.py
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
```

---

## Next Steps for Production

1. ✅ Complete core features (all implemented)
2. 🔄 Add comprehensive error handling
3. 🔄 Implement real university API integration
4. 🔄 Add email notifications
5. 🔄 Implement file upload for documents
6. 🔄 Add payment integration for premium features
7. 🔄 Build admin dashboard
8. 🔄 Add analytics tracking

---

## Support & Resources

- **FastAPI Docs:** https://fastapi.tiangolo.com
- **Next.js Docs:** https://nextjs.org/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs
- **Anthropic API Docs:** https://docs.anthropic.com
- **Deployment Guides:**
  - Render: https://render.com/docs
  - Vercel: https://vercel.com/docs

---

## License

MIT License - Feel free to use this for your hackathon!

---

## Demo Video Script

### 1. Landing Page (15 seconds)
"Welcome to AI Counsellor - your guided journey to studying abroad"

### 2. Sign Up & Onboarding (45 seconds)
- Show quick signup
- Walk through 4-step onboarding
- Highlight profile strength calculation

### 3. Dashboard (30 seconds)
- Show personalized dashboard
- Point out current stage
- Highlight todo list

### 4. AI Counsellor (60 seconds)
- Ask "Can you recommend universities for me?"
- Show intelligent recommendations
- Demonstrate shortlisting action
- Show task generation

### 5. Universities Page (45 seconds)
- Browse universities
- Filter by category
- Shortlist and lock university
- Show automatic task creation

### 6. Closing (15 seconds)
"AI Counsellor - From confusion to clarity in your study-abroad journey"

**Total: 3 minutes 30 seconds**

---

Good luck with your hackathon! 🚀
