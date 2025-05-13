import React, { useState, useEffect } from 'react';

const AddChapter = () => {
  const [name, setName] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetch('https://mess-server-new.onrender.com/subjects')
      .then(res => res.json())
      .then(setSubjects)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !subjectId) return;

    try {
      const response = await fetch('https://mess-server-new.onrender.com/chapters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, subject_id: subjectId })
      });

      if (response.ok) {
        alert('Chapter added successfully!');
        setName('');
        setSubjectId('');
      } else {
        alert('Failed to add chapter.');
      }
    } catch (error) {
      console.error('Error adding chapter:', error);
    }
  };

  return (
    <div className='form-wrapper'>
      <h2>Add Chapter</h2>
      <form onSubmit={handleSubmit}>
        <label>Chapter Name:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <br />
        <label>Select Subject:</label>
        <select value={subjectId} onChange={e => setSubjectId(e.target.value)} required>
          <option value="">-- Select Subject --</option>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>{subject.name}</option>
          ))}
        </select>
        <br />
        <button type="submit">Add Chapter</button>
      </form>
    </div>
  );
};

export default AddChapter;
