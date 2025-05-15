import React, { useState } from 'react';

const MockTest = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Optional filters
  const [subjectId, setSubjectId] = useState('');
  const [chapterIds, setChapterIds] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [count, setCount] = useState(5);

  const fetchMockTest = async () => {
    setLoading(true);
    setError(null);

    // Prepare body with parsed chapterIds as array
    const body = {
      count: Number(count),
    };

    if (subjectId) body.subject_id = Number(subjectId);
    if (chapterIds.trim()) {
      // Convert comma separated string to array of numbers
      body.chapter_ids = chapterIds.split(',').map(id => Number(id.trim())).filter(id => !isNaN(id));
    }
    if (difficulty) body.difficulty = Number(difficulty);

    try {
      const res = await fetch('https://mess-server-new.onrender.com/mocktests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Failed to fetch mock test');

      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mock-test-container">
      <h2>Create or Manage Mock Tests</h2>

      <div className="filters">
        <label>
          Subject ID:
          <input
            type="number"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            placeholder="e.g. 1"
          />
        </label>

        <label>
          Chapter IDs (comma separated):
          <input
            type="text"
            value={chapterIds}
            onChange={(e) => setChapterIds(e.target.value)}
            placeholder="e.g. 3,4,5"
          />
        </label>

        <label>
          Difficulty (1=Easy, 2=Medium, 3=Hard):
          <input
            type="number"
            min="1"
            max="3"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          />
        </label>

        <label>
          Number of Questions:
          <input
            type="number"
            min="1"
            max="20"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </label>

        <button onClick={fetchMockTest} disabled={loading}>
          {loading ? 'Loading...' : 'Generate Mock Test'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="questions-list">
        {questions.length === 0 && !loading && <p>No questions yet. Generate one!</p>}

        {questions.map((q, idx) => (
          <div key={q.id} className="question-card" style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
            <h4>Q{idx + 1}: <span dangerouslySetInnerHTML={{ __html: q.question_content }} /></h4>
            <ul>
              <li>A: {q.option_a}</li>
              <li>B: {q.option_b}</li>
              <li>C: {q.option_c}</li>
              <li>D: {q.option_d}</li>
            </ul>
            <p><b>Correct Option:</b> {q.correct_option}</p>
            {q.explanation && (
              <p><b>Explanation:</b> <span dangerouslySetInnerHTML={{ __html: q.explanation }} /></p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockTest;
