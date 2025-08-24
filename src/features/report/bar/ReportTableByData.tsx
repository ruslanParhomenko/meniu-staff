"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteListButton } from "@/features/ui/DeleteListButton";
import { CashVerify } from "@/generated/prisma";

export const ReportTableByData = ({
  data,
  refetch,
}: {
  data: any;
  refetch?: () => void;
}) => {
  return (
    <div className="space-y-6 pt-6">
      <div className="text-lg font-semibold">
        {new Date(data.date).toLocaleDateString(undefined, {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </div>

      <div className="grid md:grid-cols-2 md:gap-10 grid-cols-1 gap-4 border border-gray-200 rounded-md p-1">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tobacco</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead className="text-center">Incoming</TableHead>
                <TableHead className="text-center">Outgoing</TableHead>
                <TableHead className="text-center">Final</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.tobacco.map((t: any) => (
                <TableRow key={t.id}>
                  <TableCell>{t?.name}</TableCell>
                  <TableCell className="text-center">
                    {t?.stock.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {t?.incoming.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {t?.outgoing.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {t?.finalStock?.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col items-center space-y-8">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Expenses</TableHead>
                <TableHead>Sum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.expenses.map((e: any) => {
                if (e.name === "") return;
                return (
                  <TableRow key={e.id}>
                    <TableCell>{e.name || "—"}</TableCell>
                    <TableCell>{e.sum || "0"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Hours</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.cashVerify.map((c: CashVerify) => {
                if (c.value === "0") return;
                return (
                  <TableRow key={c.id}>
                    <TableCell>{c.hours ?? "—"}</TableCell>
                    <TableCell>{c.value ?? "—"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <DeleteListButton id={data?.id || 0} api={"report"} refetch={refetch} />
      </div>
    </div>
  );
};
