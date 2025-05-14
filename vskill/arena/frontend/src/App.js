import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import CreateCourse from './components/CreateCourse';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', margin: '0 auto', maxWidth: '900px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>ARENA</h1>
        <nav>
          <Link to="/" style={{ marginRight: '10px' }}>All Courses</Link>
          <Link to="/create">Create Course</Link>
        </nav>
      </header>
      <hr />
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/create" element={<CreateCourse />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
    </div>
  );
}

export default App;
