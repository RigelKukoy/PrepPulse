import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReferenceComponent from "./ReferenceComponent";
import AddReference from "./AddReference";
import { useState } from "react";

import AddIcon from "./AddIcon";

function References({ referencesData }) {
  const [isAddingReferences, setIsAddingReferences] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>References</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {referencesData.map((reference) => (
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
