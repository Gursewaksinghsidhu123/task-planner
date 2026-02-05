# Setup Guide

## Quick Start

### 1. Database Setup (Render)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Create a new PostgreSQL database
3. Copy the **External Database URL**
4. Paste it into `backend/.env` as `DATABASE_URL`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with:
PORT=5000
DATABASE_URL=postgresql://user:password@host/database
JWT_SECRET=your_secret_key_here

# Test database connection
npm run test:db

# Start the server (creates tables automatically)
npm start
```

### 3. Verify Setup

The server will:
- Connect to PostgreSQL
- Create tables (users, tasks, categories)
- Insert default categories
- Start listening on port 5000

You should see:
```
✅ Database tables created successfully
╔════════════════════════════════════════════╗
║   Student Task Planner API Server         ║
║   Server running on port 5000              ║
╚════════════════════════════════════════════╝
```

## Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:5000/health

# Register a user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Get categories
curl http://localhost:5000/api/categories
```

### Using Postman or Thunder Client

1. Import the endpoints from `API.md`
2. Test each endpoint
3. Save the JWT token from login
4. Use token in Authorization header for protected routes

## Troubleshooting

### Database Connection Issues

**Error: "client password must be a string"**
- Check if `DATABASE_URL` is correctly set in `.env`
- Verify the URL format: `postgresql://user:password@host/database`

**Error: "The server does not support SSL connections"**
- Your database doesn't require SSL
- Remove SSL configuration from `config/database.js`

**Error: "Connection timeout"**
- Check if your IP is whitelisted on Render
- Verify database is running on Render dashboard

### Server Won't Start

1. Check if port 5000 is already in use
2. Verify all npm packages are installed: `npm install`
3. Check `.env` file exists and has correct values
4. Review console errors for specific issues

### Tables Not Created

1. Check database connection is successful
2. Verify `setupDatabase.js` is being called in `server.js`
3. Check PostgreSQL user has CREATE TABLE permissions

## Environment Variables

Required variables in `backend/.env`:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your_very_secret_key_here
```

**Security Note:** Never commit `.env` file to Git. It's already in `.gitignore`.

## Development Workflow

1. Make changes to code
2. Restart server (Ctrl+C then `npm start`)
3. Test endpoints with Postman/cURL
4. Check console logs for errors
5. Commit working changes to Git

## Production Deployment

### Deploy to Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables in Render dashboard
5. Deploy

Render will automatically:
- Install dependencies
- Run `npm start`
- Create tables in database
- Provide a public URL

## Next Steps

1. ✅ Setup backend
2. 🔲 Build frontend (React/Vue/HTML)
3. 🔲 Connect frontend to API
4. 🔲 Add authentication to frontend
5. 🔲 Deploy both services
