import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  rank: text("rank").notNull().default("Beginner"),
  coins: integer("coins").notNull().default(0),
  streak: integer("streak").notNull().default(0),
  lastLoginDate: timestamp("last_login_date"),
  achievements: text("achievements").array().default([]).notNull(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: json("content").notNull(),
  creator: integer("creator").notNull(),
  tags: text("tags").array().notNull(),
  isAIGenerated: boolean("is_ai_generated").notNull().default(false),
  youtubeUrl: text("youtube_url"),
  youtubeType: text("youtube_type"), // 'video' | 'playlist'
  attachments: text("attachments").array(),
  modules: json("modules").$type<{
    title: string;
    description: string;
    content: string;
    youtubeUrl?: string;
    attachments?: string[];
  }[]>().notNull().default([]),
  enrollment: integer("enrollment").notNull().default(0),
  rating: integer("rating").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  progress: integer("progress").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
  lastAccessed: timestamp("last_accessed").notNull().defaultNow(),
  moduleProgress: json("module_progress").$type<{
    moduleId: number;
    completed: boolean;
  }[]>().notNull().default([]),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  type: text("type").notNull(), // 'discussion' | 'meme' | 'blog'
  tags: text("tags").array().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  attachments: text("attachments").array(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull(),
  userId: integer("user_id").notNull(),
  content: text("content").notNull(),
  parentId: integer("parent_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  upvotes: integer("upvotes").notNull().default(0),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  description: true,
  content: true,
  creator: true,
  tags: true,
  isAIGenerated: true,
  youtubeUrl: true,
  youtubeType: true,
  attachments: true,
  modules: true,
});

export const insertProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  courseId: true,
  progress: true,
  completed: true,
  moduleProgress: true,
});

export const insertPostSchema = createInsertSchema(posts).pick({
  userId: true,
  title: true,
  content: true,
  type: true,
  tags: true,
  attachments: true,
});

export const insertCommentSchema = createInsertSchema(comments).pick({
  postId: true,
  userId: true,
  content: true,
  parentId: true,
});

// Types
export type User = typeof users.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Comment = typeof comments.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type InsertComment = z.infer<typeof insertCommentSchema>;