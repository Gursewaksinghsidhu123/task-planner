# Task Planner API

A RESTful API for managing student tasks built with Node.js, Express, and PostgreSQL.

## 🚀 Live Deployment

- **API Base URL**: https://task-planner-api-hu8d.onrender.com
- **GitHub Repository**: https://github.com/Gursewaksinghsidhu123/task-planner

## 📋 Features

- User authentication with JWT
- CRUD operations for tasks
- Task categorization with default categories
- Priority levels and status tracking
- Due date management
- Secure password hashing with bcrypt

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Render)
- **Authentication**: JWT
- **Password Hashing**: bcryptjs
- **CORS**: Enabled for cross-origin requests

## 📁 Project Structure

```
Task_Planner/
├── backend/
│   ├── config/
│   │   ├── database.js          # PostgreSQL connection pool
│   │   └── setupDatabase.js     # Database schema & auto-setup
│   ├── controllers/
│   │   ├── usersController.js   # User business logic
│   │   ├── tasksController.js   # Task business logic
│   │   └── categoriesController.js # Category business logic
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── routes/
│   │   ├── users.js            # User route definitions
│   │   ├── tasks.js            # Task route definitions
│   │   └── categories.js       # Category route definitions
│   ├── postman_collection.json  # Postman collection for all endpoints
│   ├── server.js               # Express server entry point
│   └── package.json            # Dependencies
├── API.md                      # Complete API documentation
├── SETUP.md                    # Setup & deployment guide
└── README.md                   # This file
```

## 🚦 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Gursewaksinghsidhu123/task-planner.git
cd task-planner/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment** (for production deployment)
The database connection is configured for Render deployment. For local development, update `config/database.js`.

4. **Start the server**
```bash
npm start
```

The API will be available at `http://localhost:5000`

## 📡 API Endpoints

### Health Check
```
GET /health               - Server status
```

### Users (Public)
```
POST /api/users/register  - Register new user (returns JWT)
POST /api/users/login     - Login (returns JWT)
```

### Users (Protected — requires JWT)
```
GET    /api/users         - Get all users
GET    /api/users/:id     - Get user by ID
PUT    /api/users/:id     - Update user
DELETE /api/users/:id     - Delete user
```

### Tasks (All Protected — requires JWT)
```
GET    /api/tasks               - Get all tasks
GET    /api/tasks/user/:userId  - Get tasks for a user
GET    /api/tasks/:id           - Get task by ID
POST   /api/tasks               - Create new task
PUT    /api/tasks/:id           - Update task
DELETE /api/tasks/:id           - Delete task
```

### Categories (Public reads, Protected writes)
```
GET    /api/categories     - Get all categories (public)
GET    /api/categories/:id - Get category by ID (public)
POST   /api/categories     - Create category (JWT required)
PUT    /api/categories/:id - Update category (JWT required)
DELETE /api/categories/:id - Delete category (JWT required)
```

See [API.md](API.md) for complete documentation with request/response examples.
Import [postman_collection.json](backend/postman_collection.json) into Postman to test all endpoints.

## 🗄️ Database Schema

**Users**
- id (Primary Key)
- username (Unique)
- email (Unique)
- password (Hashed)
- created_at

**Tasks**
- id (Primary Key)
- user_id (Foreign Key → users)
- category_id (Foreign Key → categories)
- title
- description
- due_date
- priority (low, medium, high)
- status (pending, in-progress, completed)
- completed (Boolean)
- created_at, updated_at

**Categories**
- id (Primary Key)
- name (Unique)
- color (Hex code)
- created_at

### Default Categories
- Homework (Blue)
- Exam (Red)
- Project (Green)
- Assignment (Yellow)
- Reading (Purple)
- Other (Gray)

## 🧪 Testing

Test database connection:
```bash
npm run test:db
```

## 🌐 Deployment

The API is deployed on **Render** with automatic deployments from the main branch.

**Deployed Services:**
- Web Service: https://task-planner-api-hu8d.onrender.com
- PostgreSQL Database: Hosted on Render

For deployment instructions, see [SETUP.md](SETUP.md)

## 👤 Author

**Gursewak Singh**
- GitHub: [@Gursewaksinghsidhu123](https://github.com/Gursewaksinghsidhu123)

## 📄 License

This project is created for educational purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open a Pull Request
