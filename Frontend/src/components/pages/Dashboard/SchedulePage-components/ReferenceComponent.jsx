import { useState } from "react";
import ActiveReference from "./referenceComponent/ActiveReference";
import EditingReference from "./referenceComponent/EditingReference";

function ReferenceComponent({ reference }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <EditingReference setIsEditing={setIsEditing} reference={reference} />
      ) : (
        <ActiveReference setIsEditing={setIsEditing} reference={reference} />
      )}
    </>
  );
}

export default ReferenceComponent;
