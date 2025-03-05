import ScheduleGrid from "./ScheduleGrid";
import { useState, useEffect } from "react";
import SchedulePage from "./SchedulePage";
import { schedule } from "@/data";

function Dashboard() {
  const [onSchedulePage, setOnSchedulePage] = useState(null);
  const [Schedule, setSchedule] = useState(schedule);

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
