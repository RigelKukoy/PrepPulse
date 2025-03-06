import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReferenceComponent from "./ReferenceComponent";

function References({ scheduleReferences, schedID }) {
  const ReferencesToDisplay = scheduleReferences.filter(
    (reference) => reference.schedID === schedID
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
        </div>
      </CardContent>
    </Card>
  );
}

export default References;
