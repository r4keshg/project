require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const courseRoutes = require('./routes/courseRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your own MongoDB connection string
// You can keep it in .env file: MONGO_URI="mongodb://localhost:27017/arenaDB"
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/arenaDB";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
