import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import CountdownBox from "./CountdownBox";

dayjs.extend(duration);
dayjs.extend(relativeTime);

function SchedCountdown({ scheduleTime }) {
  const [scheduleCountdown, setScheduleCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const dayToday = dayjs();
      const upcomingDay = dayjs(scheduleTime);

      const timeLeft = upcomingDay.diff(dayToday);

      console.log(timeLeft);
      const durationObj = dayjs.duration(timeLeft);

      if (timeLeft > 0) {
        setScheduleCountdown({
          days: durationObj.days(),
          hours: durationObj.hours(),
          minutes: durationObj.minutes(),
          seconds: durationObj.seconds(),
        });

        console.log(scheduleCountdown);
      } else {
        clearInterval(interval);
        setScheduleCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [scheduleTime]);

  return (
    <div className="flex w-full h-full justify-center items-center text-white text-2xl font-bold bg-[length:400%_400%] bg-[position:0%_0%] relative overflow-hidden rounded-b-[100px]">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-300 to-blue-50"></div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/60 via-transparent to-blue-300/50"></div>

      {/* Bottom subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-400/50"></div>

      {/* Content container */}
      <div className="relative z-10">
        <div className="flex flex-row justify-center items-center text-3xl gap-2 p-2">
          <CountdownBox time={scheduleCountdown.days} unit="Day/s" />
          :
          <CountdownBox time={scheduleCountdown.hours} unit="Hour/s" />
          :
          <CountdownBox time={scheduleCountdown.minutes} unit="Minute/s" />
          :
          <CountdownBox time={scheduleCountdown.seconds} unit="Second/s" />
        </div>
      </div>
    </div>
  );
}

export default SchedCountdown;
