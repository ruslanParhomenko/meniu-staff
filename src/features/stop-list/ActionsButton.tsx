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
};

export const ActionsButton = ({
  formFields,
  idx,
  item,
  disabled,
}: ActionsButtonProps) => {
  const handleRemove = () => {
    if (formFields.fields.length === 1) {
      formFields.replace([defaultStopList]);
    } else {
      formFields.remove(idx);
    }
  };

  const handleAdd = () => {
    const lastItem = formFields.fields[formFields.fields.length - 1];
    if (lastItem.product) {
      formFields.append(defaultStopList);
    }
  };

  return (
    <div className="flex md:flex-row flex-col gap-2 md:justify-start justify-end">
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
