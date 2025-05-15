// In routes/mocktests.js

const express = require('express');
const router = express.Router();
const db = require('../db/db'); 

router.post('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM questions LIMIT 5');
    res.json({ questions: result.rows });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
});

module.exports = router;