import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TaskComponent from "./TaskComponent";
import AddTask from "./AddTask";
import { useContext, useState } from "react";
import { DashboardContext } from "../DashboardContext";
import AddIcon from "./AddIcon";

function TaskToAccomplish() {
  const { scheduleTasks, onSchedulePage } = useContext(DashboardContext);

  const [isAddingTask, setIsAddingTask] = useState(false);

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
        {isAddingTask ? (
          <AddTask setIsAddingTask={setIsAddingTask} />
        ) : (
          <AddIcon setState={setIsAddingTask} />
        )}
      </CardContent>
    </Card>
  );
}

export default TaskToAccomplish;
