import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { ArrowUpNarrowWideIcon } from "lucide-react";
import { ArrowUpWideNarrowIcon } from "lucide-react";
import { ClockArrowUpIcon, ClockArrowDownIcon } from "lucide-react";
import { useState, useEffect } from "react";

function SortByComponent({ setSortBy, setSortDir }) {
  const [value, setValue] = useState("");
  console.log(value);

  function setSortingStates(SortValue) {
    try {
      if (SortValue !== "") {
        const parsedSortByValue = JSON.parse(SortValue);
        setSortBy(parsedSortByValue.sortBy);
        setSortDir(parsedSortByValue.sortDir);
      } else {
        setSortBy("sched");
        setSortDir("asc");
      }
    } catch (error) {
      console.error("JSON parse failed:", error);
    }
  }

  useEffect(() => {
    setSortingStates(value);
  }, [value]);

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="">
        <SelectValue placeholder="Sort schedule" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            value={JSON.stringify({ sortBy: "sched", sortDir: "desc" })}
          >
            <div className="flex items-center gap-2">
              <ClockArrowDownIcon className="w-4 h-4 text-green-500" />
              <span>Far From Due</span>
            </div>
          </SelectItem>

          <SelectItem
            value={JSON.stringify({ sortBy: "sched", sortDir: "asc" })}
          >
            <div className="flex items-center gap-2 mr-2">
              <ClockArrowUpIcon className="w-4 h-4 text-red-500" />
              <span>Most Close to Due</span>
            </div>
          </SelectItem>

          <SelectItem
            value={JSON.stringify({
              sortBy: "progress_percentage",
              sortDir: "desc",
            })}
          >
            <div className="flex items-center gap-2">
              <ArrowUpWideNarrowIcon className="w-4 h-4  text-green-500" />
              <span>Most Tasks Completes</span>
            </div>
          </SelectItem>
          <SelectItem
            value={JSON.stringify({
              sortBy: "progress_percentage",
              sortDir: "asc",
            })}
          >
            <div className="flex items-center gap-2">
              <ArrowUpNarrowWideIcon className="w-4 h-4 text-red-500" />
              <span>Least Tasks Completed</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortByComponent;
