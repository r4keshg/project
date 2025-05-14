// This is a React application with React Router for navigation
// File: App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// Mock database using localStorage
const saveCourses = (courses) => {
  localStorage.setItem('courses', JSON.stringify(courses));
};

const loadCourses = () => {
  const saved = localStorage.getItem('courses');
  return saved ? JSON.parse(saved) : [];
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">SkillShare Clone</Link>
            <div className="flex space-x-4">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/courses" className="hover:underline">All Courses</Link>
              <Link to="/courses/create" className="hover:underline">Create Course</Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-4">
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

// Home Component
function Home() {
  const [recentCourses, setRecentCourses] = useState([]);

  useEffect(() => {
    const courses = loadCourses();
    setRecentCourses(courses.slice(0, 3)); // Show only 3 most recent courses
  }, []);

  return (
    <div className="space-y-6">
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Welcome to SkillShare Clone</h1>
        <p className="mb-4">A platform where users can create and share educational courses.</p>
        <div className="flex space-x-4">
          <Link to="/courses" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Browse Courses
          </Link>
          <Link to="/courses/create" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Create a Course
          </Link>
        </div>
      </section>

      {recentCourses.length > 0 && (
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Recent Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentCourses.map(course => (
              <div key={course.id} className="border rounded-lg p-4 hover:shadow-md">
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{course.description.substring(0, 100)}...</p>
                <Link to={`/courses/${course.id}`} className="text-blue-600 hover:underline">
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

// Course List Component
function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(loadCourses());
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>
      
      {courses.length === 0 ? (
        <p>No courses available. Be the first to create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="border rounded-lg p-4 hover:shadow-md">
              <h2 className="text-xl font-bold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description.substring(0, 100)}...</p>
              <p className="text-sm text-gray-500 mb-4">{course.modules.length} modules</p>
              <Link to={`/courses/${course.id}`} className="text-blue-600 hover:underline">
                View Course
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Create Course Component
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
    
    // Simple validation
    if (!title.trim() || !description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // For any modules that are completely empty, remove them
    const filteredModules = modules.filter(
      module => module.title.trim() !== '' || module.content.trim() !== ''
    );

    if (filteredModules.length === 0) {
      alert('Please add at least one module');
      return;
    }

    // Save course to database
    const courses = loadCourses();
    const newCourse = {
      id: Date.now().toString(),
      title,
      description,
      modules: filteredModules,
      createdAt: new Date().toISOString()
    };
    
    saveCourses([...courses, newCourse]);
    
    // Redirect to course detail
    navigate(`/courses/${newCourse.id}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Create a New Course</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded h-24"
            required
          />
        </div>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Course Modules</h2>
            <button 
              type="button" 
              onClick={addModule}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Module
            </button>
          </div>
          
          {modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="border p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Module {moduleIndex + 1}</h3>
              
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Module Title</label>
                  <input
                    type="text"
                    value={module.title}
                    onChange={(e) => updateModule(moduleIndex, 'title', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Module Content</label>
                  <textarea
                    value={module.content}
                    onChange={(e) => updateModule(moduleIndex, 'content', e.target.value)}
                    className="w-full p-2 border rounded h-24"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video URL</label>
                  <input
                    type="text"
                    value={module.videoUrl}
                    onChange={(e) => updateModule(moduleIndex, 'videoUrl', e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium">Quiz Questions</h4>
                    <button 
                      type="button" 
                      onClick={() => addQuizQuestion(moduleIndex)}
                      className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700"
                    >
                      Add Question
                    </button>
                  </div>
                  
                  {module.quiz.map((question, questionIndex) => (
                    <div key={questionIndex} className="border p-3 rounded">
                      <h5 className="font-medium mb-2">Question {questionIndex + 1}</h5>
                      
                      <div className="mb-3">
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => updateQuizQuestion(moduleIndex, questionIndex, 'question', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Enter question text"
                        />
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center">
                            <input
                              type="radio"
                              name={`correct-${moduleIndex}-${questionIndex}`}
                              checked={question.correctAnswer === optionIndex}
                              onChange={() => setCorrectAnswer(moduleIndex, questionIndex, optionIndex)}
                              className="mr-2"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateQuizOption(moduleIndex, questionIndex, optionIndex, e.target.value)}
                              className="w-full p-1 border rounded"
                              placeholder={`Option ${optionIndex + 1}`}
                            />
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
        
        <div className="flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
}

// Course Detail Component
function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeModule, setActiveModule] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  useEffect(() => {
    const courses = loadCourses();
    const foundCourse = courses.find(c => c.id === id);
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Initialize quiz answers
      const initialAnswers = {};
      foundCourse.modules.forEach((module, moduleIndex) => {
        module.quiz.forEach((_, questionIndex) => {
          initialAnswers[`${moduleIndex}-${questionIndex}`] = null;
        });
      });
      setQuizAnswers(initialAnswers);
    }
  }, [id]);

  const selectAnswer = (moduleIndex, questionIndex, optionIndex) => {
    if (quizSubmitted) return;
    
    setQuizAnswers({
      ...quizAnswers,
      [`${moduleIndex}-${questionIndex}`]: optionIndex
    });
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    // Reset answers
    const initialAnswers = {};
    course.modules[activeModule].quiz.forEach((_, questionIndex) => {
      initialAnswers[`${activeModule}-${questionIndex}`] = null;
    });
    setQuizAnswers({...quizAnswers, ...initialAnswers});
    setQuizSubmitted(false);
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };

  if (!course) {
    return <div className="text-center p-10">Loading course...</div>;
  }

  const currentModule = course.modules[activeModule];
  const embedUrl = getYouTubeEmbedUrl(currentModule.videoUrl);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-gray-600">{course.description}</p>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Module Navigation Sidebar */}
        <div className="md:w-1/4 bg-gray-50 p-4 border-r">
          <h2 className="text-xl font-bold mb-4">Modules</h2>
          <ul className="space-y-2">
            {course.modules.map((module, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setActiveModule(index);
                    setQuizSubmitted(false);
                  }}
                  className={`w-full text-left p-2 rounded ${activeModule === index ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                >
                  {module.title || `Module ${index + 1}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Module Content */}
        <div className="md:w-3/4 p-6">
          <h2 className="text-2xl font-bold mb-4">{currentModule.title || `Module ${activeModule + 1}`}</h2>
          
          {/* Video Section */}
          {embedUrl && (
            <div className="mb-6">
              <iframe
                width="100%"
                height="400"
                src={embedUrl}
                title={`YouTube video for ${currentModule.title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded"
              ></iframe>
            </div>
          )}
          
          {/* Content Section */}
          <div className="mb-6 prose max-w-none">
            {currentModule.content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          {/* Quiz Section */}
          {currentModule.quiz && currentModule.quiz.length > 0 && (
            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Module Quiz</h3>
                {quizSubmitted ? (
                  <button
                    onClick={resetQuiz}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Retake Quiz
                  </button>
                ) : (
                  <button
                    onClick={submitQuiz}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Submit Answers
                  </button>
                )}
              </div>
              
              <div className="space-y-6">
                {currentModule.quiz.map((question, questionIndex) => {
                  const questionKey = `${activeModule}-${questionIndex}`;
                  const selectedAnswer = quizAnswers[questionKey];
                  const isCorrect = quizSubmitted && selectedAnswer === question.correctAnswer;
                  const isWrong = quizSubmitted && selectedAnswer !== null && selectedAnswer !== question.correctAnswer;
                  
                  return (
                    <div key={questionIndex} className="border p-4 rounded">
                      <h4 className="font-bold mb-3">{question.question}</h4>
                      
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = selectedAnswer === optionIndex;
                          const isCorrectOption = quizSubmitted && optionIndex === question.correctAnswer;
                          
                          let optionClass = "p-2 border rounded block w-full text-left";
                          if (quizSubmitted) {
                            if (isCorrectOption) {
                              optionClass += " bg-green-100 border-green-500";
                            } else if (isSelected) {
                              optionClass += isCorrect ? " bg-green-100 border-green-500" : " bg-red-100 border-red-500";
                            }
                          } else if (isSelected) {
                            optionClass += " bg-blue-100 border-blue-500";
                          } else {
                            optionClass += " hover:bg-gray-100";
                          }
                          
                          return (
                            <button
                              key={optionIndex}
                              onClick={() => selectAnswer(activeModule, questionIndex, optionIndex)}
                              className={optionClass}
                              disabled={quizSubmitted}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                      
                      {quizSubmitted && (
                        <div className={`mt-2 p-2 rounded ${isCorrect ? 'bg-green-100 text-green-800' : isWrong ? 'bg-red-100 text-red-800' : ''}`}>
                          {isCorrect ? 'Correct!' : isWrong ? 'Incorrect. Try again!' : 'No answer provided.'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;