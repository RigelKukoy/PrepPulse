import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TaskComponent from "./TaskComponent";
import AddTask from "./AddTask";
import { useState } from "react";

import AddIcon from "./AddIcon";

function TaskToAccomplish({ tasksData }) {
  const [isAddingTask, setIsAddingTask] = useState(false);

  console.log("Tasks:", tasksData);

  return (
    <Card className="flex flex-col ">
      <CardHeader>
        <CardTitle>Tasks to accomplish</CardTitle>
        <CardDescription>Complete these task to be prepared!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {tasksData.map((tasks) => (
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
