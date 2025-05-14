import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/nav/sidebar";
import { RankDisplay } from "@/components/dashboard/rank-display";
import { ActivityCalendar } from "@/components/dashboard/activity-calendar";
import { CourseList } from "@/components/dashboard/course-list";
import { Card } from "@/components/ui/card";
import { Course, UserProgress } from "@shared/schema";
import { Loader2, Trophy, Flame, Coins, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function OdysseyPage() {
  const { user } = useAuth();

  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const { data: progress, isLoading: progressLoading } = useQuery<UserProgress[]>({
    queryKey: ["/api/progress"],
  });

  const { data: activityDates } = useQuery<Date[]>({
    queryKey: ["/api/user/activity"],
  });

  if (coursesLoading || progressLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const progressMap = progress?.reduce((acc, curr) => {
    acc[curr.courseId] = curr;
    return acc;
  }, {} as Record<number, UserProgress>);

  const enrolledCourses = courses?.filter(
    (course) => progressMap?.[course.id]
  ) || [];

  const pendingCourses = courses?.filter(
    (course) => !progressMap?.[course.id]
  ) || [];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto py-8 space-y-8">
          <h1 className="text-3xl font-bold">Welcome back, {user?.username}!</h1>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rank</p>
                <p className="font-semibold">{user?.rank}</p>
              </div>
            </Card>

            <Card className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Flame className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="font-semibold">{user?.streak} days</p>
              </div>
            </Card>

            <Card className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Coins className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Coins</p>
                <p className="font-semibold">{user?.coins}</p>
              </div>
            </Card>

            <Card className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Award className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="font-semibold">{user?.achievements?.length || 0}</p>
              </div>
            </Card>
          </div>

          {/* Activity Calendar */}
          {activityDates && <ActivityCalendar activityDates={activityDates} />}

          {/* Course Lists */}
          <div className="space-y-8">
            {enrolledCourses.length > 0 && (
              <CourseList
                title="Continue Learning"
                courses={enrolledCourses}
                progress={progressMap}
              />
            )}

            {pendingCourses.length > 0 && (
              <CourseList
                title="Discover New Courses"
                courses={pendingCourses.slice(0, 3)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}