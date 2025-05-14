// Imports
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Disable strictQuery warning for Mongoose
mongoose.set("strictQuery", false);

// Port
const PORT = process.env.port || 8080;
const MONGO_URI = process.env.dbURL || "mongodb://localhost:27017/LMS-Database";

// Routes imports
const adminRouter = require("./routes/Admins.Route");
const studentRouter = require("./routes/Student.Route");
const tutorRouter = require("./routes/Tutor.Route");
const quizRouter = require("./routes/Quiz.Route");
const contentRouter = require("./routes/Content.Route");
const DoubtRouter = require("./routes/Doubt.Route");
const DashboardRouter = require("./routes/Dashboard.Route");

// Middleware
app.use(express.text());
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Home Route");
});
app.use("/admin", adminRouter);
app.use("/tutor", tutorRouter);
app.use("/student", studentRouter);
app.use("/quiz", quizRouter);
app.use("/content", contentRouter);
app.use("/doubt", DoubtRouter);
app.use("/dashboard", DashboardRouter);

// Database Connection & App Start
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Listening at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to DB:", error.message);
    process.exit(1); // Exit the process if DB connection fails
  });
