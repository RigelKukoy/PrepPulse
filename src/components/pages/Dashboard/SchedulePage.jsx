import { ChevronLeftIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskToAccomplish from "./SchedulePage-components/TaskToAccomplish";
import References from "./SchedulePage-components/References";
import SchedCountdown from "./SchedulePage-components/SchedCountdown";
import { useContext } from "react";
import { DashboardContext } from "./DashboardContext";

// eslint-disable-next-line react/prop-types
function SchedulePage() {
  const { Schedule, onSchedulePage, setOnSchedulePage } =
    useContext(DashboardContext);

  function handleChevronClick() {
    setOnSchedulePage(null);
  }

  const scheduleToDisplay = Schedule.filter(
    (sched) => sched.id === onSchedulePage.schedID
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-1/2 flex-col">
        <button
          className="flex-none p-2 text-gray-600 hover:text-red-500 transition-transform "
          onClick={handleChevronClick}
        >
          <ChevronLeftIcon />
        </button>
        <SchedCountdown scheduleTime={onSchedulePage.schedule} />
      </div>
      <div className="bg-white shadow-lg p-2 ">
        {scheduleToDisplay.map((sched) => (
          <>
            <div className="p-3">
              <div className="flex h-[6vh] font-bold items-center text-3xl">
                {sched.title}
              </div>
              <div className="flex flex-1 font-light text-lg text-slate-500">
                {sched.description}
              </div>
            </div>
          </>
        ))}
        <Tabs defaultValue="tasks" className="w-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tasks">Must do tasks</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks" className="flex-1">
            <TaskToAccomplish />
          </TabsContent>
          <TabsContent value="references">
            <References />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default SchedulePage;
