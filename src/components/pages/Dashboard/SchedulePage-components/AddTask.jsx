import { Input } from "@/components/ui/input";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function AddTask() {
  return (
    <div className="flex flex-row ">
      <Input placeholder="task description...." className="mr-2 "></Input>
      <Button className="rounded-md active:scale-90 transition-transform cursor-pointer ">
        <PlusCircleIcon />
      </Button>
    </div>
  );
}

export default AddTask;
