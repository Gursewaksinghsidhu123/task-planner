# API Documentation

## Base URL
```
https://task-planner-api-hu8d.onrender.com/api
```

## Authentication

Public routes (no token required):
- `POST /users/register`
- `POST /users/login`
- `GET /categories`
- `GET /categories/:id`

All other routes are **protected** and require a JWT token in the Authorization header:
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
  "username": "gursewak",
  "email": "gursewak@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "gursewak",
    "email": "gursewak@example.com",
    "created_at": "2026-02-26T10:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

### Login User
**POST** `/users/login`

**Request Body:**
```json
{
  "email": "gursewak@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "gursewak",
    "email": "gursewak@example.com"
  },
  "token": "jwt_token_here"
}
```

### Get All Users
**GET** `/users`

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "username": "gursewak",
    "email": "gursewak@example.com",
    "created_at": "2026-02-26T10:00:00.000Z"
  }
]
```

### Get User by ID
**GET** `/users/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "id": 1,
  "username": "gursewak",
  "email": "gursewak@example.com",
  "created_at": "2026-02-26T10:00:00.000Z"
}
```

### Update User
**PUT** `/users/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "username": "gursewak_updated",
  "email": "gursewak_new@example.com"
}
```

**Response (200 OK):**
```json
{
  "message": "User updated successfully",
  "user": {
    "id": 1,
    "username": "gursewak_updated",
    "email": "gursewak_new@example.com",
    "created_at": "2026-02-26T10:00:00.000Z"
  }
}
```

### Delete User
**DELETE** `/users/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "message": "User deleted successfully",
  "user": {
    "id": 1,
    "username": "gursewak",
    "email": "gursewak@example.com"
  }
}
```

---

## Task Endpoints

### Get All Tasks
**GET** `/tasks`

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "category_id": 1,
    "title": "Complete Assignment",
    "description": "Finish the math homework",
    "due_date": "2026-02-28",
    "priority": "high",
    "status": "pending",
    "completed": false,
    "category_name": "Homework",
    "category_color": "#3B82F6",
    "created_at": "2026-02-26T10:00:00.000Z",
    "updated_at": "2026-02-26T10:00:00.000Z"
  }
]
```

### Get Tasks by User
**GET** `/tasks/user/:userId`

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):** Same format as Get All Tasks, filtered by user.

### Get Task by ID
**GET** `/tasks/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "id": 1,
  "user_id": 1,
  "category_id": 1,
  "title": "Complete Assignment",
  "description": "Finish the math homework",
  "due_date": "2026-02-28",
  "priority": "high",
  "status": "pending",
  "completed": false,
  "category_name": "Homework",
  "category_color": "#3B82F6"
}
```

### Create Task
**POST** `/tasks`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "user_id": 1,
  "category_id": 1,
  "title": "Study for Exam",
  "description": "Review chapters 1-5",
  "due_date": "2026-03-01",
  "priority": "high",
  "status": "pending"
}
```

**Response (201 Created):**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": 2,
    "user_id": 1,
    "category_id": 1,
    "title": "Study for Exam",
    "description": "Review chapters 1-5",
    "due_date": "2026-03-01",
    "priority": "high",
    "status": "pending",
    "completed": false
  }
}
```

### Update Task
**PUT** `/tasks/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Study for Final Exam",
  "priority": "high",
  "status": "in-progress",
  "completed": false
}
```

**Response (200 OK):**
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

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "message": "Task deleted successfully"
}
```

---

## Category Endpoints

### Get All Categories
**GET** `/categories`

*(No authentication required)*

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Homework",
    "color": "#3B82F6",
    "created_at": "2026-02-26T10:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Exam",
    "color": "#EF4444",
    "created_at": "2026-02-26T10:00:00.000Z"
  }
]
```

### Get Category by ID
**GET** `/categories/:id`

*(No authentication required)*

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Homework",
  "color": "#3B82F6",
  "created_at": "2026-02-26T10:00:00.000Z"
}
```

### Create Category
**POST** `/categories`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Lab Work",
  "color": "#10B981"
}
```

**Response (201 Created):**
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

### Update Category
**PUT** `/categories/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Lab Reports",
  "color": "#059669"
}
```

**Response (200 OK):**
```json
{
  "message": "Category updated successfully",
  "category": {
    "id": 7,
    "name": "Lab Reports",
    "color": "#059669"
  }
}
```

### Delete Category
**DELETE** `/categories/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "message": "Category deleted successfully"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | OK — Request succeeded |
| `201` | Created — Resource created successfully |
| `400` | Bad Request — Missing or invalid input |
| `401` | Unauthorized — Missing or invalid JWT token |
| `404` | Not Found — Resource does not exist |
| `500` | Internal Server Error — Unexpected server error |

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
