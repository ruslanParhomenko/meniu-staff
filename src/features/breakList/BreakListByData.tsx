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
import { useRouter } from "@/i18n/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export default function BreakListTable({
  data,
  refetch,
  refetchId,
}: {
  data: any;
  refetch: any;
  refetchId: any;
}) {
  const session = useSession();
  const router = useRouter();
  const isAdmin =
    session.data?.user?.email === "parhomenkogm@gmail.com" ||
    session.data?.user?.email === "cng.nv.rstrnt.mngr@gmail.com";
  const tUI = useTranslations("UI");
  const t = useTranslations("Settings");
  if (!data || !data.rows?.length) {
    return null;
  }
  const allHours = data.rows?.[0]?.hours.map((h: any) => h.hour) || [];

  const deleteBreakList = async (id: number) => {
    if (!isAdmin) return toast.error(t("insufficientRights"));
    await fetch(`/api/breakList/${id}`, { method: "DELETE" });
    toast.success("Брейк-лист успешно удалён !");
    refetch();
    refetchId();
    router.refresh();
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead></TableHead>
            {allHours.map((hour: string) => (
              <TableHead key={hour} className="text-center">
                {hour}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.rows?.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>{row.externalId}</TableCell>
              <TableCell>{row.name ?? "-"}</TableCell>
              {row.hours.map((h: any) => (
                <TableCell key={h.id} className="text-center">
                  {h.value || "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-start items-center p-5 pt-10 gap-4">
        <Button
          type="button"
          variant={"default"}
          onClick={() => deleteBreakList(data.id)}
        >
          {tUI("delete")}
        </Button>
      </div>
    </div>
  );
}
