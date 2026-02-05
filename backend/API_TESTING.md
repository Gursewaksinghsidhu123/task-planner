# API Testing Guide - Postman/Thunder Client

## Base URL
- Local: `http://localhost:5000`
- Production: `https://your-app-name.onrender.com`

---

## 1. User Registration

**Endpoint:** `POST /api/users/register`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "username": "gursewak",
  "email": "gursewak@example.com",
  "password": "securepass123"
}
```

**Expected Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "gursewak",
    "email": "gursewak@example.com",
    "created_at": "2026-02-05T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 2. User Login

**Endpoint:** `POST /api/users/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "gursewak@example.com",
  "password": "securepass123"
}
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "gursewak",
    "email": "gursewak@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 3. Get All Categories

**Endpoint:** `GET /api/categories`

**Expected Response (200):**
```json
[
  {
    "id": 1,
    "name": "Homework",
    "color": "#3B82F6",
    "created_at": "2026-02-05T12:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Exam",
    "color": "#EF4444",
    "created_at": "2026-02-05T12:00:00.000Z"
  }
]
```

---

## 4. Create New Task

**Endpoint:** `POST /api/tasks`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "user_id": 1,
  "category_id": 1,
  "title": "Complete Math Assignment",
  "description": "Solve problems from Chapter 5",
  "due_date": "2026-02-10",
  "priority": "high",
  "status": "pending"
}
```

**Expected Response (201):**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": 1,
    "user_id": 1,
    "category_id": 1,
    "title": "Complete Math Assignment",
    "description": "Solve problems from Chapter 5",
    "due_date": "2026-02-10",
    "priority": "high",
    "status": "pending",
    "completed": false,
    "created_at": "2026-02-05T12:00:00.000Z",
    "updated_at": "2026-02-05T12:00:00.000Z"
  }
}
```

---

## 5. Get All Tasks for a User

**Endpoint:** `GET /api/tasks/user/:userId`

**Example:** `GET /api/tasks/user/1`

**Expected Response (200):**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "category_id": 1,
    "title": "Complete Math Assignment",
    "description": "Solve problems from Chapter 5",
    "due_date": "2026-02-10",
    "priority": "high",
    "status": "pending",
    "completed": false,
    "category_name": "Homework",
    "category_color": "#3B82F6",
    "created_at": "2026-02-05T12:00:00.000Z",
    "updated_at": "2026-02-05T12:00:00.000Z"
  }
]
```

---

## 6. Get Single Task

**Endpoint:** `GET /api/tasks/:id`

**Example:** `GET /api/tasks/1`

**Expected Response (200):**
```json
{
  "id": 1,
  "user_id": 1,
  "category_id": 1,
  "title": "Complete Math Assignment",
  "description": "Solve problems from Chapter 5",
  "due_date": "2026-02-10",
  "priority": "high",
  "status": "pending",
  "completed": false,
  "category_name": "Homework",
  "category_color": "#3B82F6",
  "created_at": "2026-02-05T12:00:00.000Z",
  "updated_at": "2026-02-05T12:00:00.000Z"
}
```

---

## 7. Update Task

**Endpoint:** `PUT /api/tasks/:id`

**Example:** `PUT /api/tasks/1`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "title": "Complete Math Assignment - Updated",
  "priority": "medium",
  "status": "in-progress"
}
```

**Expected Response (200):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": 1,
    "user_id": 1,
    "category_id": 1,
    "title": "Complete Math Assignment - Updated",
    "description": "Solve problems from Chapter 5",
    "due_date": "2026-02-10",
    "priority": "medium",
    "status": "in-progress",
    "completed": false,
    "created_at": "2026-02-05T12:00:00.000Z",
    "updated_at": "2026-02-05T13:00:00.000Z"
  }
}
```

---

## 8. Mark Task as Completed

**Endpoint:** `PATCH /api/tasks/:id/complete`

**Example:** `PATCH /api/tasks/1/complete`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "completed": true
}
```

**Expected Response (200):**
```json
{
  "message": "Task completion status updated",
  "task": {
    "id": 1,
    "user_id": 1,
    "category_id": 1,
    "title": "Complete Math Assignment - Updated",
    "description": "Solve problems from Chapter 5",
    "due_date": "2026-02-10",
    "priority": "medium",
    "status": "completed",
    "completed": true,
    "created_at": "2026-02-05T12:00:00.000Z",
    "updated_at": "2026-02-05T14:00:00.000Z"
  }
}
```

---

## 9. Delete Task

**Endpoint:** `DELETE /api/tasks/:id`

**Example:** `DELETE /api/tasks/1`

**Expected Response (200):**
```json
{
  "message": "Task deleted successfully",
  "task": {
    "id": 1,
    "user_id": 1,
    "category_id": 1,
    "title": "Complete Math Assignment - Updated",
    "description": "Solve problems from Chapter 5",
    "due_date": "2026-02-10",
    "priority": "medium",
    "status": "completed",
    "completed": true,
    "created_at": "2026-02-05T12:00:00.000Z",
    "updated_at": "2026-02-05T14:00:00.000Z"
  }
}
```

---

## 10. Get Tasks by Status

**Endpoint:** `GET /api/tasks/user/:userId/status/:status`

**Example:** `GET /api/tasks/user/1/status/pending`

**Valid statuses:** `pending`, `in-progress`, `completed`

---

## 11. Get Tasks by Category

**Endpoint:** `GET /api/tasks/user/:userId/category/:categoryId`

**Example:** `GET /api/tasks/user/1/category/1`

---

## 12. Create Custom Category

**Endpoint:** `POST /api/categories`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Lab Work",
  "color": "#9333EA"
}
```

**Expected Response (201):**
```json
{
  "message": "Category created successfully",
  "category": {
    "id": 7,
    "name": "Lab Work",
    "color": "#9333EA",
    "created_at": "2026-02-05T12:00:00.000Z"
  }
}
```

---

## Testing Workflow

### Test Sequence:
1. Register a user → Save the user ID
2. Login with that user → Save the token (optional for future auth)
3. Get all categories → Note the category IDs
4. Create a task using the user ID and a category ID
5. Get all tasks for the user
6. Update the task
7. Mark task as completed
8. Get tasks by status (completed)
9. Delete the task

---

## Common Error Responses

### 400 Bad Request
```json
{
  "error": "All fields are required"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid credentials"
}
```

### 404 Not Found
```json
{
  "error": "Task not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Server error while creating task"
}
```
