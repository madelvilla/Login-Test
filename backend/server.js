const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 5000;
require('dotenv').config();

// PostgreSQL connection setup
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, 
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// Login API Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM Login WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
