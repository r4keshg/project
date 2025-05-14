import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Persist theme selection
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Update login state on route changes
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    toast({ title: "Logged out", description: "You have been logged out" });
    navigate("/");
  };

  const handleProfileClick = () => {
    // Instead of showing a profile page, always open the merged authentication page (signup/login).
    navigate("/auth");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-bold text-primary">
          VSkill Arena
        </Link>

        <div className="flex items-center space-x-6">
          <button onClick={() => setIsDark(!isDark)} className="text-gray-700 dark:text-gray-200">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button onClick={handleProfileClick} className="text-gray-700 dark:text-gray-200">
            <User className="h-5 w-5" />
          </button>
          {/* Optionally, if the user is logged in, you could show a logout button:
          {isLoggedIn && (
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          )} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
