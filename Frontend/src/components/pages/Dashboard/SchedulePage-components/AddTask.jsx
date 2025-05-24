import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { DashboardContext } from "../DashboardContext";
import { z } from "zod";

const formSchema = z.object({
  task_description: z
    .string()
    .min(5, "Task description must at least be 5 letters"),
});

function AddTask({ setIsAddingTask }) {
  const [inputValue, setInputValue] = useState("");
  const [formError, setFormError] = useState({});
  const { onSchedulePage } = useContext(DashboardContext);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const formatTaskData = () => {
    const taskInput = inputValue;

    const newTask = {
      task_description: taskInput,
    };

    return newTask;
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const formData = formatTaskData();

    const validatedForm = formSchema.safeParse(formData);

    if (!validatedForm.success) {
      const { fieldErrors } = validatedForm.error.flatten();
      setFormError(fieldErrors);
      console.log("Field errors:", fieldErrors);
    } else {
      try {
        const response = await fetch(
          `http://localhost:5000/api/schedule/${onSchedulePage.schedID}/tasks`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validatedForm.data),
          }
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();
        console.log("Submitted form:", result.data);
        setIsAddingTask(false);
      } catch (error) {
        console.log("Caught the error:", error.message);
      }
    }

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
            autoFocus
          />
          <Button className="active:scale-90 transition-transform cursor-pointer h-auto rounded-sm">
            Add task
          </Button>
        </div>
        {formError.task_description && (
          <div className="text-red-400 text-sm pl-1 inline-block">
            {formError.task_description[0]}
          </div>
        )}
      </div>
    </form>
  );
}

export default AddTask;
