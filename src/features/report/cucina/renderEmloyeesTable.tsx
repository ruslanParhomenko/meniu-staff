import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { defaultShift, ReportCucinaType } from "./schema";

type renderEmloyeesTableProps = {
  form: UseFormReturn<ReportCucinaType>;
  employeesArray: string[];
  timeArray: string[];
  overArray: string[];
};

export const RenderEmloyeesTable = ({
  form,
  employeesArray,
  timeArray,
  overArray,
}: renderEmloyeesTableProps) => {
  const shifts = useFieldArray({ control: form.control, name: "shifts" });
  return (
    <div className="border border-gray-200 md:p-4 p-2 rounded-2xl">
      {shifts.fields.map((field, index) => (
        <div key={field.id} className="flex items-center py-1">
          <div className="grid grid-cols-[40%_25%_15%] gap-1 md:grid-cols-[50%_20%_15%] md:gap-3 w-full ">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={"сотрудник"} />
              </SelectTrigger>
              <SelectContent>
                {employeesArray.map((item: any, index) => (
                  <SelectItem key={`${item}+${index}`} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={"смена"} />
              </SelectTrigger>
              <SelectContent>
                {timeArray.map((item: any, index) => (
                  <SelectItem key={`${item}+${index}`} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={"овер"} />
              </SelectTrigger>
              <SelectContent>
                {overArray.map((item: any, index) => (
                  <SelectItem key={`${item}+${index}`} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            {shifts.fields.length === 1 ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => shifts.append(defaultShift)}
                >
                  +
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => shifts.replace(defaultShift)}
                >
                  -
                </Button>
              </>
            ) : index === shifts.fields.length - 1 ? (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => shifts.append(defaultShift)}
              >
                +
              </Button>
            ) : (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => shifts.remove(index)}
              >
                -
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
