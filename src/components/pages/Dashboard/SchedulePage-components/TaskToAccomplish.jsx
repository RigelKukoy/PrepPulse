import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AddTask from "./AddTask";

function TaskToAccomplish() {
  return (
    <Card className="flex flex-col ">
      <CardHeader>
        <CardTitle>Tasks to accomplish</CardTitle>
        <CardDescription>Complete these task to be prepared!</CardDescription>
      </CardHeader>
      <CardContent>
        <AddTask />
      </CardContent>
    </Card>
  );
}

export default TaskToAccomplish;
