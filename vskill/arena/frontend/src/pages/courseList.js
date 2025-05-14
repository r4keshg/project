import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get('/courses');
        setCourses(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>All Courses</h2>
      {courses.map(course => (
        <div key={course._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <Link to={`/courses/${course._id}`}>View Course</Link>
        </div>
      ))}
    </div>
  );
}

export default CourseList;
