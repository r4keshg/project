import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import express from "express";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
});

async function ensureUploadsDirExists() {
  try {
    await fs.mkdir("./uploads", { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error("Error creating uploads directory:", err);
    }
  }
}


export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // File upload route
  app.post("/api/upload", upload.array("files"), async (req, res) => {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const urls = req.files.map(
      (file) => `/uploads/${file.filename}`
    );

    res.json({ urls });
  });

  // Serve uploaded files
  app.use("/uploads", express.static("uploads"));

  // Course routes
  app.get("/api/courses", async (req, res) => {
    const courses = await storage.listCourses();
    res.json(courses);
  });

  app.post("/api/courses", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const course = await storage.createCourse({
      ...req.body,
      creator: req.user.id,
    });
    res.status(201).json(course);
  });

  app.get("/api/courses/:id", async (req, res) => {
    const course = await storage.getCourse(parseInt(req.params.id));
    if (!course) return res.sendStatus(404);
    res.json(course);
  });

  // Progress routes
  app.post("/api/progress", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const progress = await storage.createProgress({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(progress);
  });

  app.patch("/api/progress/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const progress = await storage.updateProgress(parseInt(req.params.id), req.body);
    res.json(progress);
  });

  // Community routes
  app.get("/api/posts", async (req, res) => {
    const type = req.query.type as string | undefined;
    const posts = await storage.getPosts(type);
    res.json(posts);
  });

  app.post("/api/posts", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const post = await storage.createPost({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(post);
  });

  app.get("/api/posts/:id/comments", async (req, res) => {
    const comments = await storage.getComments(parseInt(req.params.id));
    res.json(comments);
  });

  app.post("/api/posts/:id/comments", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const comment = await storage.createComment({
      ...req.body,
      postId: parseInt(req.params.id),
      userId: req.user.id,
    });
    res.status(201).json(comment);
  });

  // User updates
  app.patch("/api/users/:id", async (req, res) => {
    if (!req.isAuthenticated() || req.user.id !== parseInt(req.params.id)) {
      return res.sendStatus(401);
    }
    const user = await storage.updateUser(parseInt(req.params.id), req.body);
    res.json(user);
  });

  await ensureUploadsDirExists();
  const httpServer = createServer(app);
  return httpServer;
}