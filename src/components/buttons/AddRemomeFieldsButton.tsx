import { Button } from "@/components/ui/button";
import { UseFieldArrayReturn } from "react-hook-form";

export function AddRemomeFieldsButton({
  formField,
  defaultValues,
  index,
  disabled,
}: {
  formField: UseFieldArrayReturn<any>;
  defaultValues: any;
  index: number;
  disabled?: boolean;
}) {
  return (
    <>
      {formField.fields.length === 1 ? (
        <>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => formField.replace(defaultValues)}
            disabled={disabled}
          >
            -
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => formField.append(defaultValues)}
            disabled={disabled}
          >
            +
          </Button>
        </>
      ) : index === formField.fields.length - 1 ? (
        <>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => formField.replace(defaultValues)}
            disabled={disabled}
          >
            -
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => formField.append(defaultValues)}
            disabled={disabled}
          >
            +
          </Button>
        </>
      ) : (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={() => formField.remove(index)}
          disabled={disabled}
        >
          -
        </Button>
      )}
    </>
  );
}
