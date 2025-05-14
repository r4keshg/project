import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import './App.css';

const saveCourses = (courses) => {
  localStorage.setItem('courses', JSON.stringify(courses));
};

const loadCourses = () => {
  const saved = localStorage.getItem('courses');
  return saved ? JSON.parse(saved) : [];
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="logo">SkillShare Clone</Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/courses" className="nav-link">All Courses</Link>
              <Link to="/courses/create" className="nav-link">Create Course</Link>
            </div>
          </div>
        </nav>

        <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/create" element={<CreateCourse />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  const [recentCourses, setRecentCourses] = useState([]);

  useEffect(() => {
    const courses = loadCourses();
    setRecentCourses(courses.slice(0, 3));
  }, []);

  return (
    <div className="home-container">
      <section className="card">
        <h1 className="card-title">Welcome to SkillShare Clone</h1>
        <p className="card-text">
          A platform where users can create and share educational courses.
        </p>
        <div className="button-group">
          <Link to="/courses" className="btn btn-blue">Browse Courses</Link>
          <Link to="/courses/create" className="btn btn-green">Create a Course</Link>
        </div>
      </section>

      {recentCourses.length > 0 && (
        <section className="card">
          <h2 className="card-title">Recent Courses</h2>
          <div className="course-grid">
            {recentCourses.map(course => (
              <div key={course.id} className="course-card">
                <h3 className="course-card-title">{course.title}</h3>
                <p className="course-card-text">
                  {course.description.substring(0, 100)}...
                </p>
                <Link to={`/courses/${course.id}`} className="course-card-link">
                  View Course
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(loadCourses());
  }, []);

  return (
    <div className="card">
      <h1 className="card-title">All Courses</h1>
      
      {courses.length === 0 ? (
        <p>No courses available. Be the first to create one!</p>
      ) : (
        <div className="course-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <h2 className="course-card-title">{course.title}</h2>
              <p className="course-card-text">
                {course.description.substring(0, 100)}...
              </p>
              <p className="course-card-modules">
                {course.modules.length} modules
              </p>
              <Link to={`/courses/${course.id}`} className="course-card-link">
                View Course
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CreateCourse() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modules, setModules] = useState([{
    title: '',
    content: '',
    videoUrl: '',
    quiz: []
  }]);

  const addModule = () => {
    setModules([...modules, {
      title: '',
      content: '',
      videoUrl: '',
      quiz: []
    }]);
  };

  const updateModule = (index, field, value) => {
    const newModules = [...modules];
    newModules[index][field] = value;
    setModules(newModules);
  };

  const addQuizQuestion = (moduleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].quiz.push({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
    setModules(newModules);
  };

  const updateQuizQuestion = (moduleIndex, questionIndex, field, value) => {
    const newModules = [...modules];
    newModules[moduleIndex].quiz[questionIndex][field] = value;
    setModules(newModules);
  };

  const updateQuizOption = (moduleIndex, questionIndex, optionIndex, value) => {
    const newModules = [...modules];
    newModules[moduleIndex].quiz[questionIndex].options[optionIndex] = value;
    setModules(newModules);
  };

  const setCorrectAnswer = (moduleIndex, questionIndex, optionIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].quiz[questionIndex].correctAnswer = optionIndex;
    setModules(newModules);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const filteredModules = modules.filter(
      module => module.title.trim() !== '' || module.content.trim() !== ''
    );

    if (filteredModules.length === 0) {
      alert('Please add at least one module');
      return;
    }

    const courses = loadCourses();
    const newCourse = {
      id: Date.now().toString(),
      title,
      description,
      modules: filteredModules,
      createdAt: new Date().toISOString()
    };

    saveCourses([...courses, newCourse]);
    navigate(`/courses/${newCourse.id}`);
  };

  return (
    <div className="card">
      <h1 className="card-title">Create a New Course</h1>
      
      <form onSubmit={handleSubmit} className="create-course-form">
        <div className="form-group">
          <label className="form-label">Course Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Course Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            required
          />
        </div>
        
        <div className="modules-container">
          <div className="modules-header">
            <h2 className="section-title">Course Modules</h2>
            <button
              type="button"
              onClick={addModule}
              className="btn btn-blue"
            >
              Add Module
            </button>
          </div>
          
          {modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="module-card">
              <h3 className="module-title">Module {moduleIndex + 1}</h3>
              
              <div className="module-fields">
                <div className="form-group">
                  <label className="form-label">Module Title</label>
                  <input
                    type="text"
                    value={module.title}
                    onChange={(e) => updateModule(moduleIndex, 'title', e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Module Content</label>
                  <textarea
                    value={module.content}
                    onChange={(e) => updateModule(moduleIndex, 'content', e.target.value)}
                    className="form-textarea"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">YouTube Video URL</label>
                  <input
                    type="text"
                    value={module.videoUrl}
                    onChange={(e) => updateModule(moduleIndex, 'videoUrl', e.target.value)}
                    className="form-input"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                
                <div className="quiz-container">
                  <div className="quiz-header">
                    <h4 className="quiz-title">Quiz Questions</h4>
                    <button
                      type="button"
                      onClick={() => addQuizQuestion(moduleIndex)}
                      className="btn btn-green btn-small"
                    >
                      Add Question
                    </button>
                  </div>
                  
                  {module.quiz.map((question, questionIndex) => (
                    <div key={questionIndex} className="quiz-card">
                      <h5 className="quiz-card-title">Question {questionIndex + 1}</h5>
                      
                      <div className="form-group">
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => updateQuizQuestion(moduleIndex, questionIndex, 'question', e.target.value)}
                          className="form-input"
                          placeholder="Enter question text"
                        />
                      </div>
                      
                      <div className="quiz-options">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="form-group">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateQuizOption(moduleIndex, questionIndex, optionIndex, e.target.value)}
                              className="form-input"
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => setCorrectAnswer(moduleIndex, questionIndex, optionIndex)}
                              className={`btn ${question.correctAnswer === optionIndex ? 'btn-green' : 'btn-gray'} btn-small`}
                            >
                              {question.correctAnswer === optionIndex ? 'Correct' : 'Set as Correct'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button type="submit" className="btn btn-blue submit-btn">Save Course</button>
      </form>
    </div>
  );
}

// Dummy CourseDetail component as placeholder
function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const courses = loadCourses();
    const found = courses.find(c => c.id === id);
    setCourse(found);
  }, [id]);

  if (!course) {
    return <p>Course not found.</p>;
  }

  return (
    <div className="card">
      <h1 className="card-title">{course.title}</h1>
      <p className="card-text">{course.description}</p>
      {/* Additional course details can be added here */}
    </div>
  );
}

export default App;
