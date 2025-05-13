// App.js
import React from 'react';
import UserList from './UserList';
import AddQuestion from './AddQuestion';
import AddChapter from './AddChapter';

function App() {
  return (
    <div className="App">
      <UserList />
      <AddQuestion />
      <AddChapter />
    </div>
  );
}

export default App;
