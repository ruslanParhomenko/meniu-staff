"use client";

import React, { useEffect, useState } from "react";

const SHEET_ID = process.env.SHEET_ID;
const API_KEY = process.env.API_KEY;
const RANGE = "Waiters!D55:AM75";

console.log("SHEET_ID", SHEET_ID);

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

        // Узнаём количество строк и столбцов в диапазоне
        const totalRows = 21; // 75 - 55 + 1
        const totalCols = 36; // AM - D + 1 (D=4, AM=39) => 39 - 4 + 1 = 36

        // Создаём массив с пустыми ячейками
        const filledData: string[][] = [];

        for (let r = 0; r < totalRows; r++) {
          filledData[r] = [];
          for (let c = 0; c < totalCols; c++) {
            // Если есть значение, возьмём его, иначе пустая строка
            filledData[r][c] = values[r]?.[c] ?? "";
          }
        }

        setData(filledData);
      } catch (e) {
        setError((e as Error).message);
      }
    }
    fetchSheet();
  }, []);

  if (error) return <div>Ошибка: {error}</div>;
  if (!data.length) return <div>Загрузка...</div>;
  return (
    <table className="border-collapse w-full">
      <tbody>
        {data.map((row, i) => {
          // Пропустить строку, если ячейка H (index 7) пустая
          //   if (!row[5] || String(row[5]).trim() === "") return null;

          return (
            <tr key={i}>
              {row.map((cell, j) => {
                const isText =
                  typeof cell === "string" &&
                  cell.trim() !== "" &&
                  isNaN(Number(cell));

                const isFirstRow = i === 0 || i === 1 || i === data.length - 1;
                const isFirstThreeColumns = j < 4;

                // Логика бордеров
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
                    ${borderClass} p-2 h-2 text-center
                    ${isText ? " text-blue-600" : ""}
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
  );
}
