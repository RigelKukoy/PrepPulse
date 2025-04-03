import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReferenceComponent from "./ReferenceComponent";
import AddReference from "./AddReference";
import { useContext, useState } from "react";
import { DashboardContext } from "../DashboardContext";
import AddIcon from "./AddIcon";

function References() {
  const { scheduleReferences, onSchedulePage } = useContext(DashboardContext);
  const [isAddingReferences, setIsAddingReferences] = useState(false);

  const ReferencesToDisplay = scheduleReferences.filter(
    (reference) => reference.schedID === onSchedulePage.schedID
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>References</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {ReferencesToDisplay.map((reference) => (
            <ReferenceComponent key={reference.id} reference={reference} />
          ))}
          {isAddingReferences ? (
            <AddReference setIsAddingReferences={setIsAddingReferences} />
          ) : (
            <AddIcon setState={setIsAddingReferences} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default References;
