import { useEffect, useState } from "react";
import { useSheetData } from "@/hooks/use-schedule-data-google";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export function ScheduleTable({ dataRange }: { dataRange: any }) {
  const { data } = useSheetData({ range: dataRange as string });
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);
  const todayDay = new Date().getDate();

  useEffect(() => {
    if (data && data.length > 0) {
      const firstRow = data[0];
      const index = firstRow.findIndex(
        (cell: any) => String(cell) === String(todayDay)
      );
      if (index !== -1) {
        setSelectedColumn(index);
      }
    }
  }, [data, todayDay]);
  return (
    <Table className="border-collapse border-0">
      <TableBody>
        {data.map((row: any, i: number) => {
          const hasValueInSelected =
            selectedColumn !== null && row[selectedColumn];

          const noBorderRow = i === 0 || !row[3];

          return (
            <TableRow key={i} className="border-0 text-sm">
              {row.map((cell: any, j: number) => {
                const isSelected = j === 4 || j === 2;
                const isBlueColor =
                  i === 0 ||
                  i === 1 ||
                  i === data.length - 1 ||
                  j === 0 ||
                  j === 1 ||
                  j === 2;
                const isHighlighted = selectedColumn === j;
                const shouldEmphasize =
                  isSelected && hasValueInSelected && i !== 0;

                return (
                  <TableCell
                    key={j}
                    onClick={() => {
                      if (i === 0) {
                        setSelectedColumn((prev) => (prev === j ? null : j));
                      }
                    }}
                    style={{ color: isHighlighted ? "#dc2626" : undefined }}
                    className={`
                  h-10 w-9
                  ${noBorderRow ? "" : "border"}
                  ${noBorderRow ? "" : "border-[#e5e7eb]"}
                  ${isBlueColor ? "text-blue-600" : ""}
                  ${isSelected ? "text-blue-600" : ""}
                  ${
                    j === 4
                      ? "min-w-[30px] sticky left-0 z-5 text-left bg-white/90"
                      : "text-center"
                  }
                  ${isHighlighted ? "font-bold  text-red-600 " : ""}
                  
                  ${i === 0 ? "cursor-pointer" : ""}
                  ${shouldEmphasize ? "font-bold text-red-600 " : ""}
                `}
                  >
                    {cell}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
