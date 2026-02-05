# Task Planner - Project Summary

## 🔗 Important Links

- **GitHub Repository**: https://github.com/Gursewaksinghsidhu123/task-planner
- **Live API**: https://task-planner-api-hu8d.onrender.com
- **GitHub Username**: Gursewaksinghsidhu123

## 🗄️ Database Configuration

### PostgreSQL (Render)
- **Connection String**: 
  ```
  postgresql://task_planner_db_h7ea_user:XwoSDzj6UureN9EhElDmxytaNWXh9m6n@dpg-d62hrg0nputs73b40ul0-a.oregon-postgres.render.com/task_planner_db_h7ea
  ```
- **Host**: dpg-d62hrg0nputs73b40ul0-a.oregon-postgres.render.com
- **Database**: task_planner_db_h7ea
- **User**: task_planner_db_h7ea_user
- **SSL**: Required (rejectUnauthorized: false)

## 📦 Project Structure

```
Task_Planner/
├── backend/
│   ├── config/
│   │   ├── database.js          # Database connection with SSL
│   │   └── setupDatabase.js     # Auto-creates tables on startup
│   ├── routes/
│   │   ├── users.js            # /api/users/* endpoints
│   │   ├── tasks.js            # /api/tasks/* endpoints
│   │   └── categories.js       # /api/categories/* endpoints
│   ├── .env                    # Environment variables
│   ├── server.js               # Express server
│   └── package.json            # Dependencies
├── .gitignore                  # Git ignore rules
├── README.md                   # Main documentation
├── API.md                      # Complete API reference
└── SETUP.md                    # Setup instructions
```

## 🚀 Deployment Status

### Render Web Service
- **Name**: task-planner-api
- **URL**: https://task-planner-api-hu8d.onrender.com
- **Auto-deploy**: Enabled (from main branch)
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`

### Render PostgreSQL
- **Database**: task_planner_db_h7ea
- **Tables**: users, tasks, categories (auto-created)
- **Default Categories**: 6 (Homework, Exam, Project, Assignment, Reading, Other)

## 🔑 Environment Variables

Located in `backend/.env`:
```env
PORT=5000
DATABASE_URL=postgresql://[connection-string]
JWT_SECRET=gursewak_secret_2026_project_backend
```

⚠️ **Note**: The `.env` file is git-ignored for security

## ✅ Features Implemented

- ✅ User registration with password hashing (bcryptjs)
- ✅ User login with JWT authentication
- ✅ CRUD operations for tasks
- ✅ Task categorization
- ✅ Priority levels (low, medium, high)
- ✅ Status tracking (pending, in-progress, completed)
- ✅ Due date management
- ✅ CORS enabled
- ✅ Auto database table creation
- ✅ Default categories insertion

## 📊 Database Tables

### users
| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| username | VARCHAR(100) | UNIQUE, NOT NULL |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL (hashed) |
| created_at | TIMESTAMP | DEFAULT NOW() |

### tasks
| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| user_id | INTEGER | FOREIGN KEY → users(id) |
| category_id | INTEGER | FOREIGN KEY → categories(id) |
| title | VARCHAR(255) | NOT NULL |
| description | TEXT | |
| due_date | DATE | |
| priority | VARCHAR(20) | DEFAULT 'medium' |
| status | VARCHAR(20) | DEFAULT 'pending' |
| completed | BOOLEAN | DEFAULT false |
| created_at | TIMESTAMP | DEFAULT NOW() |
| updated_at | TIMESTAMP | DEFAULT NOW() |

### categories
| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(100) | UNIQUE, NOT NULL |
| color | VARCHAR(7) | DEFAULT '#3B82F6' |
| created_at | TIMESTAMP | DEFAULT NOW() |

## 🧪 Testing

### Test Database Connection
```bash
cd backend
npm run test:db
```

### Test API Endpoints
Use Postman or any API client:
- Base URL: http://localhost:5000 (local)
- Base URL: https://task-planner-api-hu8d.onrender.com (production)

### Sample Request (Register User)
```bash
curl -X POST https://task-planner-api-hu8d.onrender.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

## 📝 Important Notes

1. **Database Connection**: Currently hardcoded in `database.js` for ease of deployment. For production, use environment variables.

2. **JWT Secret**: Change `JWT_SECRET` in production to a strong random string.

3. **CORS**: Currently allows all origins. Restrict in production.

4. **Node Version**: Requires Node.js v18 or higher (specified in package.json).

5. **Port**: Default is 5000, configurable via PORT environment variable.

## 🔒 Security Checklist

- ✅ Passwords hashed with bcryptjs
- ✅ JWT for authentication
- ✅ SSL/TLS for database connection
- ✅ Environment variables for sensitive data
- ✅ .env file git-ignored
- ⚠️ CORS needs restriction in production
- ⚠️ Rate limiting not implemented
- ⚠️ Input validation minimal

## 📚 Documentation Files

- **README.md**: Overview, quick start, deployment info
- **API.md**: Complete API documentation with examples
- **SETUP.md**: Detailed setup and troubleshooting guide

## 🎯 Next Steps (Future Enhancements)

- [ ] Add frontend (React/Vue)
- [ ] Implement refresh tokens
- [ ] Add rate limiting
- [ ] Enhance input validation
- [ ] Add task filtering & search
- [ ] Implement user profiles
- [ ] Add email notifications
- [ ] Deploy frontend separately
