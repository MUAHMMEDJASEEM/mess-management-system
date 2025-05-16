const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/', async (req, res) => {
  const { subject_id, chapter_ids = [], difficulty, count = 5 } = req.body;

  try {
    let query = 'SELECT * FROM questions';
    const conditions = [];
    const values = [];

    if (subject_id) {
      values.push(subject_id);
      conditions.push(`subject_id = $${values.length}`);
    }

    if (chapter_ids.length > 0) {
      values.push(chapter_ids);
      conditions.push(`chapter_id = ANY($${values.length})`);
    }

    if (difficulty) {
      values.push(difficulty);
      conditions.push(`difficulty = $${values.length}`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    values.push(count);
    query += ` ORDER BY RANDOM() LIMIT $${values.length}`;

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No questions found matching criteria' });
    }

    res.json({ questions: result.rows });
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
});

module.exports = router;
