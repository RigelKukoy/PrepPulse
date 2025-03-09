import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

function TaskComponent({ tasks }) {
  console.log(tasks.id);
  return (
    <div className="flex py-2 items-center border-b-2 border-slate-100 font-normal text-[16px]">
      <Checkbox className="mr-2" />
      <div className="flex flex-1">{tasks.taskDescription}</div>
      <div className="rounded-3xl py-1 px-1 bg-red-400">
        <XIcon className="w-5 h-5 text-white " />
      </div>
    </div>
  );
}

export default TaskComponent;
