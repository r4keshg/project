
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthResponse } from '@supabase/supabase-js';
import { supabase, UserProfile, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { triggerLoginConfetti } from '@/utils/confetti';

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isSupabaseReady: boolean;
  signUp: (email: string, password: string, username: string) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  checkIfFirstLoginOfDay: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    // Check active sessions and set the user
    const session = supabase.auth.getSession();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchUserProfile(session.user.id);
        
        // On sign in, check if it's the first login of the day
        if (event === 'SIGNED_IN') {
          const isFirstLogin = await checkIfFirstLoginOfDay();
          if (isFirstLogin) {
            triggerLoginConfetti();
            recordActivity('login');
          }
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe?.();
    };
  }, []);

  // Fetch user profile from the database
  const fetchUserProfile = async (userId: string) => {
    if (!isSupabaseConfigured) return null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProfile(data as UserProfile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Record user activity
  const recordActivity = async (activityType: 'login' | 'course_completion' | 'blog_creation' | 'clan_creation' | 'post_creation', activityData?: Record<string, any>) => {
    if (!user || !isSupabaseConfigured) return;
    
    try {
      const { error } = await supabase
        .from('activities')
        .insert({
          user_id: user.id,
          activity_type: activityType,
          activity_date: new Date().toISOString(),
          activity_data: activityData
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error recording activity:', error);
    }
  };

  // Check if this is the first login of the day
  const checkIfFirstLoginOfDay = async (): Promise<boolean> => {
    if (!user || !isSupabaseConfigured) return false;
    
    try {
      // Get today's date at midnight
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Check if there's a login activity from today
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', user.id)
        .eq('activity_type', 'login')
        .gte('activity_date', today.toISOString())
        .limit(1);

      if (error) {
        throw error;
      }

      // Update last active date in profile
      await supabase
        .from('profiles')
        .update({ last_active: new Date().toISOString() })
        .eq('id', user.id);

      // No login activity today found
      return data.length === 0;
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  };

  // Sign up new user
  const signUp = async (email: string, password: string, username: string) => {
    if (!isSupabaseConfigured) {
      toast({
        title: "Authentication disabled",
        description: "Authentication is currently disabled because Supabase is not configured.",
        variant: "destructive",
      });
      throw new Error("Supabase not configured");
    }
    
    const response = await supabase.auth.signUp({ email, password });
    
    if (response.error) {
      toast({
        title: "Error creating account",
        description: response.error.message,
        variant: "destructive",
      });
      throw response.error;
    }
    
    if (response.data.user) {
      // Create a profile for the new user
      await supabase.from('profiles').insert({
        id: response.data.user.id,
        username,
        email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_active: new Date().toISOString(),
        streak_days: 1,
        coins: 0,
        rank: 'Novice',
        completed_courses: 0,
        created_blogs: 0,
        is_clan_admin: false
      });
    }
    
    return response;
  };

  // Sign in existing user
  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      toast({
        title: "Authentication disabled",
        description: "Authentication is currently disabled because Supabase is not configured.",
        variant: "destructive",
      });
      throw new Error("Supabase not configured");
    }
    
    const response = await supabase.auth.signInWithPassword({ email, password });
    
    if (response.error) {
      toast({
        title: "Sign in failed",
        description: response.error.message,
        variant: "destructive",
      });
      throw response.error;
    }
    
    return response;
  };

  // Sign out user
  const signOut = async () => {
    if (!isSupabaseConfigured) return;
    
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  // Update user profile
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user || !isSupabaseConfigured) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      // Refetch profile to update state
      await fetchUserProfile(user.id);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    profile,
    isLoading,
    isSupabaseReady: isSupabaseConfigured,
    signUp,
    signIn,
    signOut,
    updateProfile,
    checkIfFirstLoginOfDay
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
