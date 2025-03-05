import { useEffect, useState } from "react";
import dayjs from "dayjs";

function ScheduleCard(props) {
  const [countdownDays, setCountdownDays] = useState(null);

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

    updateCountdown();

    interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [props.date]);

  function handleOnClick() {
    props.setPage({ schedID: props.id, schedule: props.sched });
  }

  return (
    <div
      className="flex flex-1 flex-col min-h-44 w-full p-5 bg-white rounded-2xl shadow-lg transition-transform hover:scale-105 gap-1 cursor-pointer"
      onClick={handleOnClick}
    >
      <div className="flex w-full h-1/3 items-center justify-center border-b border-slate-400 text-2xl text-gray-700 font-bold">
        {countdownDays}
      </div>
      <div className="flex flex-1 flex-col text-xs justify-evenly">
        <div className="font-semibold text-gray-700 text-base">
          {props.title}
        </div>
        <div>{props.date}</div>
        <div>{props.time}</div>
        <div>progress</div>
      </div>
    </div>
  );
}

export default ScheduleCard;
