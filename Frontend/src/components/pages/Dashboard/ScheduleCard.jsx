import { useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import { DashboardContext } from "./DashboardContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Pen } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import cn from "classnames";

function ScheduleCard(props) {
  const { setOnSchedulePage } = useContext(DashboardContext);
  const [countdownDays, setCountdownDays] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    let interval;
    const updateCountdown = () => {
      const dayToday = dayjs();
      console.log(dayToday);
      const upcomingDay = dayjs(props.sched);
      console.log(upcomingDay);
      const years = upcomingDay.diff(dayToday, "year");
      if (years > 0) {
        return setCountdownDays(`${years} year${years > 1 ? "s" : ""} left`);
      }

      const months = upcomingDay.diff(dayToday, "month");
      if (months > 0) {
        return setCountdownDays(`${months} month${months > 1 ? "s" : ""} left`);
      }

      const days = upcomingDay.diff(dayToday, "day");
      console.log(days);
      if (days > 0) {
        return setCountdownDays(`${days} day${days > 1 ? "s" : ""} left`);
      }

      const hours = upcomingDay.diff(dayToday, "hour");
      if (hours > 0) {
        return setCountdownDays(`${hours} hour${hours > 1 ? "s" : ""} left`);
      }

      const minutes = upcomingDay.diff(dayToday, "minute");
      if (minutes > 0) {
        return setCountdownDays(
          `${minutes} minute${minutes > 1 ? "s" : ""} left`
        );
      }

      const seconds = upcomingDay.diff(dayToday, "second");
      if (seconds > 0) {
        return setCountdownDays(
          `${seconds} second${seconds > 1 ? "s" : ""} left`
        );
      }
      clearInterval(interval);
      setCountdownDays("Ongoing!");
    };

    const updateTaskProgress = () => {
      const completed = props.progress;
      const total = props.total_tasks;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      setProgressPercentage(percentage);
    };

    updateTaskProgress();
    updateCountdown();

    interval = setInterval(updateCountdown, 10000);

    return () => clearInterval(interval);
  }, [props.date]);

  function handleOnClick() {
    setOnSchedulePage({ schedID: props.id });
  }

  const getDaysLeft = () => {
    const targetDate = dayjs(props.sched);
    const now = dayjs();
    return targetDate.diff(now, "day");
  };

  const getCardColorScheme = () => {
    if (getDaysLeft() < 4) {
      return {
        header: "bg-red-500",
        lightBg: "bg-red-50",
        hoverBg: "hover:bg-red-100",
        textColor: "text-red-600",
      };
    } else if (getDaysLeft() >= 4 && getDaysLeft() < 15) {
      return {
        header: "bg-orange-500",
        lightBg: "bg-orange-50",
        hoverBg: "hover:bg-orange-100",
        textColor: "text-orange-600",
      };
    } else {
      return {
        header: "bg-blue-500",
        lightBg: "bg-blue-50",
        hoverBg: "hover:bg-blue-100",
        textColor: "text-blue-600",
      };
    }
  };

  const getProgressColor = () => {
    if (progressPercentage < 30) {
      return {
        color: "[&>div]:bg-red-500",
        textColor: "text-red-400",
      };
    } else if (progressPercentage < 70) {
      return {
        color: "[&>div]:bg-yellow-500",
        textColor: "text-yellow-600",
      };
    } else {
      return {
        color: "[&>div]:bg-green-500",
        textColor: "text-green-600",
      };
    }
  };

  const cardColor = getCardColorScheme();
  const progressColor = getProgressColor();

  return (
    <Card
      className="flex flex-1 flex-col min-h-44 w-full rounded-2xl shadow-lg transition-transform hover:scale-105 cursor-pointer"
      onClick={handleOnClick}
    >
      <CardHeader
        className={cn("py-3 px-4 rounded-t-2xl w-full", cardColor.header)}
      >
        <div className="flex flex-1 flex-row">
          <div className="flex flex-1 text-lg text-white font-bold items-center gap-2">
            <Pen className="h-5 w-5" />
            {countdownDays}
          </div>
          <div className="flex items-center justify-center bg-white/30 backdrop-blur-xl rounded-full px-2 py-[2px]">
            <span className="text-xs font-medium text-white leading-tight">
              {props.date}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent
        className={cn(
          "flex flex-1 py-3 px-4 flex-col",
          cardColor.lightBg,
          cardColor.hoverBg
        )}
      >
        <div className="flex flex-1 flex-col text-xs justify-evenly">
          <div className={cn("font-semibold text-lg", cardColor.textColor)}>
            {props.title}
          </div>
          <div className="flex flex-row gap-2 items-center text-sm text-gray-500">
            <Clock className="h-5 w-5" />
            {props.time}
          </div>
          <div className="text-gray-500 text-sm font-light line-clamp-2 overflow-hidden max-h-12">
            {props.schedule_description}
          </div>
        </div>

        <div className="mt-auto text-xs">
          <div className="flex flex-1 pt-4 text-gray-500 text-xs font-semibold">
            Preparation Progress
          </div>

          <div className="pt-1">
            <Progress
              className={cn(progressColor.color)}
              value={progressPercentage}
            />
          </div>

          {props.totaltasks === 0 ? (
            <div className="flex flex-1 justify-end pt-1">
              <div className="text-gray-500 ">
                No preparation tasks added yet
              </div>
            </div>
          ) : (
            <div className="flex flex-1 justify-end pt-1">
              <div className={cn("flex gap-1", progressColor.textColor)}>
                <CheckCircle2 className="h-4 w-4 " />
                {props.progress} of {props.total_tasks} tasks completed (
                {progressPercentage}%)
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ScheduleCard;
