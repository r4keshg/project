import { useState } from "react";
import { Course, UserProgress } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Play, FileText, Youtube } from "lucide-react";

interface CourseViewerProps {
  course: Course;
  progress?: UserProgress;
  onModuleComplete?: (moduleId: number) => void;
}

export function CourseViewer({ course, progress, onModuleComplete }: CourseViewerProps) {
  const [activeModule, setActiveModule] = useState(0);

  const currentModule = course.modules[activeModule];
  const moduleProgress = progress?.moduleProgress || [];
  const getModuleProgress = (index: number) => 
    moduleProgress.find(p => p.moduleId === index)?.completed || false;

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Module List */}
      <Card className="p-4 lg:col-span-1">
        <h3 className="font-semibold mb-4">Course Modules</h3>
        <ScrollArea className="h-[calc(100vh-20rem)]">
          <div className="space-y-2">
            {course.modules.map((module, index) => (
              <Button
                key={index}
                variant={activeModule === index ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveModule(index)}
              >
                <ChevronRight className="mr-2 h-4 w-4" />
                <div className="text-left">
                  <p className="font-medium">{module.title}</p>
                  {getModuleProgress(index) && (
                    <Badge variant="secondary" className="mt-1 bg-green-500/10 text-green-500">Completed</Badge>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Module Content */}
      <Card className="p-6 lg:col-span-3">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{currentModule.title}</h2>
            <p className="text-muted-foreground">{currentModule.description}</p>
          </div>

          <Tabs defaultValue="content">
            <TabsList>
              <TabsTrigger value="content">
                <FileText className="mr-2 h-4 w-4" />
                Content
              </TabsTrigger>
              {currentModule.youtubeUrl && (
                <TabsTrigger value="video">
                  <Youtube className="mr-2 h-4 w-4" />
                  Video
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="content" className="mt-4">
              <div className="prose dark:prose-invert max-w-none">
                {currentModule.content}
              </div>
            </TabsContent>

            <TabsContent value="video" className="mt-4">
              {currentModule.youtubeUrl && (
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={currentModule.youtubeUrl.replace("watch?v=", "embed/")}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>

          {currentModule.attachments && currentModule.attachments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Attachments</h3>
              <div className="grid gap-2">
                {currentModule.attachments.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-2 rounded-lg hover:bg-accent"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {url.split("/").pop()}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setActiveModule(Math.max(0, activeModule - 1))}
              disabled={activeModule === 0}
            >
              Previous Module
            </Button>
            <Button
              onClick={() => {
                onModuleComplete?.(activeModule);
                if (activeModule < course.modules.length - 1) {
                  setActiveModule(activeModule + 1);
                }
              }}
            >
              {activeModule === course.modules.length - 1 ? (
                "Complete Course"
              ) : (
                <>
                  Next Module
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}