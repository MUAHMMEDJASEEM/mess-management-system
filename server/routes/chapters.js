const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get all chapters
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM chapters ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching chapters:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Add a new chapter
router.post('/', async (req, res) => {
  const { name, subject_id } = req.body;

  if (!name || !subject_id) {
    return res.status(400).json({ message: 'Missing chapter name or subject_id' });
  }

  try {
    const result = await db.query(
      'INSERT INTO chapters (name, subject_id) VALUES ($1, $2) RETURNING *',
      [name, subject_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding chapter:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
