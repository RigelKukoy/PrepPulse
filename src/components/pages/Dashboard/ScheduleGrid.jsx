/* eslint-disable react/prop-types */
import ScheduleCard from "./ScheduleCard";
import AddSchedule from "./AddSchedule";
import { useEffect } from "react";

function ScheduleGrid({
  setOnSchedulePage,
  setScheduleDatabase,
  scheduleDatabase,
}) {
  useEffect(() => {
    console.log("Updated sched:", scheduleDatabase);
  }, [scheduleDatabase]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full  p-4 flex-1">
      {scheduleDatabase.map((sched) => (
        <ScheduleCard key={sched.id} {...sched} setPage={setOnSchedulePage} />
      ))}

      <AddSchedule Schedule={scheduleDatabase} onChange={setScheduleDatabase} />
    </div>
  );
}

export default ScheduleGrid;
