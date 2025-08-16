"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useSheetData } from "@/hooks/use-schedule-data-google";

export const ScheduleForm = () => {
  const { data, loading } = useSheetData();

  if (loading) return <div>Loading...</div>;
  if (!data || data.length === 0) return <div>Schedule not found...</div>;

  console.log(data);
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableBody>
          {data.map((row, i) => {
            return (
              <TableRow key={i}>
                {row.map((cell, j) => {
                  const isText = j === 4;

                  const isFirstRow =
                    i === 0 || i === 1 || i === data.length - 1;
                  const isFirstThreeColumns = j < 5;

                  let borderClass = "";
                  if (isFirstRow || isFirstThreeColumns) {
                    borderClass = ` ${
                      j === 4
                        ? "text-lg text-black text-left"
                        : "text-sm text-center"
                    }  ${j === 3 ? "text-black pl-4" : "text-blue-600"}`;
                  } else if (!isFirstThreeColumns && !isFirstRow) {
                    borderClass = "";
                  }

                  return (
                    <TableCell
                      key={j}
                      className={`
                        ${borderClass} h-10 w-10  
                        ${isText ? "text-blue-600" : ""}
                        ${
                          j === 4
                            ? "min-w-[50px] sticky left-0 z-10 text-left"
                            : "text-center"
                        }
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
    </div>
  );
};
