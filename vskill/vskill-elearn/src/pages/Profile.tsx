
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Camera, Edit2, Award } from 'lucide-react';

interface User {
  username: string;
  coins: number;
  rank: string;
  streak: number;
  enrolledCourses: any[];
  profilePic?: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      setNewUsername(JSON.parse(userData).username);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleUpdateProfile = () => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      username: newUsername,
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully",
    });
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const updatedUser = {
        ...user,
        profilePic: reader.result as string
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully",
      });
      
      // Reset file input
      setFileInputKey(Date.now());
    };
    
    reader.readAsDataURL(file);
  };

  // Calculate achievements
  const getAchievements = () => {
    if (!user) return [];
    
    const achievements = [];
    
    // Streak achievements
    if (user.streak >= 30) {
      achievements.push({
        id: 'streak30',
        title: '30-Day Streak',
        description: 'Logged in for 30 consecutive days',
        icon: <Award className="h-10 w-10 text-amber-500" />
      });
    }
    if (user.streak >= 7) {
      achievements.push({
        id: 'streak7',
        title: 'Week Warrior',
        description: 'Logged in for 7 consecutive days',
        icon: <Award className="h-10 w-10 text-blue-500" />
      });
    }
    
    // Coin achievements
    if (user.coins >= 100) {
      achievements.push({
        id: 'coins100',
        title: 'Coin Collector',
        description: 'Earned 100+ coins',
        icon: <Award className="h-10 w-10 text-yellow-500" />
      });
    }
    
    // Course achievements
    const completedCourses = user.enrolledCourses?.filter(course => course.progress === 100) || [];
    if (completedCourses.length >= 1) {
      achievements.push({
        id: 'course1',
        title: 'First Completion',
        description: 'Completed your first course',
        icon: <Award className="h-10 w-10 text-green-500" />
      });
    }
    
    return achievements;
  };

  if (!user) return null;

  const achievements = getAchievements();

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20">
              {user.profilePic ? (
                <AvatarImage src={user.profilePic} alt={user.username} />
              ) : (
                <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
            <div className="absolute bottom-0 right-0 rounded-full">
              <label htmlFor="profile-pic" className="cursor-pointer">
                <Button size="icon" variant="outline" className="rounded-full" type="button">
                  <Camera className="h-4 w-4" />
                </Button>
                <input 
                  id="profile-pic" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleProfilePicChange}
                  key={fileInputKey}
                />
              </label>
            </div>
          </div>
          <div className="flex-grow">
            {editing ? (
              <div className="flex gap-2">
                <Input
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <Button onClick={handleUpdateProfile}>Save</Button>
                <Button variant="outline" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">{user.username}</CardTitle>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setEditing(true)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="flex gap-4 mt-2">
              <span>{user.coins} coins</span>
              <span>•</span>
              <span>{user.rank}</span>
              <span>•</span>
              <span>{user.streak} day streak</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-8">
        {/* Achievements Section */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            {achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className="hover-scale overflow-hidden">
                    <div className="flex flex-col items-center p-4">
                      <div className="bg-muted rounded-full p-3 mb-3">
                        {achievement.icon}
                      </div>
                      <h3 className="font-semibold text-center">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground text-center mt-1">
                        {achievement.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No achievements unlocked yet.</p>
                <p className="mt-2">Keep learning to earn badges!</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
              <div className="space-y-4">
                {user.enrolledCourses.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{course.title}</h3>
                      <span>{Math.round(course.progress)}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/arena?course=${course.id}`)}
                    >
                      Resume Course
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
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
    </div>
  );
};

export default Profile;
