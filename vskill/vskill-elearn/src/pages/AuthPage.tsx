import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User, Mail } from 'lucide-react';

const AuthPage = () => {
  const [activeForm, setActiveForm] = useState<'login' | 'signup' | 'forgot'>('login');
  const navigate = useNavigate();
  const { toast } = useToast();

  /* ===== LOGIN STATE ===== */
  const [loginIdentifier, setLoginIdentifier] = useState(''); // can be username or email
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  /* ===== SIGNUP STATE ===== */
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  /* ===== FORGOT PASSWORD STATE ===== */
  const [forgotEmail, setForgotEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  /* ===== LOGIN HANDLER ===== */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        throw new Error("User not found, please sign up");
      }
      const user = JSON.parse(storedUser);
      // Allow login using either username or email
      if (
        (user.username === loginIdentifier || user.email === loginIdentifier) &&
        user.password === loginPassword
      ) {
        localStorage.setItem('isLoggedIn', 'true');
        toast({
          title: "Welcome back!",
          description: `Logged in as ${user.username}`,
        });
        setTimeout(() => navigate('/odyssey'), 1000);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoginLoading(false);
    }
  };

  /* ===== SIGNUP HANDLER ===== */
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validations
    if (signupPassword !== signupConfirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    if (signupUsername.length < 3) {
      toast({
        title: "Username too short",
        description: "Username must be at least 3 characters long",
        variant: "destructive",
      });
      return;
    }
    if (signupPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(signupEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    setIsSignupLoading(true);
    try {
      // Simulate API call and save user
      const user = {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
        coins: 100,
        rank: 'Beginner',
        streak: 0,
        enrolledCourses: [],
        completedCourses: [],
      };
      localStorage.setItem('user', JSON.stringify(user));
      toast({
        title: "Account created!",
        description: "Welcome to VSkill Arena!",
      });
      setTimeout(() => navigate('/odyssey'), 1000);
    } catch (error) {
      toast({
        title: "Error creating account",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSignupLoading(false);
    }
  };

  /* ===== FORGOT PASSWORD: SEND OTP HANDLER ===== */
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsForgotLoading(true);
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        throw new Error("User not found, please sign up");
      }
      const user = JSON.parse(storedUser);
      if (user.email !== forgotEmail) {
        throw new Error("Email does not match our records");
      }
      // Generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      setOtpSent(true);
      // Simulate sending OTP via email (integrate with your email service in production)
      toast({
        title: "OTP Sent",
        description: `An OTP has been sent to ${forgotEmail}`,
      });
      console.log("Generated OTP:", otp);
    } catch (error: any) {
      toast({
        title: "Failed to send OTP",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsForgotLoading(false);
    }
  };

  /* ===== FORGOT PASSWORD: RESET HANDLER ===== */
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Passwords don't match",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }
    if (enteredOtp !== generatedOtp) {
      toast({
        title: "Invalid OTP",
        description: "The OTP entered is incorrect",
        variant: "destructive",
      });
      return;
    }
    setIsForgotLoading(true);
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) throw new Error("User not found");
      const user = JSON.parse(storedUser);
      if (user.email !== forgotEmail) throw new Error("Email does not match our records");
      user.password = newPassword;
      localStorage.setItem('user', JSON.stringify(user));
      toast({
        title: "Password Reset",
        description: "Your password has been updated",
      });
      // Reset forgot password state
      setOtpSent(false);
      setGeneratedOtp('');
      setEnteredOtp('');
      setNewPassword('');
      setConfirmNewPassword('');
      setForgotEmail('');
      // Go back to login form
      setActiveForm('login');
    } catch (error: any) {
      toast({
        title: "Reset failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsForgotLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-lg animate-fade-in glass-card">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {activeForm === 'login' && "Welcome Back"}
            {activeForm === 'signup' && "Create an Account"}
            {activeForm === 'forgot' && "Reset Password"}
          </CardTitle>
          <CardDescription>
            {activeForm === 'login' && "Enter your credentials to access your account"}
            {activeForm === 'signup' && "Enter your information to create your account"}
            {activeForm === 'forgot' && "Enter your email to reset your password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeForm === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loginIdentifier">Username or Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="loginIdentifier"
                    placeholder="johndoe or johndoe@example.com"
                    className="pl-10"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="loginPassword">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="loginPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoginLoading}>
                {isLoginLoading ? "Logging in..." : "Log in"}
              </Button>
              <div className="text-center text-sm">
                <span>Don't have an account?{" "}</span>
                <Button variant="link" onClick={() => setActiveForm('signup')} className="p-0">
                  Sign up
                </Button>
              </div>
              <div className="text-center text-sm mt-2">
                <Button variant="link" onClick={() => setActiveForm('forgot')} className="p-0">
                  Forgot Password?
                </Button>
              </div>
            </form>
          )}
          {activeForm === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signupUsername">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signupUsername"
                    placeholder="johndoe"
                    className="pl-10"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signupEmail">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="johndoe@example.com"
                    className="pl-10"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signupPassword">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signupPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signupConfirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signupConfirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isSignupLoading}>
                {isSignupLoading ? "Creating Account..." : "Create Account"}
              </Button>
              <div className="text-center text-sm">
                <span>Already have an account?{" "}</span>
                <Button variant="link" onClick={() => setActiveForm('login')} className="p-0">
                  Log in
                </Button>
              </div>
            </form>
          )}
          {activeForm === 'forgot' && (
            <>
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="forgotEmail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="forgotEmail"
                        type="email"
                        placeholder="johndoe@example.com"
                        className="pl-10"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isForgotLoading}>
                    {isForgotLoading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                  <div className="text-center text-sm">
                    <Button variant="link" onClick={() => setActiveForm('login')} className="p-0">
                      Back to Login
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="enteredOtp">Enter OTP</Label>
                    <div className="relative">
                      <Input
                        id="enteredOtp"
                        placeholder="Enter OTP"
                        className="pl-10"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmNewPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isForgotLoading}>
                    {isForgotLoading ? "Resetting Password..." : "Reset Password"}
                  </Button>
                  <div className="text-center text-sm">
                    <Button variant="link" onClick={() => setActiveForm('login')} className="p-0">
                      Back to Login
                    </Button>
                  </div>
                </form>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
