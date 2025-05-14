import { 
  User, InsertUser, Course, InsertCourse, 
  UserProgress, InsertProgress, Post, InsertPost,
  Comment, InsertComment,
  users, courses, userProgress, posts, comments 
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<User>): Promise<User>;

  // Course operations
  createCourse(course: InsertCourse): Promise<Course>;
  getCourse(id: number): Promise<Course | undefined>;
  listCourses(): Promise<Course[]>;
  listUserCourses(userId: number): Promise<Course[]>;
  updateCourseProgress(courseId: number, userId: number, moduleId: number): Promise<UserProgress>;

  // Progress operations
  createProgress(progress: InsertProgress): Promise<UserProgress>;
  getProgress(userId: number, courseId: number): Promise<UserProgress | undefined>;
  updateProgress(id: number, data: Partial<UserProgress>): Promise<UserProgress>;

  // Community operations
  createPost(post: InsertPost): Promise<Post>;
  getPosts(type?: string): Promise<Post[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  getComments(postId: number): Promise<Comment[]>;
  upvoteComment(commentId: number): Promise<Comment>;

  sessionStore: ReturnType<typeof PostgresSessionStore>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: ReturnType<typeof PostgresSessionStore>;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db
      .insert(courses)
      .values({
        ...course,
        enrollment: 0,
        rating: 0,
        createdAt: new Date(),
      })
      .returning();
    return newCourse;
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async listCourses(): Promise<Course[]> {
    return await db.select().from(courses).orderBy(desc(courses.createdAt));
  }

  async listUserCourses(userId: number): Promise<Course[]> {
    const userProgress = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));

    const enrolledCourseIds = userProgress.map((p) => p.courseId);
    const createdCourses = await db
      .select()
      .from(courses)
      .where(eq(courses.creator, userId));

    const enrolledCourses = enrolledCourseIds.length
      ? await db
          .select()
          .from(courses)
          .where(eq(courses.id, enrolledCourseIds[0]))
      : [];

    return [...createdCourses, ...enrolledCourses];
  }

  async updateCourseProgress(
    courseId: number,
    userId: number,
    moduleId: number
  ): Promise<UserProgress> {
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.courseId, courseId),
          eq(userProgress.userId, userId)
        )
      );

    if (!progress) {
      return this.createProgress({
        userId,
        courseId,
        progress: 0,
        completed: false,
        moduleProgress: [{ moduleId, completed: true }],
      });
    }

    const updatedModuleProgress = [
      ...(progress.moduleProgress || []).filter((p) => p.moduleId !== moduleId),
      { moduleId, completed: true },
    ];

    const [updatedProgress] = await db
      .update(userProgress)
      .set({
        moduleProgress: updatedModuleProgress,
        lastAccessed: new Date(),
      })
      .where(eq(userProgress.id, progress.id))
      .returning();

    return updatedProgress;
  }

  async createProgress(progress: InsertProgress): Promise<UserProgress> {
    const [newProgress] = await db.insert(userProgress).values(progress).returning();
    return newProgress;
  }

  async getProgress(userId: number, courseId: number): Promise<UserProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.courseId, courseId)
        )
      );
    return progress;
  }

  async updateProgress(id: number, data: Partial<UserProgress>): Promise<UserProgress> {
    const [progress] = await db
      .update(userProgress)
      .set(data)
      .where(eq(userProgress.id, id))
      .returning();
    return progress;
  }

  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  }

  async getPosts(type?: string): Promise<Post[]> {
    if (type) {
      return await db.select().from(posts).where(eq(posts.type, type));
    }
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const [newComment] = await db.insert(comments).values(comment).returning();
    return newComment;
  }

  async getComments(postId: number): Promise<Comment[]> {
    return await db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(desc(comments.createdAt));
  }

  async upvoteComment(commentId: number): Promise<Comment> {
    const [comment] = await db
      .update(comments)
      .set({
        upvotes: db
          .select()
          .from(comments)
          .where(eq(comments.id, commentId))
          .then((c) => (c[0]?.upvotes || 0) + 1),
      })
      .where(eq(comments.id, commentId))
      .returning();
    return comment;
  }
}

export const storage = new DatabaseStorage();