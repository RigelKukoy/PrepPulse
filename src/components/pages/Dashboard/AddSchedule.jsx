/* eslint-disable react/prop-types */
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "./AddSchedule-components/DateTimepicker";
import { useContext, useState } from "react";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useEffect } from "react";
import { DashboardContext } from "./DashboardContext";
import ChooseColor from "./AddSchedule-components/ChooseColor";

function AddSchedule() {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [open, setOpen] = useState(false);
  const { Schedule, setSchedule } = useContext(DashboardContext);
  let generatedID = 1;

  useEffect(() => {
    makeNewId(Schedule);
  }, [Schedule]);

  function deleteSchedule(ScheduleID) {
    setSchedule((prevState) =>
      prevState.filter((sched) => sched.id !== ScheduleID)
    );
  }

  function getScheduleDate(scheduleDateTime) {
    const dateTimeObject = new Date(scheduleDateTime);
    const scheduleDayjs = dayjs(dateTimeObject);

    const formattedDate = scheduleDayjs.format("MMMM D, YYYY");

    console.log(formattedDate);

    return formattedDate;
  }

  function getScheduleTime(scheduleDateTime) {
    const dateTimeObject = new Date(scheduleDateTime);
    const scheduleDayjs = dayjs(dateTimeObject);

    const formattedTime = scheduleDayjs.format("h:mm A");
    console.log(formattedTime);
    return formattedTime;
  }

  function makeNewId(ScheduleDB) {
    const scheduleLength = ScheduleDB.length;
    const lastID = ScheduleDB[scheduleLength - 1]?.id;

    if (scheduleLength === 0) {
      return generatedID;
    } else {
      generatedID = lastID + 1;
      return generatedID;
    }
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);

    const newTitle = formData.get("schedule-title");
    const newDescription = formData.get("schedule-description");
    console.log(formData);

    const newDate = getScheduleDate(selectedSchedule);
    const newTime = getScheduleTime(selectedSchedule);
    const newID = makeNewId(Schedule);

    const newSched = {
      id: newID,
      title: newTitle,
      description: newDescription,
      date: newDate,
      time: newTime,
      sched: selectedSchedule,
    };

    setSchedule((prevSched) => [...prevSched, newSched]);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex-1 flex-col min-h-44 w-full p-5 bg- rounded-2xl shadow-lg transition-transform hover:scale-105 gap-1 cursor-pointer">
          <div className="flex flex-1 flex-col h-full items-center justify-center">
            <PlusCircle size={70} color="lightgray" className="mb-4" />
            <span className="text-gray-400">Add Schedule</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Add Schedule</DialogTitle>
          <DialogDescription>
            Set the date, time, and details for your upcoming exam or event.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleOnSubmit}>
          <div>
            <input
              type="text"
              name="schedule-title"
              className="outline-none border-0 border-b-2 w-full mb-2 text-2xl"
              placeholder="ADD TITLE"
              required
            ></input>
            <label htmlFor="schedule-description">Schedule description</label>
            <textarea
              name="schedule-description"
              id="schedule-description"
              className="outline-none border-2 w-full min-h-[150px] h-auto resize-none py-2 px-2"
              placeholder="Enter description here..."
            ></textarea>
          </div>
          <div className="mb-2">
            <label>
              Choose date and time:
              <DateTimePicker
                id="dateTimePicker"
                selectedSchedule={selectedSchedule}
                onChange={setSelectedSchedule}
              />
            </label>
          </div>

          <div>
            <ChooseColor />
          </div>
          <Button
            className="bg-black text-[white] hover:bg-slate-600 active:scale-95"
            type="submit"
            onClick={() =>
              toast("Event has been created", {
                description: "New schedule has successfully been added! ",
                action: {
                  label: "Undo",
                  onClick: () => deleteSchedule(generatedID),
                },
              })
            }
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddSchedule;
