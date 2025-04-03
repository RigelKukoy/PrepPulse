import { createContext, useState } from "react";
import { tasks, references } from "@/data";

export const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [onSchedulePage, setOnSchedulePage] = useState(null);
  const [Schedule, setSchedule] = useState([]);
  const [scheduleTasks, setScheduleTasks] = useState(tasks);
  const [scheduleReferences, setScheduleReferences] = useState(references);

  return (
    <DashboardContext.Provider
      value={{
        onSchedulePage,
        setOnSchedulePage,
        Schedule,
        setSchedule,
        scheduleTasks,
        setScheduleTasks,
        scheduleReferences,
        setScheduleReferences,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
