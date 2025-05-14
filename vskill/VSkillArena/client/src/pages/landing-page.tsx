import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, BookOpen, Trophy, Users, Sparkles, Brain, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  const { toast } = useToast();
  const [demoPrompt, setDemoPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<{
    title: string;
    description: string;
    modules: { title: string; description: string }[];
  } | null>(null);

  const generateDemoCourse = async () => {
    setIsGenerating(true);
    try {
      // In a real implementation, this would call the AI service
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGeneratedCourse({
        title: "Introduction to AI",
        description: "Learn the fundamentals of Artificial Intelligence",
        modules: [
          { title: "What is AI?", description: "Understanding the basics" },
          { title: "Machine Learning", description: "Core concepts and applications" },
          { title: "Neural Networks", description: "Building blocks of deep learning" },
        ]
      });
      toast({
        title: "Course Generated",
        description: "Sign up to create and share real courses!",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Learn, Create, Conquer
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join a community of warriors in their quest for knowledge. Create courses,
              share insights, and level up your skills in our gamified learning platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/auth">
                <Button size="lg">
                  Join the Arena
                  <Trophy className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Embark on Your Learning Journey
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-y-8 gap-x-6 lg:grid-cols-3">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Arena</h3>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Create and explore courses enriched with AI-generated content, videos,
                  and interactive materials.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Odyssey</h3>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Track your progress, earn badges, and maintain your learning streak in
                  your personalized dashboard.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Tribe</h3>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Connect with fellow learners, share knowledge through blogs, and
                  participate in discussions.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Course Generator */}
      <div className="py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Try Our AI Course Generator
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Experience the power of AI-assisted course creation. Enter a topic and let
              our AI create a course structure for you.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl">
            <Card className="p-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter a topic (e.g., 'Introduction to AI')"
                  value={demoPrompt}
                  onChange={(e) => setDemoPrompt(e.target.value)}
                />
                <Button
                  onClick={generateDemoCourse}
                  disabled={isGenerating || !demoPrompt}
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {generatedCourse && (
                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="font-semibold">{generatedCourse.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {generatedCourse.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {generatedCourse.modules.map((module, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-muted/50 space-y-1"
                      >
                        <h4 className="font-medium">{module.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {module.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 text-center">
                    <Link href="/auth">
                      <Button>
                        Sign Up to Create Real Courses
                        <Target className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
