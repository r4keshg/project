import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { format, eachDayOfInterval, subDays, isEqual } from "date-fns";

interface ActivityCalendarProps {
  activityDates: Date[];
}

export function ActivityCalendar({ activityDates }: ActivityCalendarProps) {
  const days = useMemo(() => {
    const today = new Date();
    const lastYear = subDays(today, 365);
    return eachDayOfInterval({ start: lastYear, end: today });
  }, []);

  const getActivityLevel = (date: Date) => {
    const count = activityDates.filter(d => isEqual(d, date)).length;
    if (count === 0) return "bg-muted";
    if (count <= 2) return "bg-emerald-200 dark:bg-emerald-900";
    if (count <= 4) return "bg-emerald-400 dark:bg-emerald-700";
    return "bg-emerald-600 dark:bg-emerald-500";
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Activity Calendar</h3>
      <div className="grid grid-cols-53 gap-1">
        {days.map((day) => (
          <Tooltip key={day.toISOString()}>
            <TooltipTrigger>
              <div
                className={`w-3 h-3 rounded-sm ${getActivityLevel(day)}`}
                aria-label={format(day, "PP")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{format(day, "PP")}</p>
              <p className="text-sm text-muted-foreground">
                {activityDates.filter(d => isEqual(d, day)).length} activities
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Card>
  );
}
