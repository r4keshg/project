// MergedComponents.tsx
import React, { useState } from 'react';
import Link from 'next/link';

// --- UI Components Imports ---
// (Ensure these exist in your project B or replace with minimal versions as needed)
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Icon Imports from lucide-react ---
import { 
  Book, Github, Twitter, Linkedin, Mail, ThumbsUp, MessageSquare, Bookmark, TrendingUp, Clock, Award, PlusCircle, 
  Shield, Hash, ThumbsDown, Reply, Share, MoreHorizontal, Users, Image as ImageIcon, X, Plus, Info, PinIcon 
} from 'lucide-react';

// --- Additional Dependencies ---
import { useToast } from '@/hooks/use-toast';





// ========================================================================
// 1. BlogCard Component
// ========================================================================
interface BlogProps {
  blog: {
    id: string;
    title: string;
    summary: string;
    content: string;
    author: {
      name: string;
      avatar: string;
      bio: string;
    };
    publishedDate: string;
    readTime: string;
    tags: string[];
    imageUrl: string;
    likes: number;
    comments: number;
    bookmarks: number;
  };
}

export const BlogCard: React.FC<BlogProps> = ({ blog }) => {
  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img 
          src={blog.imageUrl} 
          alt={blog.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {blog.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="bg-gray-50 dark:bg-gray-800">
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/blog/${blog.id}`}>
          <a>
            <h3 className="text-xl font-bold hover:text-brand-600 dark:hover:text-brand-400 line-clamp-2">
              {blog.title}
            </h3>
          </a>
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {blog.publishedDate} · {blog.readTime}
        </p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
          {blog.summary}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
            <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{blog.author.name}</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-500 px-2">
            <ThumbsUp className="h-4 w-4" />
            <span className="ml-1 text-xs">{blog.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 px-2" asChild>
            <Link href={`/blog/${blog.id}`}>
              <a>
                <MessageSquare className="h-4 w-4" />
                <span className="ml-1 text-xs">{blog.comments}</span>
              </a>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 px-2">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};


// ========================================================================
// 2. ClanCard Component
// ========================================================================
interface ClanProps {
  clan: {
    id: string;
    name: string;
    description: string;
    members: number;
    posts: number;
    tags: string[];
    isJoined: boolean;
  };
}

export const ClanCard: React.FC<ClanProps> = ({ clan }) => {
  const [isJoined, setIsJoined] = useState(clan.isJoined);
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <Link href={`/clan/${clan.id}`}>
              <a>
                <CardTitle className="text-xl hover:text-brand-600 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-brand-600" />
                  {clan.name}
                </CardTitle>
              </a>
            </Link>
          </div>
          <Button 
            variant={isJoined ? "outline" : "default"} 
            size="sm"
            onClick={() => setIsJoined(!isJoined)}
          >
            {isJoined ? 'Joined' : 'Join'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-700">
          {clan.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {clan.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-gray-50">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex justify-between w-full text-sm text-gray-500">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{clan.members.toLocaleString()} members</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{clan.posts.toLocaleString()} posts</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};


// ========================================================================
// 3. CreateBlogDialog Component
// ========================================================================
interface CreateBlogDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateBlogDialog: React.FC<CreateBlogDialogProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert("Please enter a title for your blog");
      return;
    }

    if (!content.trim()) {
      alert("Please enter content for your blog");
      return;
    }

    console.log({ title, summary, content, tags, imageUrl });
    
    alert("Your blog has been published");

    onClose();
    
    setTitle('');
    setSummary('');
    setContent('');
    setTags([]);
    setImageUrl('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput) {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Blog</DialogTitle>
          <DialogDescription>
            Share your knowledge with the community. Fill in the details below to create your blog.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a catchy title for your blog"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              placeholder="Write a brief summary of your blog (optional)"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Cover Image URL (optional)</Label>
            <div className="flex space-x-2">
              <Input
                id="image"
                placeholder="Enter the URL of your cover image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-grow"
              />
              <Button type="button" variant="outline" className="flex-shrink-0">
                <ImageIcon className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex space-x-2">
              <Input
                id="tags"
                placeholder="Add tags to help categorize your blog"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow"
              />
              <Button type="button" variant="outline" onClick={handleAddTag} className="flex-shrink-0">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button 
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Publish Blog</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};


// ========================================================================
// 4. CreateClanDialog Component
// ========================================================================
interface CreateClanDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateClanDialog: React.FC<CreateClanDialogProps> = ({ 
  isOpen, 
  onClose
}) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your clan.",
        variant: "destructive"
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description for your clan.",
        variant: "destructive"
      });
      return;
    }

    if (tags.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one tag for your clan.",
        variant: "destructive"
      });
      return;
    }

    console.log('Creating clan:', { name, description, rules, tags });
    
    toast({
      title: "Success",
      description: "Your clan has been created successfully!",
    });
    
    setName('');
    setDescription('');
    setRules('');
    setTags([]);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-brand-600" />
            Create a New Clan
          </DialogTitle>
          <DialogDescription>
            Create a dedicated community space around a specific topic or interest.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="clan-name">Clan Name</Label>
            <Input
              id="clan-name"
              placeholder="Give your clan a descriptive name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clan-description">Description</Label>
            <Textarea
              id="clan-description"
              placeholder="Describe what your clan is about..."
              className="min-h-[80px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clan-rules">Community Rules (optional)</Label>
            <Textarea
              id="clan-rules"
              placeholder="Enter rules for your clan, one per line..."
              className="min-h-[80px]"
              value={rules}
              onChange={(e) => setRules(e.target.value)}
            />
            <p className="text-sm text-gray-500">
              Clear rules help maintain a healthy and focused community.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clan-tags">Tags (required)</Label>
            <div className="flex">
              <Input
                id="clan-tags"
                placeholder="Add related topics (press Enter to add)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="mr-2"
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => removeTag(tag)}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {tags.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                Tags help others discover your clan. At least one tag is required.
              </p>
            )}
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">As a clan creator, you'll have access to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Moderate posts and comments</li>
                <li>Pin important discussions</li>
                <li>Customize clan appearance</li>
                <li>Add additional moderators</li>
                <li>Set and enforce community rules</li>
              </ul>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Create Clan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


// ========================================================================
// 5. CreatePostDialog Component
// ========================================================================
interface Clan {
  id: string;
  name: string;
}

interface CreatePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  clans: Clan[];
  defaultClanId?: string;
}

export const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ 
  isOpen, 
  onClose, 
  clans,
  defaultClanId
}) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedClanId, setSelectedClanId] = useState(defaultClanId || '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your post.",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter content for your post.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedClanId) {
      toast({
        title: "Error",
        description: "Please select a clan for your post.",
        variant: "destructive"
      });
      return;
    }

    if (tags.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one tag for your post.",
        variant: "destructive"
      });
      return;
    }

    console.log('Creating post:', { title, content, clanId: selectedClanId, tags });
    
    toast({
      title: "Success",
      description: "Your post has been created successfully!",
    });
    
    setTitle('');
    setContent('');
    setSelectedClanId(defaultClanId || '');
    setTags([]);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
          <DialogDescription>
            Share your knowledge, ask questions, or start a discussion.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="post-title">Title</Label>
            <Input
              id="post-title"
              placeholder="Enter a descriptive title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="post-clan">Clan</Label>
            <Select 
              value={selectedClanId} 
              onValueChange={setSelectedClanId}
              disabled={!!defaultClanId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a clan" />
              </SelectTrigger>
              <SelectContent>
                {clans.map((clan) => (
                  <SelectItem key={clan.id} value={clan.id}>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-brand-600" />
                      {clan.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="post-content">Content</Label>
            <Textarea
              id="post-content"
              placeholder="Share your thoughts or questions..."
              className="min-h-[150px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="post-tags">Tags (required)</Label>
            <div className="flex">
              <Input
                id="post-tags"
                placeholder="Add tags (press Enter to add)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="mr-2"
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => removeTag(tag)}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {tags.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                At least one tag is required for your post.
              </p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Create Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


// ========================================================================
// 6. PostCard Component
// ========================================================================
interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: string;
    clan: string;
    upvotes: number;
    comments: number;
    tags: string[];
    timeAgo: string;
    isPinned?: boolean;
  };
}

export const PostCard: React.FC<PostProps> = ({ post }) => {
  return (
    <Card className={post.isPinned ? 'border-brand-500' : ''}>
      {post.isPinned && (
        <div className="bg-brand-50 px-4 py-1 text-xs flex items-center text-brand-700">
          <PinIcon className="h-3 w-3 mr-1" />
          Pinned post
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/post/${post.id}`}>
              <a>
                <CardTitle className="text-xl hover:text-brand-600">{post.title}</CardTitle>
              </a>
            </Link>
            <CardDescription className="flex items-center mt-1">
              <span className="text-sm">Posted by <span className="font-medium">{post.author}</span></span>
              <span className="mx-2">•</span>
              <Link href={`/clan/${post.clan}`}>
                <a className="flex items-center text-sm text-brand-600 hover:underline">
                  <Shield className="h-3 w-3 mr-1 text-brand-600" />
                  {post.clan}
                </a>
              </Link>
              <span className="mx-2">•</span>
              <span className="text-sm">{post.timeAgo}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 line-clamp-3">
          {post.content}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-gray-50">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex space-x-3">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-brand-600">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>{post.upvotes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-brand-600" asChild>
            <Link href={`/post/${post.id}`}>
              <a>
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{post.comments}</span>
              </a>
            </Link>
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-500">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
