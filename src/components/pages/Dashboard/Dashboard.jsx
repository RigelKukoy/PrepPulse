import ScheduleGrid from "./ScheduleGrid";
import { useState, useEffect } from "react";
import SchedulePage from "./SchedulePage";
import { schedule } from "@/data";
import { tasks } from "@/data";

function Dashboard() {
  const [onSchedulePage, setOnSchedulePage] = useState(null);
  const [Schedule, setSchedule] = useState(schedule);
  const [scheduleTasks, setScheduleTasks] = useState(tasks);

  useEffect(() => {
    console.log("onSchedulePage changed:", onSchedulePage);
  }, [onSchedulePage]);

  return (
    <>
      <div className="w-full">
        {onSchedulePage ? (
          <SchedulePage
            setOnSchedulePage={setOnSchedulePage}
            clickedSched={onSchedulePage}
            scheduleDatabase={Schedule}
            scheduleTasks={scheduleTasks}
          />
        ) : (
          <ScheduleGrid
            onSchedulePage={onSchedulePage}
            setOnSchedulePage={setOnSchedulePage}
            scheduleDatabase={Schedule}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;
