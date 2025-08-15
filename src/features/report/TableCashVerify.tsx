"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { HOURS } from "./schema";
import NumericInput from "@/components/inputs/NumericInput";

export default function TableCashVerify() {
  return (
    <div className="w-full py-4">
      <Label className="text-lg font-semibold pb-7">Cash Verify</Label>
      <Table className="[&_th]:text-center [&_td]:text-center">
        <TableHeader>
          <TableRow>
            {HOURS.map((hour) => (
              <TableHead key={hour}>{hour}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {HOURS.map((hour, idx) => (
              <TableCell key={hour}>
                <NumericInput
                  fieldName={`cashVerify.${idx}.value`}
                  className="w-12! text-center"
                />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
