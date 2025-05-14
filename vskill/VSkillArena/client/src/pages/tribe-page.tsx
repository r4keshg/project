import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Sidebar } from "@/components/nav/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { Post, Comment } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MessageSquare, ThumbsUp, Image, Send } from "lucide-react";

export default function TribePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [postType, setPostType] = useState<string>("discussion");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    tags: [] as string[],
  });
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");

  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const { data: comments, isLoading: commentsLoading } = useQuery<Comment[]>({
    queryKey: ["/api/posts", selectedPost, "comments"],
    enabled: selectedPost !== null,
  });

  const createPostMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/posts", {
        ...newPost,
        type: postType,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      setNewPost({ title: "", content: "", tags: [] });
      toast({
        title: "Post created successfully",
        description: "Your post is now visible to the community",
      });
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/posts/${selectedPost}/comments`, {
        content: newComment,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts", selectedPost, "comments"] });
      setNewComment("");
    },
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto py-8 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Tribe</h1>
            <Select value={postType} onValueChange={setPostType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Post type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discussion">Discussion</SelectItem>
                <SelectItem value="meme">Meme</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="p-6 space-y-4">
            <Input
              placeholder="Post title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              placeholder="Write your post..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
            <Input
              placeholder="Add tags (comma separated)"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value) {
                  setNewPost({
                    ...newPost,
                    tags: [...newPost.tags, e.currentTarget.value],
                  });
                  e.currentTarget.value = "";
                }
              }}
            />
            <div className="flex flex-wrap gap-2">
              {newPost.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() =>
                    setNewPost({
                      ...newPost,
                      tags: newPost.tags.filter((t) => t !== tag),
                    })
                  }
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
            <Button
              className="w-full"
              onClick={() => createPostMutation.mutate()}
              disabled={createPostMutation.isPending}
            >
              {createPostMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create Post"
              )}
            </Button>
          </Card>

          {postsLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-6">
              {posts?.map((post) => (
                <Card key={post.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Posted by {post.userId === user?.id ? "you" : "anonymous"}
                      </p>
                    </div>
                    <Badge>{post.type}</Badge>
                  </div>
                  <p className="mt-4">{post.content}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Like
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPost(post.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Comment
                    </Button>
                  </div>

                  {selectedPost === post.id && (
                    <div className="mt-4 space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Write a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button
                          onClick={() => createCommentMutation.mutate()}
                          disabled={createCommentMutation.isPending}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>

                      {commentsLoading ? (
                        <div className="flex justify-center">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {comments?.map((comment) => (
                            <div
                              key={comment.id}
                              className="bg-muted p-3 rounded-lg"
                            >
                              <p className="text-sm text-muted-foreground">
                                {comment.userId === user?.id
                                  ? "You"
                                  : "Anonymous"}{" "}
                                commented:
                              </p>
                              <p>{comment.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
