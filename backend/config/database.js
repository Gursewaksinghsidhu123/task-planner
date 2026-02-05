const { Pool } = require('pg');
require('dotenv').config();

// For local development, we use hardcoded URL
// For production (Render), this will be overridden by environment variable
const DATABASE_URL = process.env.DATABASE_URL || 
  'postgresql://task_planner_db_h7ea_user:XwoSDzj6UureN9EhElDmxytaNWXh9m6n@dpg-d62hrg0nputs73b40ul0-a.oregon-postgres.render.com/task_planner_db_h7ea';

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
