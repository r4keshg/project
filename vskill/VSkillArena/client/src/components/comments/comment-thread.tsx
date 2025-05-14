import { useState } from "react";
import { Comment, User } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Reply } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { formatDistanceToNow } from "date-fns";

interface CommentThreadProps {
  comments: Comment[];
  onAddComment: (content: string, parentId?: number) => void;
  onUpvote: (commentId: number) => void;
}

interface CommentItemProps {
  comment: Comment;
  replies: Comment[];
  level?: number;
  onReply: (content: string, parentId: number) => void;
  onUpvote: (commentId: number) => void;
}

function CommentItem({
  comment,
  replies,
  level = 0,
  onReply,
  onUpvote,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const { user } = useAuth();

  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      onReply(replyContent, comment.id);
      setReplyContent("");
      setIsReplying(false);
    }
  };

  return (
    <div
      className="space-y-4"
      style={{ marginLeft: level > 0 ? `${level * 2}rem` : 0 }}
    >
      <div className="flex gap-4">
        <Avatar className="h-8 w-8">
          <div className="flex h-full w-full items-center justify-center bg-muted">
            {comment.userId === user?.id ? "You" : "A"}
          </div>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {comment.userId === user?.id ? "You" : "Anonymous"}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p className="text-sm">{comment.content}</p>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={() => onUpvote(comment.id)}
            >
              <ThumbsUp className="h-4 w-4" />
              {comment.upvotes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={() => setIsReplying(!isReplying)}
            >
              <Reply className="h-4 w-4" />
              Reply
            </Button>
          </div>
        </div>
      </div>

      {isReplying && (
        <div className="ml-12 space-y-2">
          <Textarea
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsReplying(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleSubmitReply}>
              Reply
            </Button>
          </div>
        </div>
      )}

      {replies.length > 0 && (
        <div className="space-y-4">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              replies={[]}
              level={level + 1}
              onReply={onReply}
              onUpvote={onUpvote}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentThread({
  comments,
  onAddComment,
  onUpvote,
}: CommentThreadProps) {
  const [newComment, setNewComment] = useState("");

  // Organize comments into threads
  const threadedComments = comments.reduce((acc, comment) => {
    if (!comment.parentId) {
      const replies = comments.filter((c) => c.parentId === comment.id);
      acc.push({ comment, replies });
    }
    return acc;
  }, [] as { comment: Comment; replies: Comment[] }[]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            onClick={() => {
              if (newComment.trim()) {
                onAddComment(newComment);
                setNewComment("");
              }
            }}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Comment
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {threadedComments.map(({ comment, replies }) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            replies={replies}
            onReply={onAddComment}
            onUpvote={onUpvote}
          />
        ))}
      </div>
    </div>
  );
}
