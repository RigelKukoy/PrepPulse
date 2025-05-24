import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import sanitizeUrl from "../../DashboardUtil/sanitizeUrl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SaveIcon, XIcon } from "lucide-react";
import { DashboardContext } from "../../DashboardContext";
import { useContext } from "react";

const formSchema = z.object({
  reference_title: z
    .string()
    .min(5, "reference title must at least contain 5 letter"),
  reference_description: z.string(),
  reference_link: z.preprocess(
    sanitizeUrl,
    z.string().url({ message: "Please enter a valid URL" })
  ),
});

function EditingReference({ reference, setIsEditing }) {
  const { onSchedulePage } = useContext(DashboardContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reference_title: reference.reference_title,
      reference_description: reference.reference_description,
      reference_link: reference.reference_link,
    },
  });

  console.log(reference);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/schedule/${onSchedulePage.schedID}/references/${reference.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Request Failed ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      setIsEditing(false);
    } catch (error) {
      setError("root", {
        message: "failed to add new reference, please try again",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col bg-slate-50 p-5 gap-4 border border-slate-200 rounded-lg">
        <div className="flex flex-col gap-1 font-normal">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="reference_title"
          >
            title
          </label>
          <Input
            {...register("reference_title")}
            id="reference_title"
            className="bg-white"
            placeholder="Enter reference title..."
          ></Input>
          {errors.reference_title && (
            <div className="text-red-400 text-sm pl-1">
              {errors.reference_title.message}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="reference_description"
          >
            Description
          </label>
          <Textarea
            {...register("reference_description")}
            id="reference_description"
            className="border px-3 py-2 bg-white"
            placeholder="Enter reference description..."
          ></Textarea>
        </div>
        <div className="flex flex-col">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="reference_link"
          >
            Link
          </label>
          <Input
            {...register("reference_link")}
            id="reference_link"
            placeholder="Enter reference link..."
            className="bg-white"
          ></Input>
          {errors.reference_link && (
            <div className="text-red-400 text-sm pl-1">
              {errors.reference_link.message}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-3">
          <Button
            size="sm"
            className="text-slate-500 bg-white border hover:bg-slate-100"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            <XIcon />
            Close
          </Button>
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Updating..."
            ) : (
              <div className="flex flex-row gap-2">
                <SaveIcon />
                Save
              </div>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default EditingReference;
