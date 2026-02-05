# Sprint 1 Completion Checklist ✅

## Before Sprint Review Demo

### 1. Code Completion ✓
- [ ] All files created and saved
- [ ] No syntax errors in any file
- [ ] .env file configured with DATABASE_URL
- [ ] package.json has all dependencies
- [ ] .gitignore properly configured

### 2. Local Testing ✓
- [ ] Run `npm install` successfully
- [ ] Run `npm start` - server starts without errors
- [ ] Test GET /health endpoint - returns OK
- [ ] Test GET /api/categories - returns 6 categories
- [ ] Test POST /api/users/register - creates user
- [ ] Test POST /api/tasks - creates task
- [ ] Test GET /api/tasks/user/:userId - returns tasks

### 3. GitHub Setup ✓
- [ ] GitHub repository created
- [ ] All code committed with meaningful message
- [ ] Code pushed to GitHub
- [ ] Repository is public (or instructor has access)
- [ ] Commit history shows regular commits (not just 1 big commit)
- [ ] README.md is visible in repository

### 4. Render Deployment - PostgreSQL Database ✓
- [ ] PostgreSQL database created on Render
- [ ] Database name: task_planner or similar
- [ ] Database is in "Available" status
- [ ] INTERNAL Database URL copied and saved
- [ ] Can see database in Render dashboard

### 5. Render Deployment - Web Service ✓
- [ ] Web Service created on Render
- [ ] Connected to GitHub repository
- [ ] Build Command set to: `npm install`
- [ ] Start Command set to: `npm start`
- [ ] Environment variables added:
  - [ ] DATABASE_URL (Internal URL from database)
  - [ ] JWT_SECRET (any secure string)
  - [ ] NODE_ENV=production
- [ ] First deployment completed successfully
- [ ] Service shows "Live" status

### 6. Deployed API Testing ✓
- [ ] Visit your-app.onrender.com - shows API info
- [ ] GET /health returns {"status": "OK"}
- [ ] GET /api/categories returns array of categories
- [ ] POST /api/users/register creates user successfully
- [ ] POST /api/tasks creates task successfully
- [ ] All CRUD operations work on deployed version

### 7. Documentation ✓
- [ ] README.md explains the project
- [ ] API_TESTING.md has all endpoint examples
- [ ] DEPLOYMENT_GUIDE.md has Render instructions
- [ ] SUBMISSION.txt filled with your info
- [ ] GitHub URL in SUBMISSION.txt
- [ ] Render URL in SUBMISSION.txt

### 8. Sprint Review Preparation ✓
- [ ] Know your deployed URL by heart
- [ ] GitHub repository URL ready to share
- [ ] Can navigate to routes/tasks.js quickly
- [ ] Can explain database schema (3 tables)
- [ ] Can demonstrate POST /api/tasks endpoint
- [ ] Can show commit history in GitHub
- [ ] Laptop charged and ready

---

## Demo Day Checklist

### Bring to Class:
- [ ] Laptop with charger
- [ ] SUBMISSION.txt file ready
- [ ] Postman/Thunder Client installed
- [ ] Your Render URLs ready (bookmarked)
- [ ] VS Code with project open

### Be Ready to Show:
1. **Deployed Application**
   - Your Render URL is live and accessible
   - Health endpoint works

2. **GitHub Repository**
   - Show the repository
   - Show commit history (multiple commits!)
   - Show code structure

3. **Technical Questions**
   - "Where did you define your routes?"
     → Show routes/tasks.js, routes/users.js
   
   - "How did you connect to the database?"
     → Show config/database.js
   
   - "Show me where you create a task"
     → Show POST route in routes/tasks.js
   
   - "What tables do you have?"
     → Users, Tasks, Categories
   
   - "How did you deploy this?"
     → Render with PostgreSQL

4. **Live API Demo**
   - Test GET /api/categories
   - Test POST /api/users/register
   - Test POST /api/tasks
   - Show the created task

---

## Common Issues & Solutions

### Issue: "Server won't start locally"
✅ Solution: Check DATABASE_URL in .env file

### Issue: "Cannot connect to database"
✅ Solution: Make sure you're using INTERNAL URL from Render

### Issue: "Deployment failed on Render"
✅ Solution: Check Build Logs, verify npm install works

### Issue: "API returns 404"
✅ Solution: Check your route paths start with /api/

### Issue: "First request takes 30 seconds"
✅ Solution: Normal for Render free tier - app sleeps when idle

---

## Grading Rubric Alignment

### Deployment & Integrity Checks (10 points)
✅ Project deployed to Render (public URL)
✅ GitHub repository with healthy commit history
✅ Regular commits throughout development

### Sprint Completion (40 points)
✅ All workshop milestones complete
✅ RESTful API with Express
✅ PostgreSQL database integration
✅ User registration and login
✅ Task CRUD operations
✅ Category management
✅ Code runs without errors

### Technical Understanding (30 points)
✅ Can navigate own code confidently
✅ Can explain how routes work
✅ Can answer questions about database schema
✅ Can explain PostgreSQL connection

### Lab Participation (20 points)
✅ Attended workshop sessions
✅ Present for Sprint Review demo

---

## Final Verification (5 minutes before demo)

```bash
# Test your deployed API one more time:

# Test 1: Health check
curl https://your-app.onrender.com/health

# Test 2: Categories
curl https://your-app.onrender.com/api/categories

# Test 3: Register (using Postman/Thunder Client)
POST https://your-app.onrender.com/api/users/register
Body: {"username":"demo","email":"demo@test.com","password":"test123"}
```

If all 3 tests work → You're ready! ✅

---

## What to Submit to Assignment Folder

Upload `SUBMISSION.txt` file containing:
- Your name
- GitHub repository URL
- Deployed API URL
- Brief description

---

## After Sprint Review

### Keep Working For Sprint 2:
- [ ] Build React frontend
- [ ] Connect frontend to this backend API
- [ ] Create dashboard UI
- [ ] Add task forms
- [ ] Deploy frontend

### Maintain Your GitHub:
- [ ] Continue making regular commits
- [ ] Add features incrementally
- [ ] Keep README updated

---

## Confidence Checklist

Answer YES to all:
- [ ] My API is deployed and accessible
- [ ] My GitHub has multiple commits
- [ ] I can explain my database schema
- [ ] I can show where routes are defined
- [ ] I tested my API and it works
- [ ] I'm ready to demo in class

**If you answered YES to all → You're 100% ready! 🎉**

---

## Emergency Contacts

If something breaks before demo:
1. Check Render logs
2. Check GitHub - last working commit
3. Re-deploy from Render dashboard
4. Ask instructor before class starts

**Good luck! You've got this! 💪**
