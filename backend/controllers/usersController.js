const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /register - Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate all required fields are present
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists by email or username
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before storing (never store plain text)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into database
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
      [username, email, hashedPassword]
    );

    // Generate JWT token for immediate login after registration
    const token = jwt.sign(
      { userId: result.rows[0].id },
      process.env.JWT_SECRET || 'default_secret_key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0],
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// POST /login - Authenticate user and return token
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Look up user by email
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compare provided password against stored bcrypt hash
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token (password is never included in response)
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'default_secret_key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

// GET / - Return all users (password excluded)
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, created_at FROM users ORDER BY created_at DESC'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /:id - Return a single user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT id, username, email, created_at FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT /:id - Update user fields (re-hashes password if changed)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    // Verify user exists before updating
    const checkUser = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (checkUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If a new password is provided, hash it; otherwise keep the existing hash
    let hashedPassword = checkUser.rows[0].password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const result = await pool.query(
      `UPDATE users
       SET username = COALESCE($1, username),
           email = COALESCE($2, email),
           password = $3
       WHERE id = $4
       RETURNING id, username, email, created_at`,
      [username, email, hashedPassword, id]
    );

    res.json({
      message: 'User updated successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /:id - Remove a user from the database
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id, username, email',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'User deleted successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
