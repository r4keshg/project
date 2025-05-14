import React, { useState } from "react";
import { BookOpen, Brain, Users, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Full-Screen Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-14 lg:px-8 min-h-screen">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Learn, Create, Conquer
          </h1>
          <p className="mt-6 text-lg sm:text-xl max-w-xl mx-auto text-gray-600 dark:text-gray-300">
            Join a community of warriors in a gamified learning platform. 
            Create courses, share insights, and level up your skills in our interactive Arena.
          </p>
          <div className="mt-10">
            {/* “Get Started” goes to /auth or wherever your signup/login is */}
            <a 
              href="/auth" 
              className="inline-block px-6 py-3 text-lg font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10 sm:text-4xl">
            Embark on Your Learning Journey
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Arena */}
            <div className="p-6 rounded-lg border shadow-sm bg-white dark:bg-gray-900/50">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-200" />
                </div>
                <h3 className="font-semibold text-xl">Arena</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                AI-generated courses, embedded videos, and customizable modules
                to power your learning experience.
              </p>
            </div>

            {/* Odyssey */}
            <div className="p-6 rounded-lg border shadow-sm bg-white dark:bg-gray-900/50">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                  <Brain className="h-6 w-6 text-blue-600 dark:text-blue-200" />
                </div>
                <h3 className="font-semibold text-xl">Odyssey</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Track your progress, earn badges, and maintain your learning streak
                through a personalized dashboard.
              </p>
            </div>

            {/* Tribe */}
            <div className="p-6 rounded-lg border shadow-sm bg-white dark:bg-gray-900/50">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-200" />
                </div>
                <h3 className="font-semibold text-xl">Tribe</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Connect with fellow learners, share knowledge through blogs, 
                and participate in engaging discussions.
              </p>
            </div>
          </div>
          {/* Second “Get Started” Button if desired */}
          <div className="flex justify-center mt-10">
            <a 
              href="/auth" 
              className="inline-block px-6 py-3 text-lg font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Full-Screen Get Started Section */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-primary/10 to-primary/5 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Join thousands of learners and start mastering new skills today with our AI-powered platform.
        </p>
        <a 
          href="/auth" 
          className="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Get Started for Free
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </section>
    </div>
  );
}
