// frontend/src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('/api/courses').then((response) => setCourses(response.data));
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      {courses.map((course) => (
        <div key={course._id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;