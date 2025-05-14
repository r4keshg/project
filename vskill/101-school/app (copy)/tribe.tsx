// pages/tribe.tsx
import React, { useState } from 'react';
import Link from 'next/link';
// --- UI Components Imports ---
// (Ensure these components exist in project B or update the import paths accordingly)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Icon Imports from lucide-react ---
import { 
  Search, Users, TrendingUp, Clock, Award, PlusCircle, 
  MessageSquare, ThumbsUp, ThumbsDown, BookmarkPlus, Shield, 
  MoreHorizontal, Reply, Share, Plus, Info, PinIcon, X 
} from 'lucide-react';

// --- Additional Dependencies ---
import { useToast } from '@/hooks/use-toast';

// ------------------------------
// Mock Data (Replace with real API calls as needed)
// ------------------------------
const mockPosts = [
  {
    id: '1',
    title: 'How to approach learning JavaScript in 2023?',
    content: 'I\'m new to web development and want to learn JavaScript. What\'s the best approach?',
    author: 'webLearner',
    clan: 'Web Development',
    clanId: '1',
    upvotes: 42,
    comments: 12,
    tags: ['JavaScript', 'Web Development', 'Learning'],
    timeAgo: '2 hours ago',
    isPinned: true,
    createdAt: '2023-06-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Share your favorite design resources!',
    content: 'Looking for good design resources. Share your favorites!',
    author: 'designerPro',
    clan: 'UI/UX Design',
    clanId: '2',
    upvotes: 28,
    comments: 15,
    tags: ['Design', 'Resources', 'UI/UX'],
    timeAgo: '5 hours ago',
    isPinned: false,
    createdAt: '2023-06-15T08:00:00Z'
  },
  {
    id: '3',
    title: 'Machine Learning vs. Deep Learning: When to use what?',
    content: 'Let\'s discuss when ML is sufficient and when you should use deep learning...',
    author: 'dataScientist',
    clan: 'Data Science',
    clanId: '3',
    upvotes: 35,
    comments: 8,
    tags: ['Machine Learning', 'Deep Learning', 'AI'],
    timeAgo: '1 day ago',
    isPinned: false,
    createdAt: '2023-06-14T15:45:00Z'
  },
];

const mockClans = [
  {
    id: '1',
    name: 'Web Development',
    description: 'Everything related to web development, from HTML basics to advanced frameworks.',
    members: 1240,
    posts: 315,
    tags: ['JavaScript', 'HTML', 'CSS', 'React', 'Vue'],
    isJoined: true
  },
  {
    id: '2',
    name: 'UI/UX Design',
    description: 'A community for UI/UX designers to share work, get feedback and discuss trends.',
    members: 968,
    posts: 213,
    tags: ['Design', 'UI', 'UX', 'Figma'],
    isJoined: false
  },
  {
    id: '3',
    name: 'Data Science',
    description: 'Discuss data science concepts, tools, and methodologies.',
    members: 1502,
    posts: 428,
    tags: ['Python', 'Machine Learning', 'Statistics', 'Data Visualization'],
    isJoined: false
  },
];

const mockComments = [
  {
    id: '1',
    author: 'devExpert',
    authorImage: '',
    content: 'Start with vanilla JS for sure. Understanding the fundamentals will make learning frameworks much easier later on.',
    createdAt: '2023-06-15T11:15:00Z',
    upvotes: 18,
    downvotes: 1,
    replies: [
      {
        id: '1-1',
        author: 'webLearner',
        authorImage: '',
        content: 'Thanks for the advice! Any specific resources you\'d recommend?',
        createdAt: '2023-06-15T11:45:00Z',
        upvotes: 3,
        downvotes: 0,
      },
      {
        id: '1-2',
        author: 'devExpert',
        authorImage: '',
        content: 'JavaScript.info and MDN docs are excellent free resources. "Eloquent JavaScript" is also a great book to start with.',
        createdAt: '2023-06-15T12:30:00Z',
        upvotes: 12,
        downvotes: 0,
      }
    ]
  },
  {
    id: '2',
    author: 'jsTeacher',
    authorImage: '',
    content: 'Computer science fundamentals are helpful but not strictly necessary when starting out. Focus on learning JavaScript well first, then gradually incorporate CS concepts as you progress.',
    createdAt: '2023-06-15T13:20:00Z',
    upvotes: 24,
    downvotes: 2,
    replies: []
  }
];

// ------------------------------
// Detailed Post View Component

// ------------------------------
const DetailedPostView = ({ post, onBack }: { post: any; onBack: () => void }) => {
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [showReplyInput, setShowReplyInput] = useState<{ [key: string]: boolean }>({});

  const handleComment = () => {
    console.log('Submitting comment:', commentText);
    setCommentText('');
  };

  const handleReply = (commentId: string) => {
    console.log('Replying to comment', commentId, 'with text:', replyText[commentId]);
    setReplyText(prev => ({ ...prev, [commentId]: '' }));
    setShowReplyInput(prev => ({ ...prev, [commentId]: false }));
  };

  const toggleReplyInput = (commentId: string) => {
    setShowReplyInput(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button onClick={onBack} variant="link" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          Back to Tribe
        </Button>
      </div>
      
      {/* Post Details */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <Link href={`/post/${post.id}`}>
                <a>
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                </a>
              </Link>
              <CardDescription className="flex items-center mt-2">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm">Posted by <span className="font-medium">{post.author}</span></span>
                <span className="mx-2">•</span>
                <Link href={`/clan/${post.clanId}`}>
                  <a style={{ color: '#2563eb', display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
                    <Shield className="h-3 w-3 mr-1" />
                    {post.clan}
                  </a>
                </Link>
                <span className="mx-2">•</span>
                <span className="text-sm">{formatDate(post.createdAt)}</span>
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none text-gray-700 whitespace-pre-line">
            {post.content}
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" style={{ backgroundColor: '#f9fafb' }}>
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <div className="flex space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-500">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{post.upvotes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500">
              <ThumbsDown className="h-4 w-4 mr-1" />
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-500">
              <BookmarkPlus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* Comments Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">
          {mockComments.length} Comments
        </h3>
        
        {/* Comment Input */}
        <div className="mb-6">
          <Textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{ marginBottom: '0.5rem' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleComment} disabled={!commentText.trim()}>
              Comment
            </Button>
          </div>
        </div>
        
        {/* Comments List */}
        <div className="space-y-6">
          {mockComments.map((comment) => (
            <div key={comment.id} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div className="flex items-start mb-2">
                <Avatar className="h-8 w-8 mr-3 mt-1">
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium">{comment.author}</span>
                    <span style={{ margin: '0 0.5rem', color: '#9ca3af' }}>•</span>
                    <span className="text-sm" style={{ color: '#6b7280' }}>{formatDate(comment.createdAt)}</span>
                  </div>
                  <p style={{ color: '#374151' }}>{comment.content}</p>
                  <div className="mt-2 flex items-center" style={{ gap: '1rem' }}>
                    <Button variant="ghost" size="sm" style={{ color: '#6b7280' }}>
                      <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                      <span style={{ fontSize: '0.75rem' }}>{comment.upvotes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" style={{ color: '#6b7280' }}>
                      <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                      <span style={{ fontSize: '0.75rem' }}>{comment.downvotes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" style={{ color: '#6b7280' }} onClick={() => toggleReplyInput(comment.id)}>
                      <Reply className="h-3.5 w-3.5 mr-1" />
                      <span style={{ fontSize: '0.75rem' }}>Reply</span>
                    </Button>
                  </div>
                  
                  {/* Reply Input */}
                  {showReplyInput[comment.id] && (
                    <div style={{ marginTop: '0.75rem' }}>
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyText[comment.id] || ''}
                        onChange={(e) => setReplyText(prev => ({ ...prev, [comment.id]: e.target.value }))}
                        style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <Button variant="outline" size="sm" onClick={() => toggleReplyInput(comment.id)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => handleReply(comment.id)} disabled={!replyText[comment.id]?.trim()}>
                          Reply
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Replies List */}
              {comment.replies.length > 0 && (
                <div style={{ marginLeft: '2.75rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {comment.replies.map((reply) => (
                    <div key={reply.id} style={{ borderLeft: '2px solid #e5e7eb', paddingLeft: '1rem' }}>
                      <div className="flex items-start">
                        <Avatar className="h-7 w-7 mr-2 mt-1">
                          <AvatarFallback>{reply.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-sm">{reply.author}</span>
                            <span style={{ margin: '0 0.5rem', color: '#9ca3af' }}>•</span>
                            <span className="text-xs" style={{ color: '#6b7280' }}>{formatDate(reply.createdAt)}</span>
                          </div>
                          <p className="text-sm" style={{ color: '#374151' }}>{reply.content}</p>
                          <div className="mt-1 flex items-center" style={{ gap: '1rem' }}>
                            <Button variant="ghost" size="sm" style={{ color: '#6b7280' }}>
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              <span style={{ fontSize: '0.75rem' }}>{reply.upvotes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" style={{ color: '#6b7280' }}>
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              <span style={{ fontSize: '0.75rem' }}>{reply.downvotes}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ------------------------------
// Main Merged Component (Tribe & Post)
// ------------------------------
const MergedTribeAndPostPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isCreateClanOpen, setIsCreateClanOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  // Inline container styles
  const containerStyle = { maxWidth: '1200px', margin: '0 auto', padding: '2rem' };
  const lgGridStyle = { display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' };

  // Handle click on a post to view details
  function handlePostClick(post: any) {
    setSelectedPost(post);
  }

  if (selectedPost) {
    return <DetailedPostView post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>vSkill Tribe</h1>
        <p style={{ marginTop: '0.5rem', fontSize: '1.125rem', color: '#4b5563' }}>
          Connect, learn, and grow with our community of learners
        </p>
      </div>
      
      <div style={lgGridStyle}>
        {/* Sidebar */}
        <div style={{ position: 'sticky', top: '5rem' }}>
          <Card>
            <CardHeader>
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ marginBottom: '1rem' }}>
                <Button variant="outline" style={{ width: '100%', justifyContent: 'flex-start' }} asChild>
                  <Link href="/tribe">
                    <a>
                      <Users style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                      All Tribe Content
                    </a>
                  </Link>
                </Button>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <Button variant="outline" style={{ width: '100%', justifyContent: 'flex-start' }}>
                  <TrendingUp style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                  Popular
                </Button>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <Button variant="outline" style={{ width: '100%', justifyContent: 'flex-start' }}>
                  <Clock style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                  Recent
                </Button>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <Button variant="outline" style={{ width: '100%', justifyContent: 'flex-start' }}>
                  <Award style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                  Featured
                </Button>
              </div>
            </CardContent>
            <CardHeader style={{ paddingBottom: '0.5rem' }}>
              <CardTitle>My Clans</CardTitle>
            </CardHeader>
            <CardContent>
              {mockClans.filter(clan => clan.isJoined).map(clan => (
                <div key={clan.id} style={{ marginBottom: '0.5rem' }}>
                  <Button variant="ghost" style={{ width: '100%', justifyContent: 'flex-start' }} asChild>
                    <Link href={`/clan/${clan.id}`}>
                      <a>
                        <Shield style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                        {clan.name}
                      </a>
                    </Link>
                  </Button>
                </div>
              ))}
              <div>
                <Button variant="ghost" style={{ width: '100%', justifyContent: 'flex-start', color: '#2563eb' }} onClick={() => setIsCreateClanOpen(true)}>
                  <PlusCircle style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                  Create New Clan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div>
          {/* Search and Create Post */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative', flexGrow: 1 }}>
              <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <Input
                placeholder="Search posts, discussions, clans..."
                style={{ paddingLeft: '2.5rem' }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={() => setIsCreatePostOpen(true)}>
                <PlusCircle style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                Create Post
              </Button>
            </div>
          </div>
          
          {/* Tabs for Posts and Clans */}
          <Tabs defaultValue="all-posts">
            <TabsList style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
              <TabsTrigger value="all-posts">All Posts</TabsTrigger>
              <TabsTrigger value="explore-clans">Explore Clans</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all-posts" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {mockPosts.map(post => (
                <div key={post.id} onClick={() => handlePostClick(post)} style={{ cursor: 'pointer' }}>
                  <PostCard post={post} />
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="explore-clans" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {mockClans.map(clan => (
                <ClanCard key={clan.id} clan={clan} />
              ))}
            </TabsContent>
            
            <TabsContent value="popular" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {mockPosts
                .sort((a, b) => b.upvotes - a.upvotes)
                .map(post => (
                  <div key={post.id} onClick={() => handlePostClick(post)} style={{ cursor: 'pointer' }}>
                    <PostCard post={post} />
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Dialogs */}
      <CreatePostDialog isOpen={isCreatePostOpen} onClose={() => setIsCreatePostOpen(false)} clans={mockClans} />
      <CreateClanDialog isOpen={isCreateClanOpen} onClose={() => setIsCreateClanOpen(false)} />
    </div>
  );
};

export default MergedTribeAndPostPage;
