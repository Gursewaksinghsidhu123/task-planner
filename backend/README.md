# Student Task Planner API

A RESTful API for managing student tasks and assignments built with Node.js, Express, and PostgreSQL.

## 🚀 Features

- User registration and authentication
- Task management (Create, Read, Update, Delete)
- Category organization
- Task completion tracking
- Due date management
- Priority levels
- PostgreSQL database

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Task_Planner/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key_here
```

4. Start the server:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## 🌐 API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile/:id` - Get user profile

### Tasks
- `GET /api/tasks/user/:userId` - Get all tasks for a user
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/complete` - Mark task as completed
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/user/:userId/status/:status` - Get tasks by status
- `GET /api/tasks/user/:userId/category/:categoryId` - Get tasks by category

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## 📦 Database Schema

### Users Table
```sql
- id (SERIAL PRIMARY KEY)
- username (VARCHAR)
- email (VARCHAR UNIQUE)
- password (VARCHAR - hashed)
- created_at (TIMESTAMP)
```

### Tasks Table
```sql
- id (SERIAL PRIMARY KEY)
- user_id (INTEGER FK)
- category_id (INTEGER FK)
- title (VARCHAR)
- description (TEXT)
- due_date (DATE)
- priority (VARCHAR)
- status (VARCHAR)
- completed (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Categories Table
```sql
- id (SERIAL PRIMARY KEY)
- name (VARCHAR UNIQUE)
- color (VARCHAR)
- created_at (TIMESTAMP)
```

## 🚢 Deployment to Render

### Step 1: Create PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "PostgreSQL"
3. Configure:
   - Name: `task-planner-db`
   - Database: `task_planner`
   - User: (auto-generated)
   - Region: Choose closest to you
   - Plan: Free
4. Click "Create Database"
5. Copy the **Internal Database URL** (starts with `postgresql://`)

### Step 2: Create Web Service on Render

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - Name: `task-planner-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free
4. Add Environment Variables:
   - `DATABASE_URL`: Paste your PostgreSQL Internal URL
   - `JWT_SECRET`: Create a random secret (e.g., `mysecretkey123`)
   - `NODE_ENV`: `production`
5. Click "Create Web Service"

### Step 3: Test Your Deployment

Once deployed, your API will be available at:
```
https://task-planner-api.onrender.com
```

Test it:
```bash
curl https://task-planner-api.onrender.com/health
```

## 🧪 Testing with Postman/Thunder Client

### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

### Login
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### Create Task
```http
POST /api/tasks
Content-Type: application/json

{
  "user_id": 1,
  "category_id": 1,
  "title": "Complete Math Assignment",
  "description": "Chapter 5 problems",
  "due_date": "2026-02-10",
  "priority": "high"
}
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key` |
| `NODE_ENV` | Environment mode | `production` or `development` |

## 🔒 Security Features

- Password hashing with bcrypt
- JWT authentication
- SQL injection prevention with parameterized queries
- CORS enabled
- Environment variable protection

## 👨‍💻 Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## 📄 License

ISC

## 👤 Author

Gursewak

---

Built for PROG2500 Full Stack Development Course
