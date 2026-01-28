# 🚀 AI Counsellor - Quick Reference Card

## 📁 Files You Received

### 📱 Frontend Files
- `ai-counsellor-app.jsx` - Complete React application (copy to `frontend/pages/index.jsx`)
- `frontend/package.json` - Frontend dependencies

### 🔧 Backend Files
- `backend/main.py` - Complete FastAPI application with all endpoints
- `backend/seed_db.py` - Database seeding script (20+ universities)
- `backend/requirements.txt` - Python dependencies

### 📚 Documentation
- `README.md` - Main project documentation
- `DEPLOYMENT_GUIDE.md` - Step-by-step deployment instructions
- `AI_INTEGRATION_GUIDE.md` - Claude API integration details
- `HACKATHON_CHECKLIST.md` - Submission checklist
- `PROJECT_SUMMARY.md` - This summary with next steps

### 🐳 Deployment Files
- `docker-compose.yml` - Docker configuration for local development
- `Dockerfile.backend` - Backend containerization
- `setup.sh` - Automated setup script

## ⚡ Quick Start (Choose One)

### Option 1: Docker (Easiest - 2 minutes)
```bash
cd ai-counsellor-project

# Add your Anthropic API key
echo "ANTHROPIC_API_KEY=your-key-here" > .env

# Start everything
docker-compose up -d

# Wait 30 seconds, then seed database
docker-compose exec backend python seed_db.py

# Open browser
open http://localhost:3000
```

### Option 2: Manual Setup (10 minutes)

**Terminal 1 - Backend:**
```bash
cd ai-counsellor-project/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://user:pass@localhost:5432/ai_counsellor
SECRET_KEY=$(openssl rand -hex 32)
ANTHROPIC_API_KEY=your-key-here
EOF

# Seed database
python seed_db.py

# Start server
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd ai-counsellor-project/frontend

# Move the React component
mkdir -p pages
cp ../ai-counsellor-app.jsx pages/index.jsx

# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Start frontend
npm run dev
```

**Terminal 3 - Database (if needed):**
```bash
# Create PostgreSQL database
createdb ai_counsellor
```

### Option 3: Automated Script (5 minutes)
```bash
cd ai-counsellor-project
chmod +x setup.sh
./setup.sh
# Follow the prompts
```

## 🔑 Get Anthropic API Key

1. Go to https://console.anthropic.com
2. Sign up or login
3. Navigate to "API Keys"
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-api03-...`)
6. Add to your `.env` file

## 🌐 Deployment to Production

### Step 1: Database (Choose One)
**Supabase (Recommended):**
1. Go to supabase.com → New Project
2. Copy "Connection Pooling" URL
3. Use as `DATABASE_URL`

**Neon:**
1. Go to neon.tech → New Project
2. Copy connection string
3. Use as `DATABASE_URL`

### Step 2: Backend (Render)
1. Go to render.com → New Web Service
2. Connect GitHub repo
3. Select `backend` directory
4. Add environment variables (DATABASE_URL, SECRET_KEY, ANTHROPIC_API_KEY)
5. Deploy
6. After deploy, run in Shell: `python seed_db.py`

### Step 3: Frontend (Vercel)
1. Go to vercel.com → Import Project
2. Select `frontend` directory
3. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api`
4. Deploy

## 📊 Project Structure

```
ai-counsellor-project/
├── frontend/
│   ├── pages/
│   │   └── index.jsx          ← Move ai-counsellor-app.jsx here
│   ├── package.json
│   └── .env.local
│
├── backend/
│   ├── main.py
│   ├── seed_db.py
│   ├── requirements.txt
│   └── .env
│
├── README.md
├── DEPLOYMENT_GUIDE.md
├── setup.sh
└── docker-compose.yml
```

## 🎯 Key Features

1. **Landing Page** - Clear value proposition
2. **Authentication** - Signup/Login with JWT
3. **Onboarding** - 4-step mandatory profile building
4. **Dashboard** - Personalized overview with stage tracking
5. **AI Counsellor** - Claude-powered intelligent guidance
6. **Universities** - 20+ seeded with Dream/Target/Safe categories
7. **Shortlisting** - Save interesting universities
8. **Locking** - Commit to universities for focused guidance
9. **Tasks** - Auto-generated, context-aware to-dos
10. **Profile Strength** - Real-time academic assessment

## 🔧 Common Issues & Fixes

### "Module not found" error
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

### Database connection error
```bash
# Check if PostgreSQL is running
psql --version
# or
docker ps | grep postgres
```

### AI not responding
```bash
# Verify API key in backend/.env
cat backend/.env | grep ANTHROPIC_API_KEY
```

### Port already in use
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## 📝 Demo Script (3 minutes)

1. **Landing (15s)** - Show value proposition
2. **Signup (10s)** - Quick account creation
3. **Onboarding (30s)** - Walk through 4 steps
4. **Dashboard (20s)** - Show personalized data
5. **AI Chat (45s)** - Ask for recommendations, shortlist via chat
6. **Universities (30s)** - Browse, lock university
7. **Tasks (20s)** - Show auto-generated tasks
8. **Conclusion (10s)** - Recap uniqueness

## 🎥 Recording Demo Video

### Tools
- **Loom** (loom.com) - Easy screen recording
- **OBS Studio** (Free, professional)
- **QuickTime** (Mac built-in)

### Tips
- Record in 1080p
- Show cursor
- Speak clearly
- Keep under 3 minutes
- Test audio first

## 📋 Submission Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Database seeded
- [ ] All features tested
- [ ] Demo video recorded (3 min)
- [ ] Deployment URL ready
- [ ] Submit to hackathon

## 🆘 Need Help?

1. Check `DEPLOYMENT_GUIDE.md` (detailed instructions)
2. Check `README.md` (full documentation)
3. Check `HACKATHON_CHECKLIST.md` (requirements)
4. All files have comments

## ✨ What Makes This Special

- **Not a chatbot** - It's a decision system
- **AI takes actions** - Shortlists, locks, creates tasks
- **Stage-based** - Clear progression
- **University locking** - Commitment mechanism
- **Smart tasks** - Auto-generated based on context

## 🎯 URLs After Setup

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Database**: localhost:5432

## 🏆 You're Ready!

Everything is set up and ready to go. Just:
1. Choose a setup method above
2. Test locally
3. Deploy to production
4. Record demo
5. Submit!

---

**Good luck! This is a solid, complete project that demonstrates exactly what they're looking for.** 🚀
