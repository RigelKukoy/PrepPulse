/* eslint-disable react/prop-types */
import ScheduleCard from "./ScheduleCard";
import AddSchedule from "./AddSchedule";
import { useContext, useEffect } from "react";
import { DashboardContext } from "./DashboardContext";

function ScheduleGrid() {
  const { Schedule } = useContext(DashboardContext);
  useEffect(() => {
    console.log("Updated sched:", Schedule);
  }, [Schedule]);

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
