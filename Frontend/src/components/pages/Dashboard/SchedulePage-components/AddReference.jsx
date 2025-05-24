import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { DashboardContext } from "../DashboardContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import sanitizeUrl from "../DashboardUtil/sanitizeUrl";

const formSchema = z.object({
  reference_title: z.string().min(5, "Title must contain at least 5 letters"),
  reference_description: z.string(),
  reference_link: z.preprocess(
    sanitizeUrl,
    z.string().url({ message: "Please enter a valid URL" })
  ),
});

function AddReference({ setIsAddingReferences }) {
  const { onSchedulePage } = useContext(DashboardContext);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reference_title: "",
      reference_description: "",
      reference_link: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/schedule/${onSchedulePage.schedID}/references`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Request Failed ${response.status}`);
      }

      const result = await response.json();
      console.log("Submitted form", result.data);
    } catch (error) {
      setError("root", {
        message: "failed to add new reference, please try again",
      });
    }

    setIsAddingReferences(false);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col bg-slate-200 p-5 rounded-xl mt-2">
        <div className="font-bold text-lg mb-2">Add new references</div>
        <div className="flex flex-col flex-1 gap-1">
          <Input
            {...register("reference_title")}
            placeholder="Reference title"
            className="mr-2 bg-white py-5 px-2"
          />
          {errors.reference_title && (
            <div className="text-red-400 text-sm pl-1">
              {errors.reference_title.message}
            </div>
          )}
          <Input
            {...register("reference_description")}
            placeholder="Reference description..."
            className="mr-2 bg-white py-5 px-2"
          />
          <Input
            {...register("reference_link")}
            placeholder="Reference-link"
            className="mr-2 bg-white py-5 px-2"
          />
          {errors.reference_link && (
            <div className="text-red-400 text-sm pl-1">
              {errors.reference_link.message}
            </div>
          )}
        </div>
        <Button className="w-full sm:w-auto mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Adding new reference..." : "Add reference"}
        </Button>
      </div>
    </form>
  );
}

export default AddReference;
