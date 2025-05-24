import ScheduleGrid from "./ScheduleGrid";
import { useState, useEffect, useContext } from "react";
import SchedulePage from "./SchedulePage";

import { DashboardContext } from "./DashboardContext";

function Dashboard() {
  const { onSchedulePage, setCurrentPage } = useContext(DashboardContext);
  useEffect(() => {
    console.log("onSchedulePage changed:", onSchedulePage);
  }, [onSchedulePage]);

  useEffect(() => {
    setCurrentPage("dashboard");
  }, []);

  return (
    <div className="w-full">
      {onSchedulePage ? <SchedulePage /> : <ScheduleGrid />}
    </div>
  );
}

export default Dashboard;
