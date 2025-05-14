import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { 
  BookOpen, 
  Trophy, 
  Users, 
  LogOut,
  Home,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function Sidebar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: "Odyssey", href: "/odyssey", icon: Home },
    { name: "Arena", href: "/arena", icon: BookOpen },
    { name: "Tribe", href: "/tribe", icon: Users },
  ];

  return (
    <div className="flex h-screen flex-col gap-y-5 bg-sidebar border-r border-sidebar-border p-6">
      <div className="flex h-16 shrink-0 items-center justify-between">
        <div className="flex items-center">
          <Trophy className="h-8 w-8 text-primary" />
          <span className="ml-2 text-2xl font-bold text-sidebar-foreground">VSkill</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <a
                        className={cn(
                          location === item.href
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                        )}
                      >
                        <Icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>

          <li className="mt-auto">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 px-2 text-sm text-sidebar-foreground">
                <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                  {user?.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{user?.username}</p>
                  <p className="text-xs text-sidebar-foreground/70">{user?.rank}</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => logoutMutation.mutate()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}