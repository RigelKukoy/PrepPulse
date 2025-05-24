import { createContext, useState } from "react";

export const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [onSchedulePage, setOnSchedulePage] = useState(null);
  const [Schedule, setSchedule] = useState([]);
  const [scheduleTasks, setScheduleTasks] = useState([]);
  const [scheduleReferences, setScheduleReferences] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard')

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
        currentPage,
        setCurrentPage
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
