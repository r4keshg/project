const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number // index of the correct option
});

const moduleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  language: String,
  length: String, // e.g., "5 hours", "3 modules", etc.
  videoLink: String, // e.g., YouTube link
  modules: [moduleSchema],
  quiz: [quizSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
