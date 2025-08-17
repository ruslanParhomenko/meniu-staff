import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { RemarkReport } from "@/generated/prisma";
import { useRouter } from "@/i18n/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

type Props = {
  data: any;
  onDelete?: () => void;
};

export default function RemarksTableByData({ data, onDelete }: Props) {
  const tUI = useTranslations("UI");
  const t = useTranslations("Settings");
  const session = useSession();
  const router = useRouter();
  const isAdmin =
    session.data?.user?.email === "parhomenkogm@gmail.com" ||
    session.data?.user?.email === "cng.nv.rstrnt.mngr@gmail.com";

  if (!data) return <div>Loading...</div>;

  const deleteReportList = async (id: number) => {
    if (!isAdmin) return toast.error(t("insufficientRights"));

    const res = await fetch(`/api/remarks/${id}`, { method: "DELETE" });
    if (!res.ok) {
      return toast.error("Ошибка при удалении");
    }

    toast.success("Отчет успешно удалён !");
    // вызываем callback для родителя
    onDelete?.();
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">
        {new Date(data.date).toLocaleDateString()}
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-bold">Name</TableCell>
            <TableCell className="font-bold">day hours</TableCell>
            <TableCell className="font-bold">night hours</TableCell>
            <TableCell className="font-bold">Reason</TableCell>
            <TableCell className="font-bold">penality</TableCell>
            <TableCell className="font-bold">reason penality</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.remarks.map((remark) => (
            <TableRow key={remark.id}>
              <TableCell>{remark.name || "-"}</TableCell>
              <TableCell>{remark.dayHours || "-"}</TableCell>
              <TableCell>{remark.nightHours || "-"}</TableCell>
              <TableCell>{remark.reason || "-"}</TableCell>
              <TableCell>{remark.penality || "-"}</TableCell>
              <TableCell>{remark.reasonPenality || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-start items-center p-5 pt-10 gap-4">
        <Button
          type="button"
          variant={"default"}
          onClick={() => deleteReportList(data.id)}
        >
          {tUI("delete")}
        </Button>
      </div>
    </div>
  );
}
