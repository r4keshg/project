import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Compass, Sparkles, Award, Play, FileText, CheckCircle, Plus, X } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import CourseForm from "@/components/CourseForm";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { triggerCourseCompletionConfetti } from "@/utils/confetti";
import { 
  getAllCourses, 
  getCourseById, 
  markModuleCompleted, 
  isModuleCompleted,
  getModuleComments,
  addModuleComment
} from "@/utils/supabaseUtils";
import { sampleCourses } from "@/lib/supabase";

// Define the course item type
type CourseItem = {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
  };
  coverImage: string;
  rating: number;
  studentsCount: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  category: string;
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  modules: {
    id: string;
    title: string;
    type: "video" | "text" | "quiz";
    content: string;
    duration: string;
    isCompleted: boolean;
  }[];
};

const ArenaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const { user, profile, isSupabaseReady } = useAuth();
  
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        
        // Sample courses for initial display if no courses in database yet
        const initialCourses: CourseItem[] = [
          {
            id: "sample-course-1",
            title: "Introduction to React",
            description: "Learn the fundamentals of React, including components, state, props, and hooks.",
            instructor: {
              id: "instructor-1",
              name: "Dr. Vasigaran"
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
            level: "Intermediate" as "Beginner" | "Intermediate" | "Advanced" | "All Levels",
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
        
        // Load courses from Supabase
        if (isSupabaseReady) {
          const dbCourses = await getAllCourses();
          
          // Update module completion status if logged in
          if (user) {
            const updatedDbCourses = await Promise.all(
              dbCourses.map(async (course) => {
                const updatedModules = await Promise.all(
                  course.modules.map(async (module) => {
                    const completed = await isModuleCompleted(module.id, user.id);
                    return { ...module, isCompleted: completed };
                  })
                );
                return { ...course, modules: updatedModules };
              })
            );
            
            // Combine sample and database courses
            setCourses([...initialCourses, ...updatedDbCourses]);
          } else {
            // Not logged in, just display courses without completion status
            setCourses([...initialCourses, ...dbCourses]);
          }
        } else {
          // If Supabase is not configured, just show sample courses
          setCourses(initialCourses);
        }
      } catch (error) {
        console.error("Error loading courses:", error);
        toast({
          title: "Error",
          description: "Failed to load courses. Please try again later.",
          variant: "destructive",
        });
        // Fall back to sample courses on error
        setCourses(sampleCourses as CourseItem[]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCourses();
  }, [isSupabaseReady, user]);
  
  // Handle course selection
  const handleCourseSelect = async (courseId: string) => {
    try {
      setIsLoading(true);
      
      // Check if it's a sample course first
      const sampleCourse = courses.find(c => c.id === courseId);
      
      if (sampleCourse) {
        setSelectedCourse(sampleCourse);
        setSelectedModuleIndex(0);
      } else if (isSupabaseReady) {
        // Load from Supabase if not a sample course
        const course = await getCourseById(courseId);
        
        // If you want to update module completion status if logged in, uncomment below:
        /*
        if (user) {
          const updatedModules = await Promise.all(
            course.modules.map(async (module) => {
              const completed = await isModuleCompleted(module.id, user.id);
              return { ...module, isCompleted: completed };
            })
          );
          setSelectedCourse({ ...course, modules: updatedModules });
        } else {
          setSelectedCourse(course);
        }
        */
        setSelectedModuleIndex(0);
      }
      
      // Load comments for the first module if there are modules
      if (sampleCourse?.modules?.length > 0) {
        loadModuleComments(sampleCourse.modules[0].id);
      }
      
      setActiveTab("course");
    } catch (error) {
      console.error("Error selecting course:", error);
      toast({
        title: "Error",
        description: "Failed to load course details. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load comments for a module
  const loadModuleComments = async (moduleId: string) => {
    if (!isSupabaseReady) return;
    
    try {
      const moduleComments = await getModuleComments(moduleId);
      setComments(moduleComments);
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };
  
  // Handle module selection
  const handleModuleSelect = (index: number) => {
    setSelectedModuleIndex(index);
    
    if (selectedCourse?.modules[index]) {
      loadModuleComments(selectedCourse.modules[index].id);
    }
  };
  
  // Handle module completion
  const handleCompleteModule = async () => {
    if (!user || !selectedCourse) return;
    
    const moduleId = selectedCourse.modules[selectedModuleIndex].id;
    
    try {
      const success = await markModuleCompleted(moduleId, user.id);
      
      if (success) {
        // Update the UI to show module as completed
        const updatedModules = [...selectedCourse.modules];
        updatedModules[selectedModuleIndex] = {
          ...updatedModules[selectedModuleIndex],
          isCompleted: true
        };
        
        setSelectedCourse({
          ...selectedCourse,
          modules: updatedModules
        });
        
        // Check if all modules are completed
        const allCompleted = updatedModules.every(module => module.isCompleted);
        
        if (allCompleted) {
          triggerCourseCompletionConfetti();
          toast({
            title: "Course Completed!",
            description: "Congratulations on completing this course!",
          });
        } else {
          toast({
            title: "Module Completed",
            description: "Great job! Keep going to complete the course.",
          });
        }
      }
    } catch (error) {
      console.error("Error completing module:", error);
      toast({
        title: "Error",
        description: "Failed to mark module as completed. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !selectedCourse || !newComment.trim()) return;
    
    const moduleId = selectedCourse.modules[selectedModuleIndex].id;
    
    try {
      const comment = await addModuleComment(moduleId, user.id, newComment);
      setComments([comment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Format YouTube URL for embedding
  const formatYouTubeUrl = (url: string) => {
    if (!url) return "";
    
    // Check if already an embed URL
    if (url.includes('embed')) return url;
    
    // Handle various YouTube URL formats
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Compass className="mr-2 h-8 w-8" /> Arena
      </h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-8">
          <TabsTrigger value="discover" className="text-lg">Discover</TabsTrigger>
          {selectedCourse && (
            <TabsTrigger value="course" className="text-lg">Current Course</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="discover" className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Available Courses</h2>
            {user && (
              <Button
                onClick={() => setIsCreateOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus size={16} /> Create Course
              </Button>
            )}
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <AspectRatio ratio={16 / 9} className="bg-muted" />
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src={course.coverImage} 
                      alt={course.title} 
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      {course.isNew && (
                        <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
                      )}
                    </div>
                    <CardDescription>
                      By {course.instructor.name} • {course.modules.length} modules
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                      {course.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {course.duration} • {course.level}
                    </div>
                    <Button onClick={() => handleCourseSelect(course.id)}>
                      View Course
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="course">
          {selectedCourse && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{selectedCourse.title}</CardTitle>
                    <CardDescription>
                      By {selectedCourse.instructor.name} • {selectedCourse.level}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedCourse.modules[selectedModuleIndex].type === 'video' && (
                        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                          <iframe 
                            src={formatYouTubeUrl(selectedCourse.modules[selectedModuleIndex].content)}
                            className="absolute top-0 left-0 w-full h-full"
                            allowFullScreen
                            title={selectedCourse.modules[selectedModuleIndex].title}
                          ></iframe>
                        </div>
                      )}
                      
                      {selectedCourse.modules[selectedModuleIndex].type === 'text' && (
                        <div className="prose dark:prose-invert max-w-none">
                          <p>{selectedCourse.modules[selectedModuleIndex].content}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-6">
                        <div>
                          <h3 className="text-lg font-medium">
                            {selectedCourse.modules[selectedModuleIndex].title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {selectedCourse.modules[selectedModuleIndex].duration}
                          </p>
                        </div>
                        
                        {user && (
                          <Button
                            onClick={handleCompleteModule}
                            disabled={selectedCourse.modules[selectedModuleIndex].isCompleted}
                            className={selectedCourse.modules[selectedModuleIndex].isCompleted ? "bg-green-600 hover:bg-green-700" : ""}
                          >
                            {selectedCourse.modules[selectedModuleIndex].isCompleted ? (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" /> Completed
                              </>
                            ) : (
                              "Mark as Completed"
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Comments section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Discussion</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {user ? (
                      <form onSubmit={handleCommentSubmit} className="space-y-2">
                        <Textarea
                          placeholder="Share your thoughts or questions..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-24"
                        />
                        <div className="flex justify-end">
                          <Button type="submit" disabled={!newComment.trim()}>
                            Post Comment
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <p>Please sign in to join the discussion</p>
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={() => {
                            // Open auth dialog
                            document.dispatchEvent(new Event('open-auth-dialog'));
                          }}
                        >
                          Sign In
                        </Button>
                      </div>
                    )}
                    
                    <div className="space-y-4 mt-6">
                      {comments.length > 0 ? (
                        comments.map((comment) => (
                          <div key={comment.id} className="border-b pb-4 last:border-0">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                                {comment.user.avatar ? (
                                  <img
                                    src={comment.user.avatar}
                                    alt={comment.user.name}
                                    className="h-8 w-8 rounded-full"
                                  />
                                ) : (
                                  <span className="text-sm font-semibold">
                                    {comment.user.name.charAt(0).toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{comment.user.name}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(comment.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm ml-10">{comment.content}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-500 italic">
                          No comments yet. Be the first to share your thoughts!
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Course Modules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedCourse.modules.map((module, index) => (
                        <div
                          key={module.id}
                          className={`p-3 rounded-lg cursor-pointer flex items-start gap-3 ${
                            selectedModuleIndex === index
                              ? "bg-primary/10 border border-primary/20"
                              : "hover:bg-muted"
                          } ${module.isCompleted ? "border-l-4 border-l-green-500" : ""}`}
                          onClick={() => handleModuleSelect(index)}
                        >
                          {module.type === "video" ? (
                            <Play className="h-5 w-5 mt-0.5 flex-shrink-0" />
                          ) : (
                            <FileText className="h-5 w-5 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <h3 className="font-medium">{module.title}</h3>
                            <p className="text-xs text-gray-500">{module.duration}</p>
                          </div>
                          {module.isCompleted && (
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">About the Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold">
                          {selectedCourse.instructor.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedCourse.instructor.name}</h3>
                        <p className="text-sm text-gray-500">Course Creator</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Expert instructor with extensive experience in {selectedCourse.category}.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Course Creation Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create a New Course</DialogTitle>
          </DialogHeader>
          
          <CourseForm 
           /* onSubmit={(courseData) => {
              setIsCreateOpen(false);
              
              // Show notification that course is being created
              toast({
                title: "Creating Course",
                description: "Your course is being created...",
              });
              
              // Load courses again to show the new course
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }}*/
          /> 
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArenaPage;
