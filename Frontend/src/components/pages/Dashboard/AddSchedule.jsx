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
import { useState } from "react";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  schedule_description: z.string(),
  sched: z.date().refine((date) => date > new Date(), {
    message: "Date must be in the future",
  }),
});

function AddSchedule() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      schedule_description: "",
      sched: null,
    },
  });

  function getScheduleDate(schedObject) {
    const dateTimeObject = new Date(schedObject);
    const scheduleDayjs = dayjs(dateTimeObject);
    const formattedDate = scheduleDayjs.format("MMMM D, YYYY");
    return formattedDate;
  }

  function getScheduleTime(schedObject) {
    const dateTimeObject = new Date(schedObject);
    const scheduleDayjs = dayjs(dateTimeObject);
    const formattedTime = scheduleDayjs.format("h:mm A");
    return formattedTime;
  }

  function formatFormData(data) {
    const formattedDate = getScheduleDate(data.sched);
    const formattedTime = getScheduleTime(data.sched);

    const completeForm = {
      ...data,
      sched: data.sched.toISOString(),
      date: formattedDate,
      time: formattedTime,
    };

    return completeForm;
  }

  const showScheduleCreatedToaster = (undoCallback) => {
    toast("Event has been created", {
      description: "New schedule has successfully been added!",
      action: {
        label: "Undo",
        onClick: () => undoCallback(),
      },
    });
  };

  const undoScheduleCreated = () => {
    console.log("schedule deleted");
  };

  const onSubmit = async (data) => {
    const formData = formatFormData(data);

    try {
      const response = await fetch("http://localhost:5000/api/schedule/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();

      console.log("Submitted form:", result.data);
    } catch (error) {
      setError("root", {
        message: "Failed to create schedule, please try again",
      });
    }
    showScheduleCreatedToaster(undoScheduleCreated);

    setOpen(false);
    reset();
  };

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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("title")}
              type="text"
              className="outline-none border-0 border-b-2 w-full text-2xl"
              placeholder="ADD TITLE"
            />
            {errors.title && (
              <div className="text-red-400 text-sm pl-1">
                {errors.title.message}
              </div>
            )}
            <label className="mt-3 inline-block" htmlFor="schedule-description">
              Schedule description
            </label>
            <textarea
              {...register("schedule_description")}
              id="schedule-description"
              type="text"
              className="outline-none border-2 w-full min-h-[150px] h-auto resize-none py-2 px-2"
              placeholder="Enter description here..."
            ></textarea>
          </div>

          <div className="mb-4 mt-3">
            <label>
              Choose date and time:
              <Controller
                name="sched"
                control={control}
                defaultValue={null}
                rules={{ required: "Date and time required" }}
                render={({ field }) => {
                  return (
                    <DateTimePicker
                      id="dateTimePicker"
                      selectedSchedule={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
              {errors.sched && (
                <div className="text-red-400 text-sm pl-1">
                  {errors.sched.message}
                </div>
              )}
            </label>
          </div>

          <Button
            className="bg-black text-[white] hover:bg-slate-600 active:scale-95"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddSchedule;
