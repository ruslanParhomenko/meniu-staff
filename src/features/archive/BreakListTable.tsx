import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function BreakListTable({ data }: { data: any }) {
  return (
    <>
      <div className="w-full border overflow-auto  border-gray-200 rounded-md p-1">
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
      </div>
    </>
  );
}
