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
        <div className="grid grid-cols-1 md:grid-cols-[40%_40%] gap-10 pb-4">
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
              {data?.tobacco?.map((t: any) => (
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
          <div className="flex flex-col items-center justify-between gap-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">expenses</TableHead>
                  <TableHead className="text-center">sum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.expenses
                  ?.filter((e: any) => e.name !== "")
                  .map((e: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell className="text-center">
                        {e.name || "—"} :
                      </TableCell>
                      <TableCell className="text-center">
                        {e.sum || "0"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">product</TableHead>
                  <TableHead className="text-center">quantity</TableHead>
                  <TableHead className="text-center">destination</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.productTransfer
                  ?.filter((e: any) => e.name !== "")
                  .map((e: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell className="text-center">
                        {e.name || "—"} :
                      </TableCell>
                      <TableCell className="text-center">
                        {e.quantity || "0"}
                      </TableCell>
                      <TableCell className="text-center">
                        {e.destination || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-bold">hours:</TableCell>
                  {data.cashVerify
                    ?.filter((c: CashVerify) => c.value !== "0")
                    .map((c: CashVerify) => (
                      <TableCell key={`h-${c.id}`}>
                        {c?.hours?.split(":")[0] || "—"}
                      </TableCell>
                    ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">value:</TableCell>
                  {data.cashVerify
                    ?.filter((c: CashVerify) => c.value !== "0")
                    .map((c: CashVerify) => (
                      <TableCell key={`v-${c.id}`}>{c.value || "—"}</TableCell>
                    ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
