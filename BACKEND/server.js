const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Connect to MySQL
const db = require('./db');

// Import routes
const memberRoutes= require('./routes/members');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.send('🎉 Club Members API is running');
});

// Members API route
app.use('/api/members', memberRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
