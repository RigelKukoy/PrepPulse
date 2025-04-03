/* eslint-disable react/prop-types */
import ScheduleCard from "./ScheduleCard";
import AddSchedule from "./AddSchedule";
import { useContext, useEffect } from "react";
import { DashboardContext } from "./DashboardContext";

function ScheduleGrid() {
  const { Schedule, setSchedule } = useContext(DashboardContext);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/schedule`);
        const schedules = await response.json();
        if (response.ok) {
          setSchedule(schedules.data);
        } else {
          console.log("Error fetching schedules", schedules.message);
        }
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full  p-4 flex-1">
      {Schedule.map((sched) => (
        <ScheduleCard key={sched.id} {...sched} />
      ))}

      <AddSchedule />
    </div>
  );
}

export default ScheduleGrid;
