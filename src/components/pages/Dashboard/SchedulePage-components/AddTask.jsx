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
      <div className="flex flex-row ">
        <Input
          placeholder="task description...."
          className="mr-2 "
          value={inputValue}
          onChange={handleInputChange}
        ></Input>
        <Button className="rounded-md active:scale-90 transition-transform cursor-pointer ">
          <PlusCircleIcon />
        </Button>
      </div>
    </form>
  );
}

export default AddTask;
