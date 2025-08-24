import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DeleteListButton } from "../ui/DeleteListButton";
import { Label } from "@/components/ui/label";

export default function BreakListTable({
  data,
  refetch,
}: {
  data: any;
  refetch?: () => void;
}) {
  return (
    <div className="w-full border overflow-auto  border-gray-200 rounded-md p-1">
      <Label className="">
        {new Date(data.date).toLocaleDateString(undefined, {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </Label>

      {data && (
        <Table>
          <TableBody>
            {data?.rows?.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell>{row.externalId}</TableCell>
                <TableCell>{row.name ?? "-"}</TableCell>
                {row.hours.map((h: any) => {
                  if (!h.value || h.value === "X") return null;
                  return (
                    <TableCell key={h.id} className="text-center">
                      {h.hour}:{h.value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <DeleteListButton
        id={data?.id || 0}
        api={"breakList"}
        refetch={refetch}
      />
    </div>
  );
}
