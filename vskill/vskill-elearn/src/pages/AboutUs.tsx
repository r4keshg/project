import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sparkles, Users, Award, BookOpen, Pencil, MessageSquare, ChevronDown, Globe, Linkedin, Github } from "lucide-react";

export default function AboutUs() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    { question: "What is VSkill Arena?", answer: "VSkill Arena is an AI-powered e-learning platform that makes learning interactive, personalized, and community-driven." },
    { question: "How does AI Course Generation work?", answer: "You can input course details, and our AI generates structured learning materials, including quizzes, documentation, and embedded YouTube videos." },
    { question: "How can I earn rewards?", answer: "Users earn coins and ranks by completing courses, maintaining streaks, and engaging with the community." }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <motion.section
        className="min-h-screen flex flex-col justify-center items-center text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-4">About VSkill Arena</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl">
          An AI-powered e-learning platform designed to make learning interactive, personalized, and community-driven.
        </p>
      </motion.section>

      {/* Existing Sections */}
      <motion.section
        className="min-h-screen flex flex-col justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          VSkill Arena aims to revolutionize online learning by combining AI-generated content with community-driven knowledge sharing.
        </p>
      </motion.section>
      
      {/* Platform Features Section */}
      <motion.section
        className="min-h-screen flex flex-col justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <Sparkles className="h-6 w-6 text-primary mr-3" />, title: "AI Course Generation", description: "Create structured courses with AI assistance." },
            { icon: <Brain className="h-6 w-6 text-primary mr-3" />, title: "Odyssey Dashboard", description: "Track progress, earn rewards, and manage your learning." },
            { icon: <Users className="h-6 w-6 text-primary mr-3" />, title: "Tribe Community", description: "Engage in discussions and knowledge sharing." },
            { icon: <Award className="h-6 w-6 text-primary mr-3" />, title: "Gamified Learning", description: "Earn coins, climb ranks, and stay motivated." },
            { icon: <Pencil className="h-6 w-6 text-primary mr-3" />, title: "Course Customization", description: "Fully customize learning materials and resources." }
          ].map((feature, index) => (
            <Card key={index}>
              <CardHeader className="pb-2 flex items-center">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>
      
      {/* FAQ Section */}
      <motion.section className="min-h-screen flex flex-col justify-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full flex justify-between items-center text-lg font-semibold"
              >
                {faq.question} <ChevronDown className={`h-5 w-5 transition-transform ${openFAQ === index ? "rotate-180" : "rotate-0"}`} />
              </button>
              {openFAQ === index && <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Meet Our Team */}
      <motion.section className="min-h-screen flex flex-col justify-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Alice Johnson", "Bob Smith", "Charlie Lee"].map((name, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-col items-center pb-2">
                <img src={`https://via.placeholder.com/100`} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
                <CardTitle>{name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">“Passionate about making learning engaging and accessible.”</p>
                <div className="flex mt-4 space-x-3">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer"><Github className="h-6 w-6 text-gray-600 dark:text-gray-300" /></a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin className="h-6 w-6 text-gray-600 dark:text-gray-300" /></a>
                  <a href="https://example.com" target="_blank" rel="noopener noreferrer"><Globe className="h-6 w-6 text-gray-600 dark:text-gray-300" /></a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
