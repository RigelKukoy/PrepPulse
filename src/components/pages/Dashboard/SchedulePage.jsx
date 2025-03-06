import { ChevronLeftIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskToAccomplish from "./SchedulePage-components/TaskToAccomplish";
import References from "./SchedulePage-components/References";
import SchedCountdown from "./SchedulePage-components/SchedCountdown";

// eslint-disable-next-line react/prop-types
function SchedulePage({
  setOnSchedulePage,
  clickedSched,
  scheduleDatabase,
  scheduleTasks,
  scheduleReferences,
}) {
  function handleChevronClick() {
    setOnSchedulePage(null);
  }

  const scheduleToDisplay = scheduleDatabase.filter(
    (sched) => sched.id === clickedSched.schedID
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
        <SchedCountdown scheduleTime={clickedSched.schedule} />
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
            <TaskToAccomplish
              scheduleTasks={scheduleTasks}
              schedID={clickedSched.schedID}
            />
          </TabsContent>
          <TabsContent value="references">
            <References
              scheduleReferences={scheduleReferences}
              schedID={clickedSched.schedID}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default SchedulePage;
