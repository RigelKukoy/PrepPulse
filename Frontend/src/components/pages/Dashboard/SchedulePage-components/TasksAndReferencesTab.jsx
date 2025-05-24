import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardContext } from "../DashboardContext";
import { useContext } from "react";
import TaskToAccomplish from "./TaskToAccomplish";
import References from "./References";

function TasksAndReferencesTab() {
  const { scheduleTasks, scheduleReferences } = useContext(DashboardContext);
  return (
    <div className="flex flex-1 justify-center">
      <div className="flex w-[90%] bg-white p-2 rounded-lg shadow-black/10 shadow-lg">
        <Tabs defaultValue="tasks" className="flex flex-col flex-1">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-lg shadow-black/10">
            <TabsTrigger value="tasks">Must do tasks</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks" className="flex-1">
            <TaskToAccomplish tasksData={scheduleTasks} />
          </TabsContent>
          <TabsContent value="references">
            <References referencesData={scheduleReferences} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default TasksAndReferencesTab;
