import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ShortUniqueId from "short-unique-id";

function AddReference({ schedID, setScheduleReferences }) {
  const uid = new ShortUniqueId();

  const generateUniqueID = () => uid.randomUUID();

  function handleOnSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    const referenceID = generateUniqueID();
    const newReferenceTitle = formData.get("reference-title");
    const newReferenceDescription = formData.get("reference-description");
    const newReferenceLink = formData.get("reference-link");

    const newReference = {
      id: referenceID,
      schedID: schedID,
      title: newReferenceTitle,
      description: newReferenceDescription,
      link: newReferenceLink,
    };

    console.log(newReference);

    setScheduleReferences((prevScheduleReferences) => [
      ...prevScheduleReferences,
      newReference,
    ]);
  }
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="flex flex-col bg-slate-200 p-5 rounded-xl mt-2">
        <div className="font-bold text-lg mb-2">Add new references</div>
        <div className="flex flex-col flex-1 gap-1">
          <Input
            placeholder="Reference title"
            name="reference-title"
            className="mr-2 bg-white py-5 px-2"
          />
          <Input
            placeholder="Reference description..."
            name="reference-description"
            className="mr-2 bg-white py-5 px-2"
          />
          <Input
            placeholder="Reference-link"
            name="reference-link"
            className="mr-2 bg-white py-5 px-2"
          />
        </div>
        <Button className="w-full sm:w-auto mt-2">Add reference</Button>
      </div>
    </form>
  );
}

export default AddReference;
