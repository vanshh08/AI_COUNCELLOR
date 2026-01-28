# 🚀 Deploy to Render + Vercel - Complete Step-by-Step Guide

**Before starting:** Make sure you've created the GitHub repository!
If not, follow `CREATE_GITHUB_REPO.md` first.

---

## **PART 1: Deploy Backend to Render (3 minutes)**

### **Step 1: Create Render Account**

1. Go to **https://render.com**
2. Click **"Sign Up"** (top right)
3. Select **"Continue with GitHub"**
4. Click **"Authorize render-io"**
5. Authorize GitHub access

✅ You now have a Render account!

---

### **Step 2: Create New Web Service**

1. Go to Render Dashboard: **https://dashboard.render.com**
2. Click **"New +"** button (top right)
3. Select **"Web Service"**

You'll see two options:
- "Existing repository" ← **Click this**
- "Public Git repository"

Click **"Connect to GitHub"**

---

### **Step 3: Select Your Repository**

1. You'll see a list of your GitHub repositories
2. Find **`ai-counsellor-app`**
3. Click **"Connect"** next to it

---

### **Step 4: Configure the Service**

Now you'll see a form. Fill it like this:

```
Name:                ai-counsellor-api
Root Directory:      backend
Runtime:             Python 3.9
Build Command:       pip install -r requirements.txt
Start Command:       uvicorn main:app --host 0.0.0.0 --port 8000
Plan:                Free
```

**Visual Guide:**
```
┌─────────────────────────────────────────┐
│ Name *                                  │
│ ┌───────────────────────────────────┐   │
│ │ ai-counsellor-api                 │   │
│ └───────────────────────────────────┘   │
│                                         │
│ Root Directory                          │
│ ┌───────────────────────────────────┐   │
│ │ backend                           │   │
│ └───────────────────────────────────┘   │
│                                         │
│ Runtime: Python 3.9                     │
│ Build Command:                          │
│ ┌───────────────────────────────────┐   │
│ │ pip install -r requirements.txt   │   │
│ └───────────────────────────────────┘   │
│                                         │
│ Start Command:                          │
│ ┌───────────────────────────────────┐   │
│ │ uvicorn main:app --host 0.0.0.0   │   │
│ │ --port 8000                       │   │
│ └───────────────────────────────────┘   │
│                                         │
│ Plan: ● Free ○ Paid                     │
└─────────────────────────────────────────┘
```

---

### **Step 5: Add Environment Variables**

Scroll down and look for **"Environment"** section.

Click **"Add Environment Variable"** and add these variables:

**Variable 1:**
```
Key:   SECRET_KEY
Value: super-secret-key-change-this-12345!@#$%
```

**Variable 2:**
```
Key:   DATABASE_URL
Value: sqlite:///./counsellor.db
```

**Variable 3:**
```
Key:   ANTHROPIC_API_KEY
Value: YOUR_API_KEY_HERE
```

⚠️ **Get ANTHROPIC_API_KEY:**
1. Go to **https://console.anthropic.com**
2. Sign up (free)
3. Go to **API Keys**
4. Click **"Create Key"**
5. Copy the key and paste above

**Variable 4:**
```
Key:   ALLOWED_ORIGINS
Value: http://localhost:3001,https://ai-counsellor-app.vercel.app
```

---

### **Step 6: Deploy!**

1. Scroll to the bottom
2. Click **"Create Web Service"**
3. Wait 3-5 minutes...

**You'll see:**
- Building... (logs appear)
- Deploying...
- ✅ **Your API is live!**

---

### **Step 7: Get Your Backend URL**

When deployment is complete:
1. Look at the top of the page
2. You'll see a URL like: **`https://ai-counsellor-api.onrender.com`**
3. **COPY THIS URL** - you'll need it for Vercel!

✅ **Backend deployed!**

---

## **PART 2: Deploy Frontend to Vercel (3 minutes)**

### **Step 1: Create Vercel Account**

1. Go to **https://vercel.com**
2. Click **"Sign Up"** (top right)
3. Select **"Continue with GitHub"**
4. Click **"Authorize Vercel"**

✅ You now have a Vercel account!

---

### **Step 2: Import Your Project**

1. Go to Vercel Dashboard: **https://vercel.com/dashboard**
2. Click **"Add New +"** (top right)
3. Select **"Project"**
4. It will show your GitHub repositories
5. Find **`ai-counsellor-app`**
6. Click **"Import"**

---

### **Step 3: Configure Project Settings**

You'll see a configuration page. Fill it like this:

```
Project Name:              ai-counsellor-app
Framework Preset:          Next.js
Root Directory:            frontend
```

**Visual Guide:**
```
┌─────────────────────────────────────────┐
│ Project Name                            │
│ ┌───────────────────────────────────┐   │
│ │ ai-counsellor-app                 │   │
│ └───────────────────────────────────┘   │
│                                         │
│ Framework Preset: Next.js               │
│ Root Directory: frontend                │
│                                         │
│ Build and Output Settings               │
│ Build Command: npm run build            │
│ Output Directory: .next                 │
│                                         │
│        [Deploy]                         │
└─────────────────────────────────────────┘
```

---

### **Step 4: Add Environment Variables**

Before clicking Deploy, look for **"Environment Variables"** section.

Click **"Add"** and add:

```
Key:   VITE_API_URL
Value: https://ai-counsellor-api.onrender.com
```

⚠️ **Use the backend URL from Step 7 of Render deployment!**

---

### **Step 5: Deploy!**

1. Click **"Deploy"**
2. Wait 2-3 minutes...
3. You'll see: **"Deployment Complete"** ✅

---

### **Step 6: Get Your Frontend URL**

When deployment is complete:
1. Click **"Visit"** button
2. Or look for a URL like: **`https://ai-counsellor-app.vercel.app`**

✅ **Your public app is live!**

---

## **🎉 YOU'RE DONE!**

Your app is now publicly available at:

```
https://ai-counsellor-app.vercel.app
```

---

## **📊 Your Public Links**

| Component | URL |
|-----------|-----|
| **🌐 Frontend** | https://ai-counsellor-app.vercel.app |
| **🔌 Backend API** | https://ai-counsellor-api.onrender.com |
| **📚 API Docs** | https://ai-counsellor-api.onrender.com/docs |

---

## **⚡ After Deployment**

### **Test Your App**
1. Go to **https://ai-counsellor-app.vercel.app**
2. Sign up with any email/password
3. Complete onboarding
4. Explore features!

### **Auto-Updates**
- Change code on your computer
- Push to GitHub: `git push`
- Render & Vercel auto-deploy in 1-2 minutes!

### **If Something Goes Wrong**

**Vercel shows "API Error"?**
- Check if VITE_API_URL is correct
- Make sure backend URL is correct (with https://)

**Render backend not starting?**
- Click "Service" → "Logs"
- Check if ANTHROPIC_API_KEY is set
- Read error messages

---

## **Summary of Accounts Created**

✅ GitHub: vanshh08
✅ Render: (auto from GitHub)
✅ Vercel: (auto from GitHub)

---

## **Next Steps**

1. ✅ Repository created
2. ✅ Backend deployed to Render
3. ✅ Frontend deployed to Vercel
4. 🎉 **Share your public link!**

**Your app is ready for the hackathon!** 🚀

---

## **Share Your Link**

```
🌐 Check out my AI Counsellor app:
https://ai-counsellor-app.vercel.app

It's a study-abroad guidance platform with AI!
```

Copy and share this with anyone!
