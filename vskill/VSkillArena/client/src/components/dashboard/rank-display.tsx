import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User } from "@shared/schema";
import { Trophy, Flame, Coins } from "lucide-react";
import { rankThresholds, getNextRank, getRankColor } from "@/lib/ranks";
import { cn } from "@/lib/utils";

interface RankDisplayProps {
  user: User;
}

export function RankDisplay({ user }: RankDisplayProps) {
  const nextRank = getNextRank(user.rank as any);
  const currentThreshold = rankThresholds[user.rank as keyof typeof rankThresholds];
  const nextThreshold = nextRank ? rankThresholds[nextRank as keyof typeof rankThresholds] : currentThreshold;
  const progress = ((user.coins - currentThreshold) / (nextThreshold - currentThreshold)) * 100;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-4 flex items-center gap-4">
        <div className={cn("p-2 rounded-lg", getRankColor(user.rank as any))}>
          <Trophy className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Rank</p>
          <h3 className={cn("text-2xl font-bold", getRankColor(user.rank as any))}>
            {user.rank}
          </h3>
          {nextRank && (
            <div className="mt-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Next rank: {nextRank}
              </p>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-4">
        <div className="p-2 rounded-lg bg-orange-100 text-orange-700">
          <Coins className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Coins</p>
          <h3 className="text-2xl font-bold text-orange-700">{user.coins}</h3>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-4">
        <div className="p-2 rounded-lg bg-red-100 text-red-700">
          <Flame className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Streak</p>
          <h3 className="text-2xl font-bold text-red-700">{user.streak} days</h3>
        </div>
      </Card>
    </div>
  );
}