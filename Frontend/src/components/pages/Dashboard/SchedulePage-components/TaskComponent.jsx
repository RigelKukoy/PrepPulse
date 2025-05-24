import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash, Edit2 } from "lucide-react";
import { useContext, useState } from "react";
import { z } from "zod";
import { DashboardContext } from "../DashboardContext";

const formSchema = z.object({
  task_description: z
    .string()
    .min(5, "task description must at least have 5 letters"),
});

function TaskComponent({ tasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(tasks.task_description);
  const [formError, setFormError] = useState({});
  const { onSchedulePage } = useContext(DashboardContext);

  const handleInputChange = (e) => {
    setNewDescription(e.target.value);
  };

  const formatFormData = () => {
    const updatedDescription = {
      ...tasks,
      task_description: newDescription,
    };

    return updatedDescription;
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const formData = formatFormData();

    const validatedForm = formSchema.safeParse(formData);

    if (!validatedForm.success) {
      const { fieldErrors } = validatedForm.error.flatten();
      setFormError(fieldErrors);
    } else {
      try {
        const response = await fetch(
          `http://localhost:5000/api/schedule/${onSchedulePage.schedID}/tasks/${tasks.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validatedForm.data),
          }
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setIsEditing(false);
      } catch (error) {
        console.log("Caught the error:", error.message);
      }
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/schedule/${onSchedulePage.schedID}/tasks/${tasks.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Delete failed with status ${response.status}`);
      }

      const result = response.json();
      console.log("Deleted", result);
    } catch (error) {
      console.log("Error deleting task", error);
      alert("Failed to delete task");
    }
  };
  return (
    <div className="flex py-2 items-center border-b-2 border-slate-100 font-normal text-[16px]">
      {isEditing ? (
        <form className="flex flex-1 flex-col" onSubmit={handleOnSubmit}>
          <div className="flex flex-1 w-full flex-row gap-2">
            <input
              placeholder="enter task...."
              className="flex flex-1 px-2 border-2 border-gray-300"
              autoFocus
              value={newDescription}
              onChange={handleInputChange}
            />
            <Button>save</Button>
          </div>
          {formError.task_description && (
            <div className="text-red-400 text-sm pl-1 inline-block">
              {formError.task_description[0]}
            </div>
          )}
        </form>
      ) : (
        <div className="flex flex-1 flex-row items-center">
          <Checkbox checked={tasks.is_checked} className="mr-2" />
          <div className="flex flex-1">{tasks.task_description}</div>
          <div className="flex flex-row p-2 gap-3">
            <div
              onClick={() => {
                setIsEditing(true);
              }}
              className="py-1 px-1 bg-slate-800 rounded-sm hover:bg-slate-500 active:scale-90"
            >
              <Edit2 className="w-4 h-4 text-white" />
            </div>
            <div
              onClick={handleDeleteTask}
              className="py-1 px-1 bg-slate-800 rounded-sm  hover:bg-red-500 active:scale-90"
            >
              <Trash className="w-4 h-4 text-white " />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskComponent;
