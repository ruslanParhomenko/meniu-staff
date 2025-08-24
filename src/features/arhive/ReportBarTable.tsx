"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CashVerify } from "@/generated/prisma";

export const ReportBarTable = ({ data }: { data: any }) => {
  return (
    <>
      <div className="border border-gray-200 rounded-md md:p-4">
        <div className="grid grid-cols-1 md:grid-cols-[60%_30%] gap-10 pb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tobacco</TableHead>
                <TableHead className="text-center"></TableHead>
                <TableHead className="text-center">in</TableHead>
                <TableHead className="text-center">out</TableHead>
                <TableHead className="text-center"></TableHead>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">expenses</TableHead>
                <TableHead className="text-center">sum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.expenses
                .filter((e: any) => e.name !== "")
                .map((e: any) => (
                  <TableRow>
                    <TableCell className="text-center" key={`name-${e.id}`}>
                      {e.name || "—"} :
                    </TableCell>
                    <TableCell className="text-center" key={`sum-${e.id}`}>
                      {e.sum || "0"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">hours:</TableCell>
              {data.cashVerify
                .filter((c: CashVerify) => c.value !== "0")
                .map((c: CashVerify) => (
                  <TableCell key={`h-${c.id}`}>
                    {c?.hours?.split(":")[0] || "—"}
                  </TableCell>
                ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">value:</TableCell>
              {data.cashVerify
                .filter((c: CashVerify) => c.value !== "0")
                .map((c: CashVerify) => (
                  <TableCell key={`v-${c.id}`}>{c.value || "—"}</TableCell>
                ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};
