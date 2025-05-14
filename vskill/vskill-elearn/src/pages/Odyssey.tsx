
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Award, Quote } from 'lucide-react';
import confetti from 'canvas-confetti';

interface User {
  username: string;
  coins: number;
  rank: string;
  streak: number;
  enrolledCourses: Course[];
  completedCourses: Course[];
  loginDays?: Date[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  modules: number;
  tags: string[];
}

// Daily quotes array
const quotes = [
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { quote: "The beautiful thing about learning is that nobody can take it away from you.", author: "B.B. King" },
  { quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { quote: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { quote: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
  { quote: "Knowledge is power. Information is liberating. Education is the premise of progress.", author: "Kofi Annan" }
];

const Odyssey = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dailyQuote, setDailyQuote] = useState({ quote: "", author: "" });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sample courses data
  const popularCourses = [
    {
      id: 'course1',
      title: 'Introduction to React',
      description: 'Learn the basics of React and build your first application',
      progress: 0,
      modules: 5,
      tags: ['Web Development', 'Frontend', 'JavaScript']
    },
    {
      id: 'course2',
      title: 'Python Data Science',
      description: 'Master data analysis and visualization with Python',
      progress: 0,
      modules: 8,
      tags: ['Data Science', 'Python', 'Analytics']
    },
    {
      id: 'course3',
      title: 'Machine Learning Fundamentals',
      description: 'Understand the core concepts of machine learning algorithms',
      progress: 0,
      modules: 6,
      tags: ['AI', 'Data Science', 'Python']
    }
  ];
  
  // Trigger confetti animation
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Get a random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  // Record today's login
  const recordLogin = (userData: User) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    
    const loginDays = userData.loginDays || [];
    
    // Check if today is already recorded
    const alreadyLoggedToday = loginDays.some(date => {
      const d = new Date(date);
      return d.toDateString() === today.toDateString();
    });
    
    if (!alreadyLoggedToday) {
      const newLoginDays = [...loginDays, today];
      
      // Check for consecutive days to update streak
      let streak = 1;
      const sortedDays = newLoginDays.map(d => new Date(d)).sort((a, b) => b.getTime() - a.getTime());
      
      for (let i = 0; i < sortedDays.length - 1; i++) {
        const current = new Date(sortedDays[i]);
        const prev = new Date(sortedDays[i + 1]);
        
        // Check if dates are consecutive
        const diffTime = Math.abs(current.getTime() - prev.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          streak++;
        } else {
          break;
        }
      }
      
      // If streak reaches 30 days, show special badge
      if (streak === 30 && userData.streak < 30) {
        toast({
          title: "Achievement Unlocked!",
          description: "You've earned the One Month Streak badge! 🏆",
        });
        triggerConfetti();
      }
      
      const updatedUser = {
        ...userData,
        loginDays: newLoginDays,
        streak: Math.max(userData.streak, streak)
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    }
    
    return userData;
  };

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Get user data
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      const updatedUser = recordLogin(parsedUser);
      setUser(updatedUser);
      
      // Trigger welcome confetti for demonstration
      setTimeout(triggerConfetti, 1000);
    }
    
    // Set daily quote
    setDailyQuote(getRandomQuote());
    setIsLoading(false);
  }, [navigate]);
  
  const handleEnrollCourse = (course: Course) => {
    if (!user) return;
    
    if (user.coins < 20) {
      toast({
        title: "Not enough coins",
        description: "You need 20 coins to enroll in this course",
        variant: "destructive",
      });
      return;
    }
    
    // Update user data with enrolled course and deduct coins
    const updatedUser = {
      ...user,
      coins: user.coins - 20,
      enrolledCourses: [...(user.enrolledCourses || []), {...course, progress: 0}]
    };
    
    // Update local storage and state
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    toast({
      title: "Enrolled successfully!",
      description: `You've enrolled in ${course.title}`,
    });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Prepare the calendar disabled dates (days user hasn't logged in)
  const loginDays = user?.loginDays?.map(date => new Date(date)) || [];

  // Function to determine if user has 30-day streak badge
  const hasMonthStreakBadge = (user?.streak || 0) >= 30;

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Welcome Banner with Quote */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-lg rounded-xl p-6 mb-8 shadow-lg border border-white/10 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user?.username || 'Learner'}!</h1>
            <div className="mt-2 flex items-start">
              <Quote className="h-5 w-5 mr-2 mt-1 text-primary" />
              <div>
                <p className="text-muted-foreground italic">"{dailyQuote.quote}"</p>
                <p className="text-sm text-muted-foreground mt-1">- {dailyQuote.author}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end mt-4 md:mt-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xl font-bold">{user?.coins || 0}</div>
              <div className="text-sm text-muted-foreground">Coins</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xl font-bold">{user?.rank || 'Beginner'}</div>
              <div className="text-sm text-muted-foreground">Rank</div>
              {hasMonthStreakBadge && (
                <div className="ml-2 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 text-xs px-2 py-1 rounded-full flex items-center">
                  <Award className="h-3 w-3 mr-1" />
                  <span>30-Day Streak</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: User Progress */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Current Rank</span>
                  <span className="font-semibold">{user?.rank || 'Beginner'}</span>
                </div>
                <Progress value={40} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Beginner</span>
                  <span>Apprentice</span>
                  <span>Scholar</span>
                  <span>Master</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>Daily Streak</span>
                  <span className="font-semibold">{user?.streak || 0} days</span>
                </div>
                <div className="flex justify-between gap-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div 
                      key={day} 
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs ${
                        (user?.streak || 0) >= day ? 'bg-primary text-white' : 'bg-muted'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Login Calendar */}
              <div>
                <div className="flex justify-between mb-2">
                  <span>Login Calendar</span>
                </div>
                <Calendar 
                  mode="multiple"
                  selected={loginDays}
                  className="border rounded-md"
                  disabled={{ before: new Date(2023, 0, 1) }}
                  modifiers={{
                    active: loginDays
                  }}
                  modifiersClassNames={{
                    active: "bg-primary text-primary-foreground"
                  }}
                />
                <div className="mt-2 text-xs text-muted-foreground">
                  Highlighted dates show your login activity
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Courses</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              {user?.enrolledCourses && user.enrolledCourses.length > 0 ? (
                <div className="space-y-4">
                  {user.enrolledCourses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{course.title}</h3>
                        <span className="text-sm text-muted-foreground">{Math.round(course.progress)}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        Continue Learning
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p>You haven't enrolled in any courses yet.</p>
                  <Button 
                    variant="link" 
                    onClick={() => navigate('/arena')}
                    className="mt-2"
                  >
                    Explore courses
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Middle Column: Popular Courses */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Popular Courses</CardTitle>
              <CardDescription>Explore trending courses in VSkill Arena</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {popularCourses.map((course) => (
                  <Card key={course.id} className="hover-scale">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {course.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        <span>{course.modules} modules</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleEnrollCourse(course)}
                      >
                        Enroll for 20 coins
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => navigate('/arena')}
              >
                Explore All Courses
              </Button>
            </CardFooter>
          </Card>
          
          {/* Tribe Highlights */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tribe Highlights</CardTitle>
              <CardDescription>Latest from the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border hover-scale cursor-pointer">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">How to stay motivated while learning to code?</h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Discussion</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Started by @codeenthusiast</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <span>42 replies</span>
                    <span>•</span>
                    <span>Hot topic</span>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border hover-scale cursor-pointer">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">10 Python tricks every data scientist should know</h3>
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Blog</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Written by @datawizard</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <span>156 likes</span>
                    <span>•</span>
                    <span>Trending</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/tribe')}
              >
                Visit Tribe
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Odyssey;
