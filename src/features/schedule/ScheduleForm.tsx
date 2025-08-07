"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import React, { useEffect, useState } from "react";

const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const RANGE = "Waiters!D55:AM75";

export const ScheduleForm = () => {
  const [data, setData] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSheet() {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        const json = await response.json();
        const values: string[][] = json.values || [];

        const totalRows = 21;
        const totalCols = 36;

        const filledData: string[][] = [];

        for (let r = 0; r < totalRows; r++) {
          filledData[r] = [];
          for (let c = 0; c < totalCols; c++) {
            filledData[r][c] = values[r]?.[c] ?? "";
          }
        }

        setData(filledData);
      } catch (e) {
        setError((e as Error).message);
      }
    }
    fetchSheet();
    const intervalId = setInterval(fetchSheet, 70000);
    return () => clearInterval(intervalId);
  }, []);

  if (error) return <div>Ошибка: {error}</div>;
  if (!data.length) return <div>Загрузка...</div>;
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableBody>
          {data.map((row, i) => {
            return (
              <TableRow key={i}>
                {row.map((cell, j) => {
                  const isText =
                    typeof cell === "string" &&
                    cell.trim() !== "" &&
                    isNaN(Number(cell));

                  const isFirstRow =
                    i === 0 || i === 1 || i === data.length - 1;
                  const isFirstThreeColumns = j < 4;

                  let borderClass = "";
                  if (isFirstRow || isFirstThreeColumns) {
                    borderClass = `text-center ${
                      j === 4 ? "text-lg text-black" : "text-sm"
                    } h-5 ${j === 3 ? "text-black pl-4" : "text-blue-600"}`;
                  } else if (!isFirstThreeColumns) {
                    borderClass = "border-x border-gray-300";
                  }

                  return (
                    <TableCell
                      key={j}
                      className={`
                        ${borderClass} h-8 w-8 text-center 
                        ${isText ? "text-blue-600" : ""}
                        ${j === 4 ? "min-w-[50px]" : ""}
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
