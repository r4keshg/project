
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Heart, MessageSquare, Share2, Search } from 'lucide-react';

interface Post {
  id: string;
  type: 'discussion' | 'blog' | 'meme';
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
  liked?: boolean;
}

const Tribe = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [newPostType, setNewPostType] = useState<'discussion' | 'blog' | 'meme'>('discussion');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sample posts data
  const samplePosts: Post[] = [
    {
      id: 'post1',
      type: 'discussion',
      title: 'What resources do you recommend for learning React?',
      content: 'I\'m looking to master React in 2023. What courses, books, or resources would you recommend for someone with JavaScript experience?',
      author: 'ReactNewbie',
      likes: 24,
      comments: 15,
      timestamp: '2 hours ago',
      tags: ['React', 'Learning Resources', 'Web Development']
    },
    {
      id: 'post2',
      type: 'blog',
      title: '10 Python Tips Every Data Scientist Should Know',
      content: 'After years of working with Python for data science, here are my top 10 tips that will make your code more efficient and readable...',
      author: 'DataWizard',
      likes: 156,
      comments: 32,
      timestamp: '1 day ago',
      tags: ['Python', 'Data Science', 'Tips']
    },
    {
      id: 'post3',
      type: 'meme',
      title: 'When your code finally works but you don\'t know why',
      content: 'https://placeholder.co/400x300',
      author: 'CodeMemer',
      likes: 302,
      comments: 41,
      timestamp: '3 days ago',
      tags: ['Coding Humor', 'Programming']
    },
    {
      id: 'post4',
      type: 'discussion',
      title: 'How to stay motivated while learning to code?',
      content: 'I often find myself losing motivation after a few weeks of consistent learning. What strategies do you use to stay motivated on your coding journey?',
      author: 'PersistentCoder',
      likes: 89,
      comments: 47,
      timestamp: '4 days ago',
      tags: ['Motivation', 'Learning', 'Productivity']
    },
    {
      id: 'post5',
      type: 'blog',
      title: 'The Ultimate Guide to Machine Learning Algorithms',
      content: 'In this comprehensive guide, we\'ll walk through the most important machine learning algorithms you should know in 2023...',
      author: 'MLEnthusiast',
      likes: 215,
      comments: 28,
      timestamp: '1 week ago',
      tags: ['Machine Learning', 'AI', 'Algorithms']
    }
  ];

  useEffect(() => {
    // Initialize posts
    setPosts(samplePosts);
    setFilteredPosts(samplePosts);
  }, []);

  useEffect(() => {
    // Filter posts based on search query and active tab
    let filtered = posts;
    
    if (searchQuery) {
      filtered = filtered.filter(
        post => 
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(post => post.type === activeTab);
    }
    
    setFilteredPosts(filtered);
  }, [searchQuery, activeTab, posts]);

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
    
    toast({
      title: "Post liked",
      description: "Your like has been recorded",
    });
  };

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Incomplete form",
        description: "Please fill in both title and content",
        variant: "destructive",
      });
      return;
    }
    
    const newPost: Post = {
      id: `post${Date.now()}`,
      type: newPostType,
      title: newPostTitle,
      content: newPostContent,
      author: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).username : 'Anonymous',
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      tags: newPostTags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    
    setPosts([newPost, ...posts]);
    setIsDialogOpen(false);
    
    // Reset form
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostTags('');
    
    toast({
      title: "Post created!",
      description: "Your post has been published to the Tribe",
    });
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'discussion':
        return <div className="bg-primary/10 text-primary p-2 rounded-full">💬</div>;
      case 'blog':
        return <div className="bg-secondary/10 text-secondary p-2 rounded-full">📝</div>;
      case 'meme':
        return <div className="bg-accent/10 text-accent p-2 rounded-full">🎭</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">VSkill Tribe</h1>
          <p className="text-muted-foreground">Connect, share and learn with the community</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create a New Post</DialogTitle>
              <DialogDescription>
                Share knowledge, ask questions, or post something fun with the community
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={newPostType === 'discussion' ? 'default' : 'outline'}
                  onClick={() => setNewPostType('discussion')}
                  className="w-full"
                >
                  Discussion
                </Button>
                <Button
                  type="button"
                  variant={newPostType === 'blog' ? 'default' : 'outline'}
                  onClick={() => setNewPostType('blog')}
                  className="w-full"
                >
                  Blog
                </Button>
                <Button
                  type="button"
                  variant={newPostType === 'meme' ? 'default' : 'outline'}
                  onClick={() => setNewPostType('meme')}
                  className="w-full"
                >
                  Meme
                </Button>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  placeholder="Enter a title for your post"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Content
                </label>
                <Textarea
                  id="content"
                  placeholder="Write your post content here"
                  rows={5}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="tags" className="text-sm font-medium">
                  Tags (comma separated)
                </label>
                <Input
                  id="tags"
                  placeholder="e.g., Programming, JavaScript, Learning"
                  value={newPostTags}
                  onChange={(e) => setNewPostTags(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleCreatePost}>
                Post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="discussion">Discussions</TabsTrigger>
          <TabsTrigger value="blog">Blogs</TabsTrigger>
          <TabsTrigger value="meme">Memes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="pt-6">
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover-scale">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                      {getPostIcon(post.type)}
                      <div>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.content}</p>
                  <div className="flex justify-between text-xs text-muted-foreground mt-3">
                    <span>Posted by {post.author}</span>
                    <span>{post.timestamp}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={post.liked ? "text-primary" : ""}
                      onClick={() => handleLikePost(post.id)}
                    >
                      <Heart className="mr-1 h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium mb-2">No posts found</h2>
                <p className="text-muted-foreground mb-4">Try changing your search criteria or create a new post</p>
                <Button onClick={() => setIsDialogOpen(true)}>Create Post</Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="discussion" className="pt-6">
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              post.type === 'discussion' && (
                <Card key={post.id} className="hover-scale">
                  {/* Same card content as in the "all" tab */}
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3 items-center">
                        {getPostIcon(post.type)}
                        <div>
                          <CardTitle className="text-lg">{post.title}</CardTitle>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {post.tags.map((tag, index) => (
                              <span key={index} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">{post.content}</p>
                    <div className="flex justify-between text-xs text-muted-foreground mt-3">
                      <span>Posted by {post.author}</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={post.liked ? "text-primary" : ""}
                        onClick={() => handleLikePost(post.id)}
                      >
                        <Heart className="mr-1 h-4 w-4" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="mr-1 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )
            ))}
            
            {filteredPosts.filter(post => post.type === 'discussion').length === 0 && (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium mb-2">No discussions found</h2>
                <p className="text-muted-foreground mb-4">Start a new discussion to get the conversation going</p>
                <Button onClick={() => {
                  setNewPostType('discussion');
                  setIsDialogOpen(true);
                }}>
                  Start Discussion
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="blog" className="pt-6">
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              post.type === 'blog' && (
                <Card key={post.id} className="hover-scale">
                  {/* Same structure as discussion posts */}
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3 items-center">
                        {getPostIcon(post.type)}
                        <div>
                          <CardTitle className="text-lg">{post.title}</CardTitle>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {post.tags.map((tag, index) => (
                              <span key={index} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">{post.content}</p>
                    <div className="flex justify-between text-xs text-muted-foreground mt-3">
                      <span>Posted by {post.author}</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={post.liked ? "text-primary" : ""}
                        onClick={() => handleLikePost(post.id)}
                      >
                        <Heart className="mr-1 h-4 w-4" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="mr-1 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )
            ))}
            
            {filteredPosts.filter(post => post.type === 'blog').length === 0 && (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium mb-2">No blogs found</h2>
                <p className="text-muted-foreground mb-4">Share your knowledge by writing a blog</p>
                <Button onClick={() => {
                  setNewPostType('blog');
                  setIsDialogOpen(true);
                }}>
                  Write Blog
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="meme" className="pt-6">
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              post.type === 'meme' && (
                <Card key={post.id} className="hover-scale">
                  {/* Similar structure with image rendering for memes */}
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3 items-center">
                        {getPostIcon(post.type)}
                        <div>
                          <CardTitle className="text-lg">{post.title}</CardTitle>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {post.tags.map((tag, index) => (
                              <span key={index} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* For memes, render as image if it's a URL */}
                    {post.content.startsWith('http') ? (
                      <img 
                        src={post.content} 
                        alt={post.title} 
                        className="w-full h-auto rounded-md max-h-[300px] object-cover"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{post.content}</p>
                    )}
                    <div className="flex justify-between text-xs text-muted-foreground mt-3">
                      <span>Posted by {post.author}</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={post.liked ? "text-primary" : ""}
                        onClick={() => handleLikePost(post.id)}
                      >
                        <Heart className="mr-1 h-4 w-4" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="mr-1 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )
            ))}
            
            {filteredPosts.filter(post => post.type === 'meme').length === 0 && (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium mb-2">No memes found</h2>
                <p className="text-muted-foreground mb-4">Share something funny with the community</p>
                <Button onClick={() => {
                  setNewPostType('meme');
                  setIsDialogOpen(true);
                }}>
                  Post a Meme
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tribe;
