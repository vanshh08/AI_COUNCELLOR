# 🚀 Deploy Your App - Get Public Link in 10 Minutes

GitHub Username: **vanshh08**

---

## **STEP 1: Create GitHub Repository (2 minutes)**

### Option A: Using GitHub Web (Easiest)

1. Go to **https://github.com/new**
2. Sign in with your GitHub account (vanshh08)
3. Fill in:
   - **Repository name**: `ai-counsellor-app`
   - **Description**: `AI Counsellor - Study Abroad Guidance Platform`
   - **Visibility**: Public
4. **Don't** check "Initialize with README" (we already have it)
5. Click **"Create repository"**

### Option B: Using GitHub CLI

```bash
cd C:\Users\shree\Desktop\files
gh repo create ai-counsellor-app --public --source=. --push --remote=origin
```

---

## **STEP 2: Push Code to GitHub (1 minute)**

After creating the repository, you'll see instructions. Run this:

```bash
cd C:\Users\shree\Desktop\files
git remote add origin https://github.com/vanshh08/ai-counsellor-app.git
git branch -M main
git push -u origin main
```

✅ Your code is now on GitHub!

---

## **STEP 3: Deploy Backend to Render (3 minutes)**

### 1. Create Account
- Go to **https://render.com**
- Click "Sign Up" → Select "Continue with GitHub"
- Authorize GitHub

### 2. Create New Web Service
- Click **"New +"** → **"Web Service"**
- Connect your GitHub repository `ai-counsellor-app`

### 3. Configure Service
| Setting | Value |
|---------|-------|
| **Name** | `ai-counsellor-api` |
| **Root Directory** | `backend` |
| **Runtime** | Python 3.9 |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn main:app --host 0.0.0.0 --port 8000` |
| **Plan** | Free |

### 4. Add Environment Variables
Click "Environment" and add these:

```
SECRET_KEY=super-secret-key-change-this-12345!@#$%
DATABASE_URL=sqlite:///./counsellor.db
ANTHROPIC_API_KEY=your-api-key-here
ALLOWED_ORIGINS=http://localhost:3001,https://ai-counsellor-app.vercel.app
```

**Get ANTHROPIC_API_KEY**:
1. Go to https://console.anthropic.com
2. Sign up (free)
3. Create API key
4. Paste it in the field above

### 5. Deploy
- Click **"Create Web Service"**
- Wait 3-5 minutes
- You'll get a URL like: `https://ai-counsellor-api.onrender.com`

✅ **Copy your backend URL!**

---

## **STEP 4: Deploy Frontend to Vercel (3 minutes)**

### 1. Create Account
- Go to **https://vercel.com**
- Click "Sign Up" → Select "Continue with GitHub"
- Authorize GitHub

### 2. Import Project
- Click **"Add New +"** → **"Project"**
- Select `ai-counsellor-app` repository
- Click **"Import"**

### 3. Configure Project
| Setting | Value |
|---------|-------|
| **Framework** | Next.js |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `.next` |

### 4. Add Environment Variable
Click "Environment Variables" and add:

```
VITE_API_URL=https://ai-counsellor-api.onrender.com
```

Replace with your actual backend URL from Step 3!

### 5. Deploy
- Click **"Deploy"**
- Wait 2 minutes
- You'll get a URL like: `https://ai-counsellor-app.vercel.app`

✅ **This is your public app link!**

---

## **STEP 5: Update Backend ALLOWED_ORIGINS (1 minute)**

Go back to Render:
1. Select `ai-counsellor-api` service
2. Click "Environment"
3. Update `ALLOWED_ORIGINS`:
```
http://localhost:3001,https://ai-counsellor-app.vercel.app
```
4. Click "Save Changes"
5. Service auto-redeploys (~1 minute)

---

## **🎉 YOU'RE DONE!**

Your public app is now live at:

```
https://ai-counsellor-app.vercel.app
```

Share this link with anyone! They can:
- Sign up
- Complete onboarding
- Explore universities
- Chat with AI
- Manage tasks

---

## **📊 Summary**

| Component | URL |
|-----------|-----|
| **Frontend** | https://ai-counsellor-app.vercel.app |
| **Backend API** | https://ai-counsellor-api.onrender.com |
| **API Docs** | https://ai-counsellor-api.onrender.com/docs |

---

## **⚡ Quick Tips**

- **App is slow on first load?** Render free tier takes time to wake up (normal)
- **Changes not showing?** Push to GitHub → Vercel auto-deploys in 1-2 minutes
- **API errors?** Check Render logs: Dashboard → Service → Logs
- **Need more features?** Edit code, push to GitHub, auto-deploys!

---

## **Need Help?**

If you get stuck:
1. Check Vercel or Render dashboard for error logs
2. Verify GitHub repository has your latest code
3. Make sure all environment variables are set correctly

Good luck! 🚀
