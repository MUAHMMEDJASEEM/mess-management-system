// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import UserList from './UserList';
import AddQuestion from './AddQuestion';
import AddChapter from './AddChapter';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>User List</Link>
          <Link to="/add-question" style={{ marginRight: '15px' }}>Add Question</Link>
          <Link to="/add-chapter">Add Chapter</Link>
        </nav>

        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/add-chapter" element={<AddChapter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
