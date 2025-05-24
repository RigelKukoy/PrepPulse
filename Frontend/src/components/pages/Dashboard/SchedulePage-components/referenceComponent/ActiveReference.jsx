import { Edit2, ExternalLink, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardContext } from "../../DashboardContext";
import { useContext } from "react";

function ActiveReference({ reference, setIsEditing }) {
  const { onSchedulePage } = useContext(DashboardContext);
  const deleteTask = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch(
        `http://localhost:5000/api/schedule/${onSchedulePage.schedID}/references/${reference.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`Request Failed ${response.status}`);
      }

      const result = await response.json();
      console.log("Deleted", result);
    } catch (error) {
      console.log("Error deleting task", error);
      alert("Failed to delete task");
    }
  };
  return (
    <a
      href={
        reference.reference_link.startsWith("http")
          ? reference.reference_link
          : `https://${reference.reference_link}`
      }
      target="_blank"
      rel="noopener noreferrer"
      className="border rounded-lg bg-white hover:bg-gray-50 transition-colors duration-300"
    >
      <div className="flex flex-col py-2 px-3 group">
        <div className="flex flex-row items-center text-xl font-medium rounded-xl ">
          <div className="flex flex-1 flex-row items-center gap-2">
            <div className="truncate overflow-hidden whitespace-nowrap">
              {reference.reference_title}
            </div>
            <ExternalLink className="w-4 h-4" />
          </div>

          <div className="flex justify-end items-center opacity-0  group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              className="bg-gray-50 shadow-none text-slate-700  hover:bg-emerald-50 hover:text-emerald-600"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              <Edit2 />
            </Button>

            <Button
              size="sm"
              className="bg-gray-50 text-slate-700 shadow-none  hover:bg-red-50 hover:text-red-600 "
              onClick={deleteTask}
            >
              <Trash />
            </Button>
          </div>
        </div>
        <div className="text-sm font-normal text-slate-500">
          {reference.reference_description}
        </div>
      </div>
    </a>
  );
}

export default ActiveReference;
