import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReferenceComponent from "./ReferenceComponent";
import AddReference from "./AddReference";
import { useContext } from "react";
import { DashboardContext } from "../DashboardContext";

function References() {
  const { scheduleReferences, onSchedulePage } = useContext(DashboardContext);
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
          <AddReference />
        </div>
      </CardContent>
    </Card>
  );
}

export default References;
