# 🚀 Quick Start Guide - 5 Minutes

## Project Structure ✅

```
Task_Planner/  ← Git repo (already initialized!)
├── backend/   ← Your application code
└── docs/      ← Documentation files
```

---

## Step 1: Install (2 minutes)

```bash
# Navigate to backend folder
cd backend

# Install all dependencies
npm install
```

This installs: express, pg, bcryptjs, jsonwebtoken, dotenv, cors

---

## Step 2: Configure Database (2 minutes)

### Get PostgreSQL URL from Render:
1. Go to https://dashboard.render.com
2. Create PostgreSQL database
3. Copy **INTERNAL** Database URL

### Update .env file:
Edit `backend/.env`:
```env
DATABASE_URL=your_postgresql_internal_url_here
JWT_SECRET=gursewak_secret_2026
```

---

## Step 3: Run Locally (1 minute)

```bash
# Still in backend folder
npm start
```

You should see:
```
╔════════════════════════════════════════════╗
║   Student Task Planner API Server         ║
║   Server running on port 5000              ║
╚════════════════════════════════════════════╝
✅ Connected to PostgreSQL database
✅ Database tables created successfully
```

Test in browser: **http://localhost:5000**

---

## Step 4: Test API (2 minutes)

### Using Thunder Client or Postman:

**Test 1: Health Check**
```http
GET http://localhost:5000/health
```
✅ Returns: `{"status": "OK"}`

**Test 2: Get Categories**
```http
GET http://localhost:5000/api/categories
```
✅ Returns: Array of 6 categories

**Test 3: Register User**
```http
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "test123"
}
```
✅ Returns: User object with token

**Test 4: Create Task**
```http
POST http://localhost:5000/api/tasks
Content-Type: application/json

{
  "user_id": 1,
  "category_id": 1,
  "title": "Complete Sprint 1",
  "due_date": "2026-02-05",
  "priority": "high"
}
```
✅ Returns: Created task

---

## Step 5: Push to GitHub (3 minutes)

```bash
# Go back to root folder (Task_Planner)
cd ..

# Add all files
git add .

# Commit
git commit -m "Sprint 1 - Task Planner Backend Complete"

# Add remote (replace with YOUR URL)
git remote add origin https://github.com/YOUR_USERNAME/task-planner.git

# Push
git push -u origin main
```

---

## Step 6: Deploy to Render (10 minutes)

### Part A: Database (already done if you did Step 2)
✅ PostgreSQL database created
✅ INTERNAL URL copied

### Part B: Web Service
1. Render Dashboard → **New + → Web Service**
2. Connect your GitHub repo
3. Configure:
   - Name: `task-planner-api`
   - **Root Directory**: `backend` ⚠️ Important!
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Environment Variables:
   - `DATABASE_URL` = your internal PostgreSQL URL
   - `JWT_SECRET` = gursewak_secret_2026
   - `NODE_ENV` = production
5. **Create Web Service**

---

## Step 7: Test Deployment (2 minutes)

```bash
# Visit your deployed API
https://your-app-name.onrender.com/health
```

Should return:
```json
{
  "status": "OK",
  "timestamp": "2026-02-05T..."
}
```

Test categories:
```bash
https://your-app-name.onrender.com/api/categories
```

---

## ✅ Success Checklist

- [x] Dependencies installed
- [x] Server runs locally
- [x] Database connected
- [x] API tested locally
- [x] Code pushed to GitHub
- [x] Deployed to Render
- [x] Deployment tested

---

## 🎯 You're Done!

**What you have:**
- ✅ Complete REST API
- ✅ PostgreSQL database
- ✅ Deployed and live
- ✅ GitHub repository
- ✅ Ready for Sprint Review

**Next Steps:**
1. Fill in `SUBMISSION.txt` with your URLs
2. Read `SPRINT_1_CHECKLIST.md` for demo prep
3. Practice explaining your code

---

## ⚠️ Common Issues

**"Cannot find module"**
→ Run `npm install` in backend folder

**"Connection refused"**
→ Check DATABASE_URL is the INTERNAL URL

**"Build failed on Render"**
→ Make sure Root Directory is set to `backend`

**"Port already in use"**
→ Change PORT in .env or kill the process

---

## 📚 More Help

- Full deployment guide: `DEPLOYMENT_GUIDE.md`
- API testing: `backend/API_TESTING.md`
- Demo prep: `SPRINT_1_CHECKLIST.md`
- Architecture: `PROJECT_ARCHITECTURE.md`

---

**Total Time: ~25 minutes** ⏱️

**You've got this! 💪**
