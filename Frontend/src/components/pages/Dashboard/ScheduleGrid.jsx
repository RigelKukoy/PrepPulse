/* eslint-disable react/prop-types */
import ScheduleCard from "./ScheduleCard";
import AddSchedule from "./AddSchedule";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "./DashboardContext";
import SchedulePageLoading from "@/components/ui/SchedulePageLoading";
import SortByComponent from "./ScheduleGridComponents/SortByComponent";

function ScheduleGrid() {
  const { Schedule, setSchedule, currentPage } = useContext(DashboardContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortDir, setSortDir] = useState("");
  const [isDeletedval, setIsDeletedval] = useState(false);

  useEffect(() => {
    console.log("currentPage changed:", currentPage);
    // Update isDeletedval when currentPage changes
    if (currentPage === "trash") {
      setIsDeletedval(true);
    } else {
      setIsDeletedval(false);
    }
  }, [currentPage]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        if (!Schedule) {
          console.error("Schedule data not available");
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/schedule?sortBy=${sortBy}&sortDir=${sortDir}&is_deleted=${isDeletedval}`
        );
        const schedules = await response.json();
        if (response.ok) {
          setSchedule(schedules.data);
        } else {
          console.log("Error fetching schedules", schedules.message);
          setIsError(true);
        }
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const interval = setInterval(() => {
      fetchSchedule();
    }, 1000);
    console.log(sortDir, sortBy, isDeletedval, currentPage);
    return () => clearInterval(interval);
  }, [sortBy, sortDir, isDeletedval, currentPage, Schedule, setSchedule]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <SchedulePageLoading className="flex" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-row pt-4 px-5">
        <div className="text-3xl font-bold flex-start flex-1 items-center">
          {currentPage === "dashboard" ? "Your Calendar" : "Your History"}
        </div>
        <div className="flex flex-end w-[20%] mr-2">
          <SortByComponent setSortBy={setSortBy} setSortDir={setSortDir} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full p-5 flex-1">
        {Schedule.map((sched) => (
          <ScheduleCard key={sched.id} {...sched} />
        ))}

        <AddSchedule />
      </div>
    </>
  );
}

export default ScheduleGrid;
