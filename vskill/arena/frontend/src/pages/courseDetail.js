import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import Quiz from './Quiz';

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Language:</strong> {course.language}</p>
      <p><strong>Length:</strong> {course.length}</p>
      
      {/* If you have a YouTube link, you can embed it in an iframe */}
      {course.videoLink && (
        <div style={{ margin: '20px 0' }}>
          <iframe
            width="560"
            height="315"
            src={course.videoLink.replace('watch?v=', 'embed/')}
            title={course.title}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}

      <h3>Modules</h3>
      {course.modules && course.modules.length > 0 ? (
        course.modules.map((mod, idx) => (
          <div key={idx} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px' }}>
            <h4>{mod.title}</h4>
            <p>{mod.content}</p>
          </div>
        ))
      ) : (
        <p>No modules available</p>
      )}

      <h3>Quiz</h3>
      {course.quiz && course.quiz.length > 0 ? (
        <Quiz quizQuestions={course.quiz} />
      ) : (
        <p>No quiz available</p>
      )}
    </div>
  );
}

export default CourseDetail;
