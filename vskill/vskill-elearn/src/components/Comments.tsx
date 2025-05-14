
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { MessageCircle, Share2 } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  replies: Comment[];
  upvotes: number;
}

export const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Math.random().toString(),
      author: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).username : 'Anonymous',
      content: newComment,
      timestamp: new Date().toISOString(),
      replies: [],
      upvotes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-grow"
        />
        <Button onClick={handleAddComment}>Post</Button>
      </div>
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Avatar />
              <span className="font-medium">{comment.author}</span>
              <span className="text-sm text-muted-foreground">
                {new Date(comment.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-foreground">{comment.content}</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Reply
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
