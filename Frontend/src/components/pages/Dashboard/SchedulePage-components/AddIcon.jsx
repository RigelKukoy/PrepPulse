import { PlusCircle } from "lucide-react";

function AddIcon({ setState }) {
  const handleButtonClick = () => {
    setState(true);
  };
  return (
    <div
      className="flex flex1 p-2 justify-center items-center shadow-md border-2 border-slate-200 active:scale-95 transition-transform"
      onClick={handleButtonClick}
    >
      <PlusCircle />
    </div>
  );
}

export default AddIcon;
