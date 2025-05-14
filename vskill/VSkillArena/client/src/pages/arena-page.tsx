import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Sidebar } from "@/components/nav/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Wand2, Plus, Search, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Course } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function ArenaPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseTags, setCourseTags] = useState<string[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeType, setYoutubeType] = useState<"video" | "playlist">("video");
  const [attachments, setAttachments] = useState<string[]>([]);

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const createCourseMutation = useMutation({
    mutationFn: async (isAI: boolean) => {
      const res = await apiRequest("POST", "/api/courses", {
        title: courseTitle,
        description: courseDescription,
        tags: courseTags,
        content: {},
        isAIGenerated: isAI,
        youtubeUrl,
        youtubeType,
        attachments,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setShowCreate(false);
      toast({
        title: "Course created successfully",
        description: "Your new course is now available in the Arena",
      });
    },
  });

  const generateAICourseMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/courses/generate", {
        prompt: aiPrompt,
      });
      return await res.json();
    },
    onSuccess: (course) => {
      setCourseTitle(course.title);
      setCourseDescription(course.description);
      setCourseTags(course.tags);
      toast({
        title: "Course generated successfully",
        description: "Review and customize the generated course content",
      });
    },
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const { urls } = await res.json();
      setAttachments([...attachments, ...urls]);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredCourses = courses?.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto py-8 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Arena</h1>
            <Button onClick={() => setShowCreate(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses by title or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {showCreate && (
            <Card className="p-6 space-y-6">
              <h2 className="text-xl font-semibold">Create New Course</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">AI Course Generation</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Describe the course you want to create..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                    />
                    <Button
                      onClick={() => generateAICourseMutation.mutate()}
                      disabled={generateAICourseMutation.isPending}
                    >
                      {generateAICourseMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Input
                    placeholder="Course Title"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Course Description"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                  />
                  <Input
                    placeholder="Add tags (comma separated)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        setCourseTags([...courseTags, e.currentTarget.value]);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {courseTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => setCourseTags(courseTags.filter((t) => t !== tag))}
                      >
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium mb-2">Course Content</h3>

                  {/* YouTube Integration */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Select
                        value={youtubeType}
                        onValueChange={(value: "video" | "playlist") => setYoutubeType(value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="YouTube content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Single Video</SelectItem>
                          <SelectItem value="playlist">Playlist</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex-1">
                        <Input
                          placeholder="YouTube URL"
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    {youtubeUrl && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Youtube className="h-4 w-4" />
                        <span>YouTube {youtubeType} added</span>
                      </div>
                    )}
                  </div>

                  {/* File Attachments */}
                  <div className="mt-4">
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="mb-2"
                    />
                    {attachments.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Attached Files:</p>
                        <div className="flex flex-wrap gap-2">
                          {attachments.map((url, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                            >
                              {url.split("/").pop()} ×
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowCreate(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => createCourseMutation.mutate(false)}
                    disabled={createCourseMutation.isPending}
                  >
                    Create Course
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses?.map((course) => (
                <Card key={course.id} className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}