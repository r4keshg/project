import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Course, UserProgress } from "@shared/schema";
import { PlayCircle, CheckCircle } from "lucide-react";
import { Link } from "wouter";

interface CourseListProps {
  courses: Course[];
  progress?: Record<number, UserProgress>;
  title: string;
}

export function CourseList({ courses, progress, title }: CourseListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const courseProgress = progress?.[course.id];
          return (
            <Card key={course.id} className="overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold truncate">{course.title}</h3>
                  {courseProgress?.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <PlayCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {courseProgress && (
                  <Progress
                    value={courseProgress.progress}
                    className="mt-4"
                  />
                )}
                <Link href={`/arena/course/${course.id}`}>
                  <Button className="mt-4 w-full">
                    {courseProgress ? "Continue Learning" : "Start Course"}
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
