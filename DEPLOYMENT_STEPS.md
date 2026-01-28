# 🚀 Quick Deployment Guide - Get Public Links in 10 Minutes

Your AI Counsellor app is ready to go live! Follow these simple steps to get shareable links.

---

## **Step 1: Create GitHub Repository (2 minutes)**

### Option A: Using GitHub Web
1. Go to https://github.com/new
2. Login/Signup (if needed)
3. Create repo named: `ai-counsellor-app`
4. **Don't** initialize with README (we have it)
5. Click "Create repository"

### Option B: Using GitHub CLI
```bash
# Install GitHub CLI from https://cli.github.com
gh repo create ai-counsellor-app --public --source=. --push
```

### After Creating Repo:
```bash
cd C:\Users\shree\Desktop\files
git remote add origin https://github.com/YOUR_USERNAME/ai-counsellor-app.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username!

---

## **Step 2: Deploy Backend to Render (3 minutes)**

### 1. Create Render Account
- Go to https://render.com
- Click "Sign Up" → "Continue with GitHub"
- Authorize GitHub access

### 2. Create New Service
- Click "New +" → "Web Service"
- Select "Deploy an existing repository"
- Choose your `ai-counsellor-app` repo

### 3. Configure Backend
| Setting | Value |
|---------|-------|
| **Name** | `ai-counsellor-api` |
| **Root Directory** | `backend` |
| **Runtime** | `Python 3.9` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn main:app --host 0.0.0.0 --port 8000` |
| **Plan** | `Free` |

### 4. Set Environment Variables
Click "Environment" and add:
```
SECRET_KEY=your-super-secret-key-change-this-!@#$%
DATABASE_URL=sqlite:///./counsellor.db
ANTHROPIC_API_KEY=your-anthropic-api-key-here
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,https://your-frontend-url.vercel.app
```

> **Get ANTHROPIC_API_KEY**: Visit https://console.anthropic.com → Create account → Get API key

### 5. Deploy
- Click "Create Web Service"
- Wait ~3-5 minutes for deployment
- You'll get a URL like: `https://ai-counsellor-api.onrender.com`

✅ **Copy your backend URL** - you'll need it for frontend

---

## **Step 3: Deploy Frontend to Vercel (3 minutes)**

### 1. Create Vercel Account
- Go to https://vercel.com
- Click "Sign Up" → "Continue with GitHub"
- Authorize GitHub

### 2. Import Project
- Click "Add New +" → "Project"
- Select `ai-counsellor-app` repository
- Click "Import"

### 3. Configure Frontend
| Setting | Value |
|---------|-------|
| **Framework Preset** | `Vite` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### 4. Set Environment Variable
Click "Environment Variables" and add:
```
VITE_API_URL=https://ai-counsellor-api.onrender.com
```

Replace with your actual backend URL from Step 2!

### 5. Deploy
- Click "Deploy"
- Wait ~2 minutes
- You'll get a URL like: `https://ai-counsellor-app.vercel.app`

✅ **Copy your frontend URL**

---

## **Step 4: Update Backend with Frontend URL (1 minute)**

Go back to Render dashboard:
1. Select your `ai-counsellor-api` service
2. Go to "Environment"
3. Update `ALLOWED_ORIGINS`:
```
http://localhost:5173,https://your-frontend-url.vercel.app
```

Replace with your actual frontend URL!

4. Click "Save Changes"
5. Service will auto-redeploy (~1 minute)

---

## **📱 YOUR PUBLIC LINKS**

Once deployment is complete:

```
🌐 Frontend: https://ai-counsellor-app.vercel.app
🔌 Backend API: https://ai-counsellor-api.onrender.com
📚 API Docs: https://ai-counsellor-api.onrender.com/docs
```

---

## **✅ Testing Your Deployment**

1. Visit your frontend URL
2. Sign up with test credentials
3. Complete onboarding
4. Explore universities
5. Try the AI chat feature

---

## **🐛 Troubleshooting**

### **Backend won't start**
- Check Render logs: Dashboard → Service → Logs
- Verify ANTHROPIC_API_KEY is set
- Check DATABASE_URL format

### **Frontend shows "API Error"**
- Verify VITE_API_URL is correct (with https://)
- Check browser console for errors
- Ensure ALLOWED_ORIGINS on backend includes your frontend URL

### **Services take time to start**
- Render free tier can be slow (first request ~30 seconds)
- This is normal! They'll speed up after warming up

---

## **📊 Summary**

| Component | Status | URL |
|-----------|--------|-----|
| Frontend | ✅ Deployed | https://your-app.vercel.app |
| Backend | ✅ Deployed | https://your-api.onrender.com |
| Database | ✅ Included | SQLite in backend |
| AI | ✅ Ready | Anthropic Claude |

---

## **Next Steps**

1. **Share the link**: Send your frontend URL to anyone!
2. **Monitor**: Check Render/Vercel dashboards for usage
3. **Iterate**: Make changes, push to GitHub, services auto-deploy
4. **Scale**: Upgrade plans when free tier isn't enough

---

**Questions?** Check `DEPLOYMENT_GUIDE_UPDATED.md` for detailed documentation.
