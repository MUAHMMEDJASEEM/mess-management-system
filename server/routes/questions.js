const express = require('express');
const router = express.Router();
const db = require('../db/db');

// POST /questions - Add a new question
router.post('/', async (req, res) => {
  try {
    const {
      subject_id,
      chapter_id,
      difficulty,
      question_type,
      question_content,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_option,
      explanation,
      tags,
      author_id
    } = req.body;

    // Ensure tags is a proper JS array
    let tagsArray = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
      ? tags.split(',').map(tag => tag.trim())
      : [];

    const result = await db.query(
      `INSERT INTO questions (
        subject_id, chapter_id, difficulty, question_type, question_content,
        option_a, option_b, option_c, option_d, correct_option,
        explanation, tags, author_id
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *`,
      [
        subject_id,
        chapter_id,
        difficulty,
        question_type,
        question_content,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option,
        explanation,
        tagsArray,
        author_id
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting question:', error);
    res.status(500).json({ error: 'Failed to insert question', details: error.message });
  }
});

module.exports = router;
