import { Checkbox } from "@/components/ui/checkbox";

function TaskComponent({ tasks }) {
  console.log(tasks.id);
  return (
    <div className="flex py-2 items-center border-b-2 border-slate-100 font-normal text-[16px]">
      <Checkbox className="mr-2" />
      {tasks.taskDescription}
    </div>
  );
}

export default TaskComponent;
