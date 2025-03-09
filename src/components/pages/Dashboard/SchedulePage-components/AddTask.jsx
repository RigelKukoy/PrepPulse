import { Input } from "@/components/ui/input";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ShortUniqueId from "short-unique-id";

function AddTask({ setScheduleTasks, schedID }) {
  const [inputValue, setInputValue] = useState("");

  const uid = new ShortUniqueId();

  const generateUniqueID = () => uid.randomUUID();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const taskID = generateUniqueID();
    const taskInput = inputValue;

    const newTask = {
      id: taskID,
      schedID: schedID,
      taskDescription: taskInput,
      isChecked: false,
    };

    setScheduleTasks((prevScheduleTasks) => [...prevScheduleTasks, newTask]);
    setInputValue("");
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="flex flex-col bg-slate-200 p-5 rounded-xl mt-2">
        <div className="font-bold text-lg mb-2">Add new task</div>
        <div className="flex flex-row">
          <Input
            placeholder="task description...."
            className="mr-2 bg-white py-5 px-2"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button className="rounded-md active:scale-90 transition-transform cursor-pointer h-auto">
            <PlusCircleIcon className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddTask;
