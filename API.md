# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## User Endpoints

### Register User
**POST** `/users/register`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "userId": 1,
  "token": "jwt_token_here"
}
```

### Login User
**POST** `/users/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Get User by ID
**GET** `/users/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "created_at": "2026-02-05T10:00:00.000Z"
}
```

---

## Task Endpoints

### Get All Tasks
**GET** `/tasks?user_id=1`

**Query Parameters:**
- `user_id` (required) - User ID to filter tasks

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "category_id": 1,
    "title": "Complete Assignment",
    "description": "Finish the math homework",
    "due_date": "2026-02-10",
    "priority": "high",
    "status": "pending",
    "completed": false,
    "created_at": "2026-02-05T10:00:00.000Z",
    "updated_at": "2026-02-05T10:00:00.000Z"
  }
]
```

### Get Task by ID
**GET** `/tasks/:id`

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "category_id": 1,
  "title": "Complete Assignment",
  "description": "Finish the math homework",
  "due_date": "2026-02-10",
  "priority": "high",
  "status": "pending",
  "completed": false
}
```

### Create Task
**POST** `/tasks`

**Request Body:**
```json
{
  "user_id": 1,
  "category_id": 1,
  "title": "Study for Exam",
  "description": "Review chapters 1-5",
  "due_date": "2026-02-15",
  "priority": "high",
  "status": "pending"
}
```

**Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": 2,
    "user_id": 1,
    "category_id": 1,
    "title": "Study for Exam",
    "description": "Review chapters 1-5",
    "due_date": "2026-02-15",
    "priority": "high",
    "status": "pending",
    "completed": false
  }
}
```

### Update Task
**PUT** `/tasks/:id`

**Request Body:**
```json
{
  "title": "Study for Final Exam",
  "priority": "high",
  "status": "in-progress",
  "completed": false
}
```

**Response:**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": 2,
    "title": "Study for Final Exam",
    "priority": "high",
    "status": "in-progress",
    "completed": false
  }
}
```

### Delete Task
**DELETE** `/tasks/:id`

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

---

## Category Endpoints

### Get All Categories
**GET** `/categories`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Homework",
    "color": "#3B82F6",
    "created_at": "2026-02-05T10:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Exam",
    "color": "#EF4444",
    "created_at": "2026-02-05T10:00:00.000Z"
  }
]
```

### Create Category
**POST** `/categories`

**Request Body:**
```json
{
  "name": "Lab Work",
  "color": "#10B981"
}
```

**Response:**
```json
{
  "message": "Category created successfully",
  "category": {
    "id": 7,
    "name": "Lab Work",
    "color": "#10B981"
  }
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Priority Values

- `low`
- `medium`
- `high`

## Status Values

- `pending`
- `in-progress`
- `completed`

## Default Categories

The system includes these default categories:
1. Homework (#3B82F6 - Blue)
2. Exam (#EF4444 - Red)
3. Project (#10B981 - Green)
4. Assignment (#F59E0B - Yellow)
5. Reading (#8B5CF6 - Purple)
6. Other (#6B7280 - Gray)
