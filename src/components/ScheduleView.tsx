"use client";

import React, { useEffect, useState } from "react";

const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const RANGE = "Waiters!D55:AM75";

console.log("SHEET_ID:", SHEET_ID);
console.log("API_KEY:", API_KEY);

export default function GoogleSheetTable() {
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
      <table className="min-w-max table-auto">
        <tbody>
          {data.map((row, i) => {
            return (
              <tr key={i}>
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
                    borderClass = `text-center text-sm ${
                      j === 3 ? "text-black" : "text-blue-600"
                    } `;
                  } else if (!isFirstThreeColumns) {
                    borderClass = "border border-gray-400";
                  }

                  return (
                    <td
                      key={j}
                      className={`
                    ${borderClass}  h-10 w-10 text-center
                    ${isText ? " text-blue-600" : ""}
                    ${j === 4 ? "min-w-50" : ""}
                  `}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
