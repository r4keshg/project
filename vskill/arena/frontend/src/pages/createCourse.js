import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function CreateCourse() {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [length, setLength] = useState('');
  const [videoLink, setVideoLink] = useState('');
  
  // Modules and Quiz
  const [modules, setModules] = useState([]);
  const [quiz, setQuiz] = useState([]);
  
  // Temporary states for adding module/quiz
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleContent, setModuleContent] = useState('');
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizOptions, setQuizOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState('');

  // Add module
  const addModule = () => {
    if (moduleTitle && moduleContent) {
      setModules([...modules, { title: moduleTitle, content: moduleContent }]);
      setModuleTitle('');
      setModuleContent('');
    }
  };

  // Add quiz question
  const addQuizQuestion = () => {
    if (quizQuestion && quizOptions.length > 0) {
      setQuiz([...quiz, { question: quizQuestion, options: quizOptions, correctAnswer: 0 }]);
      setQuizQuestion('');
      setQuizOptions([]);
    }
  };

  // Add option to quiz
  const addOption = () => {
    if (currentOption) {
      setQuizOptions([...quizOptions, currentOption]);
      setCurrentOption('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCourse = {
        title,
        description,
        language,
        length,
        videoLink,
        modules,
        quiz
      };
      await API.post('/courses', newCourse);
      alert('Course created successfully!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Failed to create course');
    }
  };

  return (
    <div>
      <h2>Create a New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Title</label><br/>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Description</label><br/>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div>
          <label>Language</label><br/>
          <input 
            type="text" 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)} 
          />
        </div>
        <div>
          <label>Length</label><br/>
          <input 
            type="text" 
            value={length} 
            onChange={(e) => setLength(e.target.value)} 
          />
        </div>
        <div>
          <label>Video Link (YouTube)</label><br/>
          <input 
            type="text" 
            value={videoLink} 
            onChange={(e) => setVideoLink(e.target.value)} 
          />
        </div>

        <hr />
        <h3>Modules</h3>
        <div>
          <label>Module Title</label><br/>
          <input 
            type="text" 
            value={moduleTitle} 
            onChange={(e) => setModuleTitle(e.target.value)} 
          />
        </div>
        <div>
          <label>Module Content</label><br/>
          <textarea 
            value={moduleContent} 
            onChange={(e) => setModuleContent(e.target.value)} 
          />
        </div>
        <button type="button" onClick={addModule}>Add Module</button>
        <ul>
          {modules.map((mod, idx) => (
            <li key={idx}>
              <strong>{mod.title}</strong>: {mod.content}
            </li>
          ))}
        </ul>

        <hr />
        <h3>Quiz</h3>
        <div>
          <label>Question</label><br/>
          <input 
            type="text" 
            value={quizQuestion} 
            onChange={(e) => setQuizQuestion(e.target.value)} 
          />
        </div>
        <div>
          <label>Options</label><br/>
          <input 
            type="text" 
            value={currentOption} 
            onChange={(e) => setCurrentOption(e.target.value)} 
          />
          <button type="button" onClick={addOption}>Add Option</button>
        </div>
        <ul>
          {quizOptions.map((opt, idx) => (
            <li key={idx}>{opt}</li>
          ))}
        </ul>
        <button type="button" onClick={addQuizQuestion}>Add Question</button>
        <ul>
          {quiz.map((q, idx) => (
            <li key={idx}>
              <strong>{q.question}</strong> | {q.options.join(', ')}
            </li>
          ))}
        </ul>

        <hr />
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}

export default CreateCourse;
