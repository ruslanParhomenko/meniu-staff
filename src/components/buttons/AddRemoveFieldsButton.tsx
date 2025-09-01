import { Button } from "@/components/ui/button";
import { UseFieldArrayReturn } from "react-hook-form";

export function AddRemoveFieldsButton({
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
  const isOnlyOne = formField.fields.length === 1;
  const isLast = index === formField.fields.length - 1;

  const handleRemove = () => {
    if (isOnlyOne) {
      formField.replace(defaultValues);
    } else {
      formField.remove(index);
    }
  };

  return (
    <div className="flex gap-1 justify-center items-center">
      <Button
        type="button"
        variant={"outline"}
        size="icon"
        className="border-rd border-1 text-rd"
        onClick={handleRemove}
        disabled={disabled}
      >
        -
      </Button>

      {(isOnlyOne || isLast) && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="text-bl border-bl border-1"
          onClick={() => formField.append(defaultValues)}
          disabled={disabled}
        >
          +
        </Button>
      )}
    </div>
  );
}
