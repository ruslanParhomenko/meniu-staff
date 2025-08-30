"use client";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActionsButton } from "./ActionsButton";
import { useAbility } from "@/providers/AbilityProvider";
import { useTranslations } from "next-intl";
import {
  MENU_ITEMS_CUCINA,
  PRODUCTS,
  PRODUCTS_CUCINA,
} from "../report/bar/constants";
import { UseFieldArrayReturn } from "react-hook-form";
import { StopListSchemaType } from "./schema";
import SelectFieldWithSearch from "@/components/inputs/SelectWithSearch";

type StopLitTableProps = {
  formFields: UseFieldArrayReturn<
    StopListSchemaType,
    "stopList" | "stopListCucina"
  >;
  nameTag: "bar" | "cucina";
};

export const StopListTable = ({ formFields, nameTag }: StopLitTableProps) => {
  const t = useTranslations("Home");
  const { isObserver, isCucina, isBar, isUser } = useAbility();

  const LABEL = {
    bar: "stopList",
    cucina: "stopListCucina",
  } as const;
  const DATA_PRODUCTS = {
    bar: PRODUCTS,
    cucina: [...new Set([...PRODUCTS_CUCINA, ...MENU_ITEMS_CUCINA])],
  };
  const DISABLED = {
    bar: isObserver || isCucina || isUser,
    cucina: isObserver || isBar || isUser,
  };
  return (
    <div className="xl:px-5">
      <Label className="text-lg font-semibold pb-7">{t(LABEL[nameTag])}</Label>
      <Table className="[&_th]:text-center [&_td]:text-center table-fixed md:w-180 ">
        <TableHeader>
          <TableRow className="h-10">
            <TableHead className="md:w-90 w-40">Product</TableHead>
            <TableHead className="md:w-50 w-25">Date</TableHead>
            <TableHead className="text-left md:w-40 w-20">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formFields.fields.map((item, idx) => (
            <TableRow key={item.id}>
              <TableCell>
                <SelectFieldWithSearch
                  data={DATA_PRODUCTS[nameTag]}
                  fieldName={`${LABEL[nameTag]}.${idx}.product`}
                  disabled={DISABLED[nameTag]}
                  className="h-10"
                />
              </TableCell>
              <TableCell className="text-center">
                {item.product && (
                  <div className="text-center" style={{ color: "#7F1D1D" }}>
                    {item.date}
                  </div>
                )}
              </TableCell>
              <TableCell className="flex justify-start">
                <ActionsButton
                  formFields={formFields}
                  idx={idx}
                  item={item}
                  disabled={DISABLED[nameTag]}
                />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
