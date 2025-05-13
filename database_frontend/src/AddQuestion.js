import React, { useState, useEffect } from 'react';

const AddQuestion = () => {
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [formData, setFormData] = useState({
    subject_id: '',
    chapter_id: '',
    difficulty: '1',
    question_type: 'MCQ',
    question_content: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_option: 'A',
    explanation: '',
    tags: '',
    author_id: 1
  });

  // Fetch subjects and chapters on mount
  useEffect(() => {
    fetch('https://mess-server-new.onrender.com/subjects')
      .then(res => res.json())
      .then(setSubjects)
      .catch(console.error);

    fetch('https://mess-server-new.onrender.com/chapters')
      .then(res => res.json())
      .then(setChapters)
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()) // convert tags to array
    };

    try {
      const response = await fetch('http://localhost:3007/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Question added successfully!');
        setFormData({
          subject_id: '',
          chapter_id: '',
          difficulty: '1',
          question_type: 'MCQ',
          question_content: '',
          option_a: '',
          option_b: '',
          option_c: '',
          option_d: '',
          correct_option: 'A',
          explanation: '',
          tags: '',
          author_id: 1
        });
      } else {
        alert('Failed to add question');
      }
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  return (
    <div>
      <h2>Add New Question</h2>
      <form onSubmit={handleSubmit}>
        <label>Subject:</label>
        <select name="subject_id" value={formData.subject_id} onChange={handleChange} required>
          <option value="">Select Subject</option>
          {subjects.map(sub => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
        </select>

        <br />

        <label>Chapter:</label>
        <select name="chapter_id" value={formData.chapter_id} onChange={handleChange} required>
          <option value="">Select Chapter</option>
          {chapters
            .filter(ch => ch.subject_id === Number(formData.subject_id))
            .map(ch => (
              <option key={ch.id} value={ch.id}>{ch.name}</option>
          ))}
        </select>

        <br />

        <label>Difficulty (1=Easy, 2=Medium, 3=Hard):</label>
        <input name="difficulty" value={formData.difficulty} onChange={handleChange} type="number" min="1" max="3" />

        <br />

        <label>Question Content (HTML allowed):</label><br />
        <textarea name="question_content" value={formData.question_content} onChange={handleChange} rows="4" cols="50" />

        <br />

        <label>Option A:</label><input name="option_a" value={formData.option_a} onChange={handleChange} /><br />
        <label>Option B:</label><input name="option_b" value={formData.option_b} onChange={handleChange} /><br />
        <label>Option C:</label><input name="option_c" value={formData.option_c} onChange={handleChange} /><br />
        <label>Option D:</label><input name="option_d" value={formData.option_d} onChange={handleChange} /><br />

        <label>Correct Option (A/B/C/D):</label>
        <select name="correct_option" value={formData.correct_option} onChange={handleChange}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        <br />

        <label>Explanation (HTML allowed):</label><br />
        <textarea name="explanation" value={formData.explanation} onChange={handleChange} rows="3" cols="50" />

        <br />

        <label>Tags (comma-separated):</label><input name="tags" value={formData.tags} onChange={handleChange} /><br />

        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default AddQuestion;
