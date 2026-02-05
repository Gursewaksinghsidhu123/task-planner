# 🚀 Quick Deployment Guide

## Current Project Structure ✅

```
Task_Planner/  ← You are here (Git repository root)
├── .git/                  (Git already initialized ✅)
├── .gitignore             (Configured for node_modules, .env)
├── README.md              (Main documentation)
├── START_HERE.txt         (Quick start guide)
├── QUICK_START.md         (5-minute setup)
├── DEPLOYMENT_GUIDE.md    (This file)
├── SUBMISSION.txt         (Submission info)
└── backend/               (Application code)
    ├── server.js          (Main app)
    ├── package.json       (Dependencies)
    ├── .env               (Environment variables)
    ├── config/            (Database config)
    └── routes/            (API routes)
```

---

## ⚡ Super Quick Start

### 1️⃣ Install Dependencies (2 min)
```bash
cd backend
npm install
```

### 2️⃣ Get PostgreSQL URL from Render (5 min)
1. Go to https://dashboard.render.com
2. New + → PostgreSQL
3. Name: `task-planner-db`
4. Create Database
5. **Copy INTERNAL Database URL**

### 3️⃣ Configure Environment (1 min)
Edit `backend/.env`:
```env
DATABASE_URL=paste_your_internal_postgresql_url_here
JWT_SECRET=gursewak_secret_2026
```

### 4️⃣ Test Locally (2 min)
```bash
# Still in backend folder
npm start
```
Visit: http://localhost:5000

### 5️⃣ Push to GitHub (3 min)
```bash
# Go back to root folder
cd ..

# Add all files
git add .

# Commit
git commit -m "Sprint 1 - Task Planner Backend Complete"

# Add remote (replace with YOUR GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/task-planner.git

# Push
git push -u origin main
```

### 6️⃣ Deploy to Render (10 min)

**Create Web Service:**
1. Render Dashboard → New + → Web Service
2. Connect your GitHub repository
3. Configure:
   - **Name**: `task-planner-api`
   - **Root Directory**: `backend`  ⚠️ IMPORTANT!
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables**:
   ```
   DATABASE_URL = your_internal_postgresql_url
   JWT_SECRET = gursewak_secret_2026
   NODE_ENV = production
   ```

5. Create Web Service

### 7️⃣ Test Deployment (2 min)
```bash
# Visit your Render URL
https://task-planner-api.onrender.com/health
```

Should return:
```json
{"status": "OK", "timestamp": "..."}
```

---

## ⚠️ IMPORTANT: Root Directory Setting

When deploying to Render, you **MUST** set:
- **Root Directory**: `backend`

This tells Render where to find your package.json and server.js files.

---

## 📋 What to Submit

1. Fill in `SUBMISSION.txt` with:
   - Your GitHub URL
   - Your Render URL

2. Upload `SUBMISSION.txt` to D2L

---

## 🎯 Pre-Demo Checklist

- [ ] `npm install` works
- [ ] Server starts locally
- [ ] Database connected
- [ ] Pushed to GitHub
- [ ] Deployed to Render
- [ ] Can access Render URL
- [ ] API endpoints tested
- [ ] Ready to demo

---

## 🆘 Troubleshooting

**Error: Cannot find module**
```bash
cd backend
npm install
```

**Error: Connection refused**
- Check DATABASE_URL in .env
- Make sure you used INTERNAL URL from Render

**Error: Build failed on Render**
- Make sure Root Directory is set to `backend`
- Check Build Command is `npm install`
- Check Start Command is `npm start`

**Error: Application error on Render**
- Check Environment Variables are set
- Check Render logs for details

---

## 📞 Need More Help?

- **Setup**: Read `QUICK_START.md`
- **Testing**: Read `backend/API_TESTING.md`
- **Full Guide**: Read `backend/DEPLOYMENT_GUIDE.md`
- **Demo Prep**: Read `SPRINT_1_CHECKLIST.md`

---

**You've got this! 🚀**
