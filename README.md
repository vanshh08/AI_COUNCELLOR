# 🎓 AI Counsellor - Study Abroad Guidance Platform

> Transform your study-abroad journey from overwhelming confusion to confident action with AI-powered guidance

[![Demo](https://img.shields.io/badge/demo-live-green)](your-demo-link)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## 📺 Demo Video

[Watch the 3-minute demo](#) showcasing the complete user journey from signup to application

## 🚀 Project Overview

**AI Counsellor** is not just another university listing platform - it's a **guided decision-making system** that uses AI to help students make confident, informed choices about studying abroad. Instead of overwhelming users with options, it provides structured, stage-based guidance from profile building to application submission.

### Key Differentiators

- ✅ **Stage-Based Progression** - Unlock features as you complete each stage
- 🤖 **Intelligent AI Counsellor** - Powered by Claude API for personalized guidance
- 🎯 **University Locking** - Commit to universities to receive focused guidance
- 📋 **Smart Task Management** - Auto-generated, context-aware to-do lists
- 💪 **Profile Strength Analysis** - Real-time assessment of your competitiveness
- 🔒 **Structured Decision Flow** - No confusion, just clarity

## 🎯 Problem Statement

Students face overwhelming confusion when planning to study abroad:
- Too many university options without clear guidance
- Lack of personalized recommendations
- No structured approach to application process
- Difficulty understanding profile strengths and gaps

## 💡 Our Solution

AI Counsellor provides:
1. **Mandatory Onboarding** - Understand student profile deeply
2. **AI-Powered Recommendations** - Dream/Target/Safe categorization
3. **University Locking** - Focus on committed choices
4. **Actionable Tasks** - Clear next steps at every stage
5. **Continuous Guidance** - AI counsellor available 24/7

## ✨ Features

### 🔐 Authentication & Onboarding
- Secure signup/login with JWT
- 4-step mandatory onboarding process
- Profile strength calculation
- Academic, exam, and document status tracking

### 🤖 AI Counsellor (Claude-Powered)
- Context-aware conversations
- University recommendations based on profile
- Explains "why" each recommendation fits
- Can shortlist and lock universities via chat
- Generates and updates tasks automatically

### 🏛️ University Discovery
- 20+ seeded universities across USA, Canada, UK, Germany, Australia
- Filter by Dream/Target/Safe categories
- Detailed fit analysis for each university
- Tuition, acceptance rate, and requirements
- One-click shortlisting and locking

### 🔒 University Locking System
- Commit to universities to unlock application guidance
- Prevents distraction and maintains focus
- Auto-generates university-specific tasks
- Can unlock with clear warning

### ✅ Smart Task Management
- Auto-generated based on profile and locked universities
- Categories: Exams, Documents, Research, Application
- Track completion status
- Updates based on profile changes

### 📊 Dashboard
- Current stage indicator
- Profile strength metrics
- Shortlist and locked counts
- To-do list overview
- Quick access to all features

## 🛠️ Tech Stack

### Frontend
- **React 18** with **Next.js 14**
- **Tailwind CSS** for styling
- **Lucide React** for icons
- Local storage for persistence (demo)

### Backend
- **FastAPI** (Python)
- **SQLAlchemy** ORM
- **PostgreSQL** database
- **JWT** authentication
- **bcrypt** for password hashing

### AI
- **Claude API** (Anthropic) - Sonnet 4
- Context-aware prompting
- Structured output generation

### DevOps
- **Docker** & **Docker Compose**
- **Vercel** (Frontend)
- **Render/Railway** (Backend)
- **Supabase/Neon** (Database)

## 📦 Installation

### Quick Start with Docker (Recommended)

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-counsellor

# Create .env file
echo "ANTHROPIC_API_KEY=your-key-here" > .env

# Start all services
docker-compose up -d

# Seed the database
docker-compose exec backend python seed_db.py

# Access the app
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# PgAdmin: http://localhost:5050
```

### Manual Setup

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python seed_db.py
uvicorn main:app --reload
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📖 Usage Flow

### 1. **Landing Page**
- See product overview
- Click "Get Started" to begin

### 2. **Sign Up / Login**
- Create account or login
- Receive JWT token

### 3. **Onboarding (Mandatory)**
Complete 4 steps:
- Academic Background (degree, GPA, major)
- Study Goals (target degree, field, countries)
- Budget Planning (range, funding)
- Exam Readiness (IELTS, GRE, SOP status)

### 4. **Dashboard**
- View profile summary
- Check profile strength
- See current stage
- Access quick actions

### 5. **AI Counsellor**
- Ask for recommendations
- Get personalized guidance
- Shortlist universities via chat
- Understand profile gaps

Example prompts:
```
"Can you recommend universities for me?"
"Why is Stanford a reach for my profile?"
"Should I shortlist University of Toronto?"
"What tasks should I complete first?"
```

### 6. **University Discovery**
- Browse 20+ universities
- Filter by Dream/Target/Safe
- See why each fits your profile
- Understand potential risks
- Shortlist interesting options

### 7. **University Locking**
- Lock at least one university to proceed
- Receive focused application guidance
- Auto-generated application tasks
- Can unlock if needed

### 8. **Application Preparation**
- Complete university-specific tasks
- Track progress
- Get AI guidance on each step

## 🏗️ Project Architecture

```
┌─────────────────┐
│   React App     │
│   (Next.js)     │
└────────┬────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐      ┌──────────────┐
│   FastAPI       │─────▶│  PostgreSQL  │
│   Backend       │      │   Database   │
└────────┬────────┘      └──────────────┘
         │
         │ API Call
         ▼
┌─────────────────┐
│   Claude API    │
│   (Anthropic)   │
└─────────────────┘
```

## 📊 Database Schema

### Key Tables
- **users** - User authentication
- **user_profiles** - Academic & goal data
- **universities** - University information (20+ seeded)
- **shortlisted_universities** - User shortlists
- **locked_universities** - Committed applications
- **todos** - Task management
- **chat_messages** - AI conversation history

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login

### Profile
- `GET /api/profile` - Get profile
- `POST /api/profile` - Create profile
- `PUT /api/profile` - Update profile

### Universities
- `GET /api/universities` - List with filters
- `POST /api/universities/{id}/shortlist` - Shortlist
- `POST /api/universities/{id}/lock` - Lock for application
- `DELETE /api/universities/{id}/unlock` - Unlock

### Tasks
- `GET /api/todos` - List tasks
- `POST /api/todos` - Create task
- `PATCH /api/todos/{id}` - Update task

### AI Chat
- `POST /api/chat` - Send message to AI counsellor

### Dashboard
- `GET /api/dashboard` - Get summary data

## 🎨 Screenshots

### Landing Page
Clean, simple value proposition with clear CTA

### Dashboard
Personalized overview with stage progress and tasks

### AI Counsellor
Conversational interface with actionable recommendations

### University Discovery
Categorized recommendations with detailed analysis

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Render)
```yaml
# render.yaml
services:
  - type: web
    name: ai-counsellor-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Database (Supabase/Neon)
1. Create project on Supabase or Neon
2. Copy connection string
3. Add to environment variables
4. Run `seed_db.py` to populate data

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete instructions.

## 🔐 Environment Variables

### Backend (.env)
```bash
DATABASE_URL=postgresql://user:pass@host:port/db
SECRET_KEY=your-jwt-secret-minimum-32-characters
ANTHROPIC_API_KEY=sk-ant-api03-...
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://your-api.onrender.com/api
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Sign up with new account
- [ ] Complete all onboarding steps
- [ ] View dashboard with profile strength
- [ ] Chat with AI counsellor
- [ ] Ask for university recommendations
- [ ] Shortlist universities
- [ ] Lock at least one university
- [ ] Verify tasks auto-generated
- [ ] Mark tasks as complete
- [ ] Update profile and see recommendations change

### API Testing
```bash
# Test signup
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","full_name":"Test","password":"test123"}'
```

## 📈 Future Enhancements

### Phase 2
- [ ] Real university API integration
- [ ] Email notifications
- [ ] Document upload and storage
- [ ] SOP review by AI
- [ ] Interview preparation guidance

### Phase 3
- [ ] Payment integration for premium features
- [ ] Live counsellor video calls
- [ ] Community forum
- [ ] Success stories and testimonials
- [ ] Mobile app (React Native)

### Phase 4
- [ ] Multi-language support
- [ ] Scholarship finder
- [ ] Visa guidance
- [ ] Post-arrival support
- [ ] Alumni network

## 🤝 Contributing

This is a hackathon project. If you'd like to contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this project for learning or building your own version!

## 👥 Team

Built for [Hackathon Name] by:
- Your Name - Full Stack Development
- (Add team members)

## 🙏 Acknowledgments

- **Anthropic** for Claude API
- **FastAPI** for amazing Python framework
- **Next.js** team for React framework
- All open-source contributors

## 📞 Contact

- **Email**: your-email@example.com
- **Demo**: [Live Demo Link](#)
- **Video**: [Demo Video Link](#)

---

Made with ❤️ for students pursuing their dreams abroad

**Note**: This is a prototype built for a hackathon. For production use, additional security measures, testing, and features would be required.
