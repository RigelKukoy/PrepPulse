import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import TasksAndReferencesTab from "./TasksAndReferencesTab";

function ScheduleContent({ schedule }) {
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    if (schedule) {
      const completed = schedule.progress;
      const total = schedule.totaltasks;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      setProgressPercentage(percentage);
      console.log("Completed:", completed, "Total:", total);

      console.log(percentage);
    }
  }, [schedule]);
  return (
    <>
      <div className="flex flex-1 justify-center">
        <div className="p-3 mb-5 w-[90%] bg-white rounded-2xl shadow-lg shadow-black/10">
          <div className="flex h-[6vh] text-blue-700 font-bold items-center text-3xl">
            {schedule.title}
          </div>
          <div className="flex flex-1 font-light text-lg ">
            {schedule.schedule_description}
          </div>
          <div className="flex flex-1 flex-col text-sm text-gray-500 mt-4">
            <div className="flex flex-row mb-1">
              <div className="flex flex-1">Progress</div>
              <div>{`${progressPercentage}%`}</div>
            </div>
            <Progress value={progressPercentage} />
          </div>
        </div>
      </div>
      <TasksAndReferencesTab />
    </>
  );
}

export default ScheduleContent;
