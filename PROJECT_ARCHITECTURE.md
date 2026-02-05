# Task Planner - Project Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  (Postman, Thunder Client, Browser, Future React App)          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ HTTP Requests (REST API)
                           │ GET, POST, PUT, PATCH, DELETE
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXPRESS.JS SERVER                             │
│                   (server.js - Port 5000)                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Middleware:                                               │  │
│  │ • CORS (Cross-Origin Resource Sharing)                    │  │
│  │ • JSON Body Parser                                        │  │
│  │ • Request Logger                                          │  │
│  │ • Error Handler                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Routes:                                                   │  │
│  │ • /api/users      → routes/users.js                       │  │
│  │ • /api/tasks      → routes/tasks.js                       │  │
│  │ • /api/categories → routes/categories.js                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ SQL Queries (pg library)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                  POSTGRESQL DATABASE                             │
│                    (Render PostgreSQL)                           │
│  ┌────────────────┐  ┌────────────────┐  ┌─────────────────┐  │
│  │ USERS TABLE    │  │ TASKS TABLE    │  │ CATEGORIES TBL  │  │
│  │ • id           │  │ • id           │  │ • id            │  │
│  │ • username     │  │ • user_id  (FK)│  │ • name          │  │
│  │ • email        │  │ • category_id  │  │ • color         │  │
│  │ • password     │  │ • title        │  │ • created_at    │  │
│  │ • created_at   │  │ • description  │  └─────────────────┘  │
│  └────────────────┘  │ • due_date     │                        │
│                      │ • priority     │                        │
│                      │ • status       │                        │
│                      │ • completed    │                        │
│                      │ • created_at   │                        │
│                      │ • updated_at   │                        │
│                      └────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
Task_Planner/
│
├── backend/
│   ├── server.js                    # Main application entry point
│   ├── package.json                 # Dependencies & scripts
│   ├── .env                         # Environment variables (DATABASE_URL)
│   ├── .gitignore                   # Files to ignore in git
│   │
│   ├── config/
│   │   ├── database.js              # PostgreSQL connection pool
│   │   └── setupDatabase.js         # Create tables on startup
│   │
│   └── routes/
│       ├── users.js                 # User authentication routes
│       ├── tasks.js                 # Task CRUD routes
│       └── categories.js            # Category management routes
│
├── README.md                        # Project documentation
├── API_TESTING.md                   # API endpoint examples
├── DEPLOYMENT_GUIDE.md              # Render deployment steps
├── QUICK_START.md                   # Getting started guide
├── SPRINT_1_CHECKLIST.md            # Pre-demo checklist
├── SUBMISSION.txt                   # Submission information
└── PROJECT_ARCHITECTURE.md          # This file
```

---

## API Flow Diagram

### Example: Creating a Task

```
1. CLIENT
   │
   │ POST /api/tasks
   │ Body: {
   │   "user_id": 1,
   │   "title": "Complete Assignment",
   │   "category_id": 1,
   │   "due_date": "2026-02-15"
   │ }
   ▼
2. EXPRESS SERVER (routes/tasks.js)
   │
   │ • Validate request body
   │ • Check required fields
   ▼
3. DATABASE QUERY
   │
   │ INSERT INTO tasks (user_id, category_id, title, due_date)
   │ VALUES ($1, $2, $3, $4)
   │ RETURNING *
   ▼
4. DATABASE (PostgreSQL)
   │
   │ • Create new task record
   │ • Generate auto-increment ID
   │ • Set timestamps
   │ • Return created task
   ▼
5. EXPRESS SERVER
   │
   │ • Receive database response
   │ • Format JSON response
   ▼
6. CLIENT
   │
   Response: {
     "message": "Task created successfully",
     "task": { 
       "id": 1,
       "user_id": 1,
       "title": "Complete Assignment",
       ...
     }
   }
```

---

## Database Relationships

```
┌─────────────┐
│   USERS     │
│             │
│ id  ◄───────┼───────────────┐
│ username    │               │
│ email       │               │ ONE User
│ password    │               │ has MANY Tasks
└─────────────┘               │
                              │
                              │
                    ┌─────────┴─────────┐
                    │      TASKS        │
                    │                   │
                    │ id                │
                    │ user_id    (FK)   │ ────┐
                    │ category_id (FK)  │     │
                    │ title             │     │ MANY Tasks
                    │ description       │     │ belong to ONE Category
                    │ due_date          │     │
                    │ priority          │     │
                    │ status            │     │
                    │ completed         │     │
                    └───────────────────┘     │
                                              │
                                              │
                              ┌───────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   CATEGORIES    │
                    │                 │
                    │ id              │
                    │ name            │
                    │ color           │
                    └─────────────────┘
```

**Relationship Types:**
- Users → Tasks: One-to-Many (1:N)
- Categories → Tasks: One-to-Many (1:N)
- Tasks → Users: Many-to-One (N:1)
- Tasks → Categories: Many-to-One (N:1)

---

## Technology Stack Details

### Backend Framework
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
  - Fast, minimalist framework
  - Middleware support
  - RESTful API routing

### Database
- **PostgreSQL**: Relational database
  - ACID compliance
  - Foreign key constraints
  - Auto-incrementing IDs (SERIAL)
  - Timestamp support

### Database Driver
- **node-postgres (pg)**: PostgreSQL client
  - Connection pooling
  - Parameterized queries (SQL injection prevention)
  - Promise-based API

### Security & Authentication
- **bcryptjs**: Password hashing
  - Salt generation
  - One-way encryption
- **jsonwebtoken**: JWT tokens
  - Stateless authentication
  - 7-day expiration

### Environment Management
- **dotenv**: Environment variables
  - Secure configuration
  - Separate dev/prod settings

### CORS
- **cors**: Cross-Origin Resource Sharing
  - Frontend/backend separation
  - API accessibility

---

## Deployment Architecture (Render)

```
┌────────────────────────────────────────────────────────────┐
│                         RENDER CLOUD                        │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Web Service: task-planner-api                       │ │
│  │                                                       │ │
│  │  • Auto-deploy from GitHub                           │ │
│  │  • Build: npm install                                │ │
│  │  • Start: npm start                                  │ │
│  │  • Port: Auto-assigned                               │ │
│  │  • URL: https://task-planner-api.onrender.com        │ │
│  │                                                       │ │
│  │  Environment Variables:                              │ │
│  │  • DATABASE_URL → Internal PostgreSQL URL            │ │
│  │  • JWT_SECRET                                        │ │
│  │  • NODE_ENV=production                               │ │
│  └──────────────────┬───────────────────────────────────┘ │
│                     │                                      │
│                     │ Internal Connection                  │
│                     │ (Fast & Secure)                      │
│                     ▼                                      │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  PostgreSQL Database: task-planner-db                │ │
│  │                                                       │ │
│  │  • PostgreSQL 16                                     │ │
│  │  • 256MB RAM (Free Tier)                             │ │
│  │  • Auto-backup                                       │ │
│  │  • Encryption at rest                                │ │
│  │  • Internal URL for web service                      │ │
│  │  • External URL for admin access                     │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
└────────────────────────────────────────────────────────────┘
                              ▲
                              │
                              │ HTTPS
                              │
                     ┌────────┴─────────┐
                     │   Internet       │
                     │   Users          │
                     └──────────────────┘
```

---

## Security Features

1. **Password Security**
   - bcrypt hashing with salt
   - Passwords never stored in plain text
   - 10 salt rounds

2. **SQL Injection Prevention**
   - Parameterized queries ($1, $2, etc.)
   - No string concatenation in SQL

3. **Environment Variables**
   - Sensitive data in .env file
   - .env in .gitignore
   - Different configs for dev/prod

4. **CORS Configuration**
   - Controlled access to API
   - Can restrict origins in production

5. **Error Handling**
   - Generic error messages to clients
   - Detailed logs for debugging
   - No sensitive data in error responses

---

## API Response Format

### Success Response
```json
{
  "message": "Task created successfully",
  "task": {
    "id": 1,
    "user_id": 1,
    "title": "Complete Assignment",
    "status": "pending",
    "created_at": "2026-02-05T12:00:00.000Z"
  }
}
```

### Error Response
```json
{
  "error": "Task not found"
}
```

---

## Performance Considerations

### Connection Pooling
- PostgreSQL connection pool
- Reuses database connections
- Better performance under load

### Async/Await
- Non-blocking database queries
- Better concurrency handling

### Environment-Based SSL
- SSL in production (Render)
- No SSL in development (localhost)

---

## Future Enhancements (Sprint 2 & 3)

1. **Frontend (Sprint 2)**
   - React SPA
   - Task dashboard
   - Forms for CRUD operations

2. **Integration (Sprint 3)**
   - Connect React to API
   - JWT authentication in frontend
   - Deployment of full stack

3. **Additional Features**
   - Task notifications
   - Task sharing between users
   - File attachments
   - Task comments
   - Statistics dashboard

---

## Course Learning Outcomes Mapping

**CLO1**: RESTful API with Node.js & Express ✅
- routes/users.js
- routes/tasks.js
- routes/categories.js

**CLO2**: PostgreSQL database ✅
- config/database.js
- config/setupDatabase.js
- 3 tables with relationships

**CLO5**: Authentication & Security ✅
- bcrypt password hashing
- JWT tokens
- Parameterized queries

**CLO6**: Cloud Deployment ✅
- Render Web Service
- Render PostgreSQL
- Environment variables

---

## Conclusion

This architecture provides:
- ✅ Scalable RESTful API
- ✅ Secure authentication
- ✅ Relational data modeling
- ✅ Cloud deployment
- ✅ Production-ready structure
- ✅ Ready for frontend integration

**Total Lines of Code**: ~850 lines
**Total Files**: 12 files
**Database Tables**: 3 tables
**API Endpoints**: 16 endpoints
**Deployment**: Render (PostgreSQL + Web Service)
