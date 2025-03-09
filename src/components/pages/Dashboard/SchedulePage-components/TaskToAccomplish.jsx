import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TaskComponent from "./TaskComponent";
import AddTask from "./AddTask";
import { useContext } from "react";
import { DashboardContext } from "../DashboardContext";

function TaskToAccomplish() {
  const { scheduleTasks, onSchedulePage } = useContext(DashboardContext);
  const taskToDisplay = scheduleTasks.filter(
    (tasks) => tasks.schedID === onSchedulePage.schedID
  );

  return (
    <Card className="flex flex-col ">
      <CardHeader>
        <CardTitle>Tasks to accomplish</CardTitle>
        <CardDescription>Complete these task to be prepared!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {taskToDisplay.map((tasks) => (
            <TaskComponent key={tasks.id} tasks={tasks} />
          ))}
        </div>
        <AddTask />
      </CardContent>
    </Card>
  );
}

export default TaskToAccomplish;
