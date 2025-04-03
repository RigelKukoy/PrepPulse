import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash, Edit2 } from "lucide-react";

function TaskComponent({ tasks }) {
  console.log(tasks.id);
  return (
    <div className="flex py-2 items-center border-b-2 border-slate-100 font-normal text-[16px]">
      <Checkbox className="mr-2" />
      <div className="flex flex-1">{tasks.taskDescription}</div>
      <div className="flex flex-row p-2 gap-3">
        <div className="py-1 px-1 bg-slate-800 rounded-sm">
          <Edit2 className="w-4 h-4 text-white " />
        </div>
        <div className="py-1 px-1 bg-slate-800 rounded-sm">
          <Trash className="w-4 h-4 text-white " />
        </div>
      </div>
    </div>
  );
}

export default TaskComponent;
