"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import {
  defaultStopList,
  StopListItemSchemaType,
  StopListSchemaType,
} from "./schema";
import { UseFieldArrayReturn, useFormContext } from "react-hook-form";

type ActionsButtonProps = {
  formFields: UseFieldArrayReturn<StopListSchemaType>;
  idx: number;
  item: StopListItemSchemaType;
  disabled: boolean;
  saveMutation: {
    mutate: (payload: StopListSchemaType) => void;
  };
};

export const ActionsButton = ({
  formFields,
  idx,
  item,
  disabled,
  saveMutation,
}: ActionsButtonProps) => {
  const { getValues } = useFormContext();

  const handleRemove = () => {
    if (formFields.fields.length === 1) {
      formFields.replace([defaultStopList]);
    } else {
      formFields.remove(idx);
    }

    saveMutation.mutate({
      id: 1,
      stopList: getValues("stopList").filter((i: any) => i.product),
      stopListCucina: getValues("stopListCucina").filter((i: any) => i.product),
    });
  };

  const handleAdd = () => {
    const lastItem = formFields.fields[formFields.fields.length - 1];
    if (lastItem.product) {
      formFields.append(defaultStopList);
    }
  };

  return (
    <div className="flex gap-2 justify-start items-center">
      {(item.product || idx === formFields.fields.length - 1) && (
        <Button
          type="button"
          variant="destructive"
          onClick={handleRemove}
          disabled={disabled}
        >
          <Minus />
        </Button>
      )}
      {idx === formFields.fields.length - 1 && (
        <Button
          type="button"
          variant="outline"
          onClick={handleAdd}
          disabled={disabled || !item.product}
        >
          <Plus />
        </Button>
      )}
    </div>
  );
};
