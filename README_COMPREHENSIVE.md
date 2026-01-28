# 🎓 AI Counsellor - Study Abroad Guidance Platform

**An AI-powered platform that guides students through their study-abroad journey with personalized university recommendations, smart matching, and real-time application support.**

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Python](https://img.shields.io/badge/Python-3.9%2B-blue)
![React](https://img.shields.io/badge/React-18%2B-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104%2B-green)

---

## 🌟 **Key Features**

✨ **AI-Powered Counsellor** - Intelligent guidance powered by Anthropic's Claude AI
📚 **Smart University Matching** - Dream, Target, and Safe university recommendations
🎯 **Profile-Based Recommendations** - Personalized matches based on academic profile
📋 **Application Management** - Track documents, exams, and deadlines
💬 **Real-Time Chat Support** - Get instant answers from your AI counsellor
🔒 **University Locking** - Commit to universities and unlock application-specific guidance
✅ **Task Management** - Auto-generated to-dos based on your profile and universities
📊 **Dashboard Overview** - Monitor your progress at a glance

---

## 🏗️ **Architecture**

```
┌─────────────────────────────────────────────────────────┐
│                   Frontend (React)                       │
│  Landing → Signup → Onboarding → Dashboard → Chat/Tasks │
└──────────────────┬──────────────────────────────────────┘
                   │
                   │ API Calls (REST)
                   │
┌──────────────────▼──────────────────────────────────────┐
│              Backend (FastAPI)                           │
│  Authentication → Profile → Universities → AI Chat      │
├──────────────────────────────────────────────────────────┤
│  - JWT Authentication                                    │
│  - PostgreSQL Database                                   │
│  - Anthropic AI Integration                              │
│  - RESTful API Endpoints                                 │
└──────────────────┬──────────────────────────────────────┘
                   │
                   │ Database Queries
                   │
┌──────────────────▼──────────────────────────────────────┐
│           PostgreSQL Database                            │
│  Users → Profiles → Universities → Shortlists → Todos   │
└─────────────────────────────────────────────────────────┘
```

---

## 📱 **User Flow**

```
Start
  ↓
Landing Page (Explainer, Features, CTA)
  ↓
Signup / Login
  ↓
Mandatory Onboarding (4 Steps)
  • Academic Background
  • Test Scores
  • Preferences
  • Budget & Location
  ↓
Dashboard (Control Center)
  ↓
Choose Path:
  ├→ Explore Universities (Dream/Target/Safe)
  │   ├→ Review and Shortlist
  │   └→ Lock University(ies)
  │       ↓
  │       Application Guidance
  │       (Documents, Timeline, Tasks)
  │
  ├→ Chat with AI Counsellor
  │   (Ask questions, get recommendations)
  │
  └→ Manage Tasks
      (Track progress, mark complete)
  ↓
Application Preparation
  ↓
Success! 🎉
```

---

## 🚀 **Quick Start**

### **Prerequisites**
- Python 3.9+
- Node.js 16+
- PostgreSQL 12+ (or SQLite for testing)
- Anthropic API key (free or paid)

### **Local Development**

#### **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Copy and configure .env
cp .env.example .env
# Edit .env and add ANTHROPIC_API_KEY

# Seed database with universities
python seed_comprehensive.py

# Start backend
uvicorn main:app --reload
```

#### **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with VITE_API_URL=http://localhost:8000
npm run dev
```

#### **Access Application**
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## 📚 **API Endpoints**

### **Authentication**
```
POST   /api/auth/signup          - Register new user
POST   /api/auth/login           - Login user
```

### **Profile**
```
GET    /api/profile              - Get user profile
POST   /api/profile              - Create profile (onboarding)
PUT    /api/profile              - Update profile
```

### **Universities**
```
GET    /api/universities         - List universities (with filters)
POST   /api/universities/{id}/shortlist - Add to shortlist
POST   /api/universities/{id}/lock      - Lock university
DELETE /api/universities/{id}/unlock    - Unlock university
```

### **Tasks**
```
GET    /api/todos                - Get user's tasks
POST   /api/todos                - Create new task
PATCH  /api/todos/{id}           - Update task (mark complete)
```

### **Chat**
```
POST   /api/chat                 - Send message to AI counsellor
```

### **Dashboard**
```
GET    /api/dashboard            - Get dashboard summary
```

---

## 💾 **Database Models**

**Users** - Authentication and identification
**Profiles** - Academic background, goals, budget
**Universities** - University listings with requirements
**Shortlists** - Universities added by user
**Locked** - Universities user committed to
**Todos** - Tasks for user to complete
**Chat** - Conversation history with AI

[See detailed schema in IMPLEMENTATION_ROADMAP.md]

---

## 🎯 **Key Technologies**

### **Frontend**
- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - API calls
- **Vite** - Build tool

### **Backend**
- **FastAPI** - API framework
- **SQLAlchemy** - ORM
- **PostgreSQL** - Database
- **Pydantic** - Data validation
- **JWT** - Authentication
- **Anthropic Claude** - AI

---

## 🔐 **Security Features**

- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ SQL injection protection (ORM)
- ✅ CORS configured
- ✅ Input validation on all endpoints
- ✅ Secure password storage
- ✅ Token expiration

---

## 📊 **Project Statistics**

| Metric | Count |
|--------|-------|
| API Endpoints | 15+ |
| Database Tables | 7 |
| React Components | 10+ |
| Universities Seeded | 25 |
| Lines of Backend Code | 800+ |
| Lines of Frontend Code | 1200+ |

---

## 🚀 **Deployment**

### **One-Click Deployment**

**Backend**: Deploy to Render, Railway, or Heroku
**Frontend**: Deploy to Vercel, Netlify, or GitHub Pages

[See detailed deployment guide in DEPLOYMENT_GUIDE_UPDATED.md]

---

## 📖 **Documentation**

- **[IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md)** - Development checklist
- **[DEPLOYMENT_GUIDE_UPDATED.md](./DEPLOYMENT_GUIDE_UPDATED.md)** - Deployment instructions
- **[SETUP_COMPLETE.md](./SETUP_COMPLETE.md)** - Initial setup documentation
- **[API Documentation](http://localhost:8000/docs)** - Interactive API docs (Swagger)

---

## 🤝 **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 **License**

This project is open source and available under the MIT License.

---

## 🎓 **Hackathon Submission**

**Project**: AI Counsellor - Study Abroad Guidance Platform
**Category**: EdTech / AI Integration
**Team**: [Your Name/Team]
**Status**: Production Ready ✅

### **Deliverables**
- ✅ Complete backend API (FastAPI)
- ✅ Complete frontend (React)
- ✅ Database schema with 25 universities
- ✅ AI integration with Anthropic Claude
- ✅ End-to-end user flow
- ✅ Responsive design
- ✅ Deployment ready
- ✅ Documentation
- ✅ Demo video (coming soon)

---

## 💡 **Future Enhancements**

1. Voice-based onboarding
2. Real university API integration
3. Document upload and verification
4. Scholarship database
5. Alumni mentorship matching
6. Real-time visa tracking
7. Cost of living calculator
8. Advanced analytics dashboard
9. Mobile app (React Native)
10. Multilingual support

---

## 📞 **Support**

For questions or issues:
- Check [DEPLOYMENT_GUIDE_UPDATED.md](./DEPLOYMENT_GUIDE_UPDATED.md) troubleshooting section
- Review API docs at `/docs`
- Check browser console for client-side errors
- Check backend logs for server-side errors

---

## 🙏 **Acknowledgments**

- [FastAPI](https://fastapi.tiangolo.com) - Web framework
- [React](https://react.dev) - UI library
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Anthropic](https://anthropic.com) - AI/Claude API
- [Lucide Icons](https://lucide.dev) - Icon library

---

**Made with ❤️ for students pursuing their dreams abroad**

*Last Updated: January 28, 2026*
