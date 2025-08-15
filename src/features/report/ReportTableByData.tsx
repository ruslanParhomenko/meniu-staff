"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CashVerify } from "@/generated/prisma";
import { useRouter } from "@/i18n/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export const ReportTableByData = ({ report }: any) => {
  const tUI = useTranslations("UI");
  const t = useTranslations("Settings");
  const session = useSession();
  const router = useRouter();
  const isAdmin =
    session.data?.user?.email === "parhomenkogm@gmail.com" ||
    session.data?.user?.email === "cng.nv.rstrnt.mngr@gmail.com";

  if (!report) return <div>Loading...</div>;

  const cashColumns: CashVerify[][] = [[], []];
  report.cashVerify.forEach((item: CashVerify, idx: number) => {
    cashColumns[idx % 2].push(item);
  });

  const deleteReportList = async (id: number) => {
    if (!isAdmin) return toast.error(t("insufficientRights"));
    await fetch(`/api/report/${id}`, { method: "DELETE" });
    toast.success("Бар отчет успешно удалён !");

    router.refresh();
  };

  return (
    <div className="space-y-6 pt-6">
      <div className="text-lg font-semibold">
        {new Date(report.date).toLocaleDateString(undefined, {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </div>

      <div className="grid grid-cols-[40%_10%] gap-50">
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
            {report.tobacco.map((t: any) => (
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
              <TableHead>Expenses</TableHead>
              <TableHead>Sum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {report.expenses.map((e: any) => (
              <TableRow key={e.id}>
                <TableCell className="text-center">{e.name || "—"}</TableCell>
                <TableCell className="text-center">{e.sum || "0"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 ">
        {cashColumns.map((col, i) => (
          <div key={i} className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hours</TableHead>
                  {col.map((c) => (
                    <TableHead key={c.id}>{c.hours}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Value</TableCell>
                  {col.map((c) => (
                    <TableCell key={c.id}>{c.value ?? "—"}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
      <div className="flex justify-start items-center p-5 pt-10 gap-4">
        <Button
          type="button"
          variant={"default"}
          onClick={() => deleteReportList(report.id)}
        >
          {tUI("delete")}
        </Button>
      </div>
    </div>
  );
};
