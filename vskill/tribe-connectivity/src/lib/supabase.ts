
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fsiipvxohbnxetnwesrh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzaWlwdnhvaGJueGV0bndlc3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNjE0NzAsImV4cCI6MjA1NzkzNzQ3MH0.1l9P5826ope18LKzzCv-9YM1wxT1ic1Lz2c3xH7GAB4';

// Flag to check if Supabase is properly configured
export const isSupabaseConfigured = true; // We now have configured Supabase

// Create client using our project values
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// User types
export type UserProfile = {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  last_active: string;
  streak_days: number;
  coins: number;
  rank: string;
  completed_courses: number;
  created_blogs: number;
  is_clan_admin: boolean;
};

// Activity type
export type UserActivity = {
  id: string;
  user_id: string;
  activity_type: 'login' | 'course_completion' | 'blog_creation' | 'clan_creation' | 'post_creation';
  activity_date: string;
  activity_data?: Record<string, any>;
};

// Add sample course data for initial display
export const sampleCourses = [
  {
    id: "sample-course-1",
    title: "Introduction to React",
    description: "Learn the fundamentals of React, including components, state, props, and hooks.",
    instructor: {
      id: "instructor-1",
      name: "Dr.Vasigaran"
    },
    coverImage: "/placeholder.svg",
    rating: 4.8,
    studentsCount: 342,
    duration: "5 hours",
    level: "Beginner",
    category: "Web Development",
    tags: ["React", "JavaScript", "Frontend"],
    isFeatured: true,
    isNew: true,
    modules: [
      {
        id: "module-1-1",
        title: "Getting Started with React",
        type: "video",
        content: "https://www.youtube.com/embed/SqcY0GlETPk",
        duration: "45 min",
        isCompleted: false
      },
      {
        id: "module-1-2",
        title: "Components and Props",
        type: "text",
        content: "React components are the building blocks of React applications. They allow you to split the UI into independent, reusable pieces. Components accept inputs called props and return React elements describing what should appear on the screen.",
        duration: "30 min",
        isCompleted: false
      },
      {
        id: "module-1-3",
        title: "State and Lifecycle",
        type: "video",
        content: "https://www.youtube.com/embed/4pO-HcG2igk",
        duration: "50 min",
        isCompleted: false
      }
    ]
  },
  {
    id: "sample-course-2",
    title: "Data Science Fundamentals",
    description: "A comprehensive introduction to data science, covering statistics, data visualization, and machine learning basics.",
    instructor: {
      id: "instructor-2",
      name: "Sarah Chen"
    },
    coverImage: "/placeholder.svg",
    rating: 4.6,
    studentsCount: 215,
    duration: "8 hours",
    level: "Intermediate",
    category: "Data Science",
    tags: ["Python", "Statistics", "Machine Learning"],
    isFeatured: false,
    isNew: true,
    modules: [
      {
        id: "module-2-1",
        title: "Introduction to Data Analysis",
        type: "text",
        content: "Data analysis is the process of inspecting, cleansing, transforming, and modeling data with the goal of discovering useful information, informing conclusions, and supporting decision-making.",
        duration: "40 min",
        isCompleted: false
      },
      {
        id: "module-2-2",
        title: "Statistical Methods",
        type: "video",
        content: "https://www.youtube.com/embed/VPZD_aij8H0",
        duration: "60 min",
        isCompleted: false
      },
      {
        id: "module-2-3",
        title: "Introduction to Machine Learning",
        type: "text",
        content: "Machine learning is a subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed.",
        duration: "45 min",
        isCompleted: false
      }
    ]
  }
];
