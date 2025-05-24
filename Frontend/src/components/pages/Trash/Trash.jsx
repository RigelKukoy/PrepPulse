import ScheduleGrid from "../Dashboard/ScheduleGrid";
import { useEffect, useContext } from "react";
import SchedulePage from "../Dashboard/SchedulePage";

import { DashboardContext } from "../Dashboard/DashboardContext";

function TrashPage() {
  const { onSchedulePage, setCurrentPage } = useContext(DashboardContext);
  useEffect(() => {
    console.log("onSchedulePage changed:", onSchedulePage);
  }, [onSchedulePage]);

  useEffect(() => {
    setCurrentPage("trash");
  }, []);

  return (
    <div className="w-full">
      {onSchedulePage ? <SchedulePage /> : <ScheduleGrid />}
    </div>
  );
}

export default TrashPage;
