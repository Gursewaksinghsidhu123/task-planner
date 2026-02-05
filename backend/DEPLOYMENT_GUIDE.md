# Render Deployment Guide - Step by Step

## Prerequisites
- GitHub account
- Render account (free at render.com)
- Your Task Planner code pushed to GitHub

---

## Part 1: Push Code to GitHub

### Step 1: Initialize Git Repository
```bash
cd "C:\Users\jeelp\Documents\Sem_4\Prog2500 Full Stack\Friends\Gursewak\Task_Planner\backend"
git init
git add .
git commit -m "Initial commit - Task Planner Backend"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com
2. Click the "+" icon → "New repository"
3. Name: `task-planner-backend`
4. Description: "Student Task Planner API for PROG2500"
5. Keep it Public
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/task-planner-backend.git
git branch -M main
git push -u origin main
```

---

## Part 2: Create PostgreSQL Database on Render

### Step 1: Go to Render Dashboard
1. Visit https://dashboard.render.com
2. Sign in with GitHub

### Step 2: Create New PostgreSQL Database
1. Click **"New +"** button (top right)
2. Select **"PostgreSQL"**

### Step 3: Configure Database
Fill in these details:
- **Name:** `task-planner-db`
- **Database:** `task_planner`
- **User:** (leave auto-generated)
- **Region:** Choose closest to your location (e.g., Oregon USA)
- **PostgreSQL Version:** 16 (latest)
- **Instance Type:** Free

### Step 4: Create Database
1. Click **"Create Database"**
2. Wait for database to be created (1-2 minutes)
3. Once ready, find the **"Connections"** section
4. Copy the **"Internal Database URL"** - it looks like:
   ```
   postgresql://task_planner_db_user:xxxxx@dpg-xxxxx-a/task_planner_db
   ```
5. **SAVE THIS URL** - you'll need it for the web service!

---

## Part 3: Create Web Service on Render

### Step 1: Create New Web Service
1. In Render Dashboard, click **"New +"**
2. Select **"Web Service"**

### Step 2: Connect GitHub Repository
1. Click **"Connect account"** if not already connected
2. Find and select your `task-planner-backend` repository
3. Click **"Connect"**

### Step 3: Configure Web Service
Fill in these settings:

**Basic Settings:**
- **Name:** `task-planner-api` (this will be your URL)
- **Region:** Same as your database (e.g., Oregon USA)
- **Branch:** `main`
- **Root Directory:** (leave blank or type `backend` if you have multiple folders)
- **Runtime:** `Node`

**Build & Deploy:**
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **"Free"**

### Step 4: Add Environment Variables
Scroll down to **"Environment Variables"** section and add these:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Paste your PostgreSQL Internal URL from Part 2 |
| `JWT_SECRET` | `gursewak_secret_key_2026` (or any random string) |
| `NODE_ENV` | `production` |

**Important:** Make sure you paste the INTERNAL Database URL, not the External URL!

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Render will start building and deploying your app
3. Wait 3-5 minutes for the first deploy

### Step 6: Verify Deployment
Once deployed, your API will be at:
```
https://task-planner-api.onrender.com
```

Test it by visiting:
```
https://task-planner-api.onrender.com/health
```

You should see:
```json
{
  "status": "OK",
  "timestamp": "2026-02-05T..."
}
```

---

## Part 4: Test Your Deployed API

### Using Browser
Visit:
```
https://task-planner-api.onrender.com
```

You should see:
```json
{
  "message": "Student Task Planner API",
  "version": "1.0.0",
  "endpoints": {
    "users": "/api/users",
    "tasks": "/api/tasks",
    "categories": "/api/categories"
  }
}
```

### Using Postman/Thunder Client

**Test 1: Get Categories**
```http
GET https://task-planner-api.onrender.com/api/categories
```

**Test 2: Register User**
```http
POST https://task-planner-api.onrender.com/api/users/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**Test 3: Create Task**
```http
POST https://task-planner-api.onrender.com/api/tasks
Content-Type: application/json

{
  "user_id": 1,
  "category_id": 1,
  "title": "Test Assignment",
  "due_date": "2026-02-15",
  "priority": "high"
}
```

---

## Part 5: Update Your Local .env File

Now that you have the database URL from Render, update your local `.env` file:

```env
PORT=5000
DATABASE_URL=postgresql://task_planner_db_user:xxxxx@dpg-xxxxx-a/task_planner_db
JWT_SECRET=gursewak_secret_key_2026
```

This lets you test locally with the same database!

---

## Part 6: Make Regular Commits

From now on, whenever you make changes:

```bash
git add .
git commit -m "Add feature: task filtering"
git push
```

Render will **automatically redeploy** your app when you push to GitHub!

---

## Troubleshooting

### ❌ Database Connection Failed
- Check that DATABASE_URL is correct
- Make sure you used the INTERNAL URL, not External
- Verify database is in the same region as web service

### ❌ Build Failed
- Check that package.json is correct
- Verify Build Command is `npm install`
- Make sure Start Command is `npm start`

### ❌ Application Error
- Check Render logs: Click your service → "Logs" tab
- Look for error messages
- Verify all environment variables are set

### 💡 Free Tier Limitations
- App sleeps after 15 minutes of inactivity
- First request after sleep takes 30-50 seconds
- This is normal for free tier!

---

## What to Submit

Create a text file (`SUBMISSION.txt`) with:

```
Student Name: Gursewak
GitHub Repository: https://github.com/YOUR_USERNAME/task-planner-backend
Deployed API URL: https://task-planner-api.onrender.com
Database: PostgreSQL on Render

Test Endpoint: https://task-planner-api.onrender.com/health
```

---

## Sprint Review Preparation

Be ready to demonstrate:
1. Your deployed API is accessible
2. Show your GitHub repository with commit history
3. Test an API endpoint (POST create task)
4. Explain your database schema
5. Show where you defined your routes in code

**Good luck! 🚀**
