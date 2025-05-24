import { ArrowLeft } from "lucide-react";
import SchedCountdown from "./SchedulePage-components/SchedCountdown";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "./DashboardContext";
import SchedulePageLoading from "@/components/ui/SchedulePageLoading";
import ScheduleContent from "./SchedulePage-components/ScheduleContent";

// eslint-disable-next-line react/prop-types
function SchedulePage() {
  const {
    onSchedulePage,
    setOnSchedulePage,
    setScheduleReferences,
    setScheduleTasks,
  } = useContext(DashboardContext);
  const [scheduleToDisplay, setScheduleToDisplay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function handleChevronClick() {
    setOnSchedulePage(null);
    setScheduleToDisplay(null);
  }

  useEffect(() => {
    const fetchScheduleToDisplay = async () => {
      try {
        if (!onSchedulePage || !onSchedulePage.schedID) {
          console.error("Schedule data not available");
          setIsLoading(false);
          return;
        }
        const response = await fetch(
          `http://localhost:5000/api/schedule/${onSchedulePage.schedID}`
        );
        const result = await response.json();

        if (response.ok) {
          console.log("Schedule data received:", result.data);
          setScheduleToDisplay(result.data[0]);
        } else {
          console.error("API returned an error:", result);
        }
      } catch (error) {
        console.error("Failed to fetch schedule data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScheduleToDisplay();

    const interval = setInterval(fetchScheduleToDisplay, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, [onSchedulePage.schedID]);

  // In SchedulePage.jsx
  useEffect(() => {
    if (scheduleToDisplay) {
      const { tasks = [], references = [] } = scheduleToDisplay; // Provide default empty arrays
      setScheduleReferences(references);
      setScheduleTasks(tasks);
    }
  }, [scheduleToDisplay, setScheduleReferences, setScheduleTasks]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <SchedulePageLoading className="flex" />
      </div>
    );
  }

  const { schedule } = scheduleToDisplay;
  return (
    <div className="flex h-full flex-col bg-blue-50 relative">
      <div className="flex h-[40%] flex-col">
        <button
          className="flex-none p-0 bg-blue-200 rounded-lg text-white absolute top-6 left-6 z-20 hover:bg-blue-300 transition-transform "
          onClick={handleChevronClick}
        >
          <div className="flex flex-row p-2 items-center">
            <ArrowLeft className="w-5 h-5" />
            Return
          </div>
        </button>
        <SchedCountdown scheduleTime={schedule.sched} />
      </div>
      <div className="p-2 absolute top-60 w-full">
        <ScheduleContent schedule={schedule} />
      </div>
    </div>
  );
}

export default SchedulePage;
