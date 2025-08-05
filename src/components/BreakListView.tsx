"use client";
import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

const INITIAL_IDS = ["B8", "8", "9", "14", "18", "B20", "W20", "20"];

const getTimeLabels = (hours: number[]) =>
  hours.flatMap((h) => [
    `${h.toString().padStart(2, "0")}:00`,
    `${h.toString().padStart(2, "0")}:20`,
    `${h.toString().padStart(2, "0")}:40`,
  ]);

const HourTable = ({
  title,
  hours,
  names,
  checked,
  setChecked,
  selectedNames,
  setSelectedNames,
}: {
  title: string;
  hours: number[];
  names: string[];
  checked: Record<string, boolean>;
  setChecked: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  selectedNames: { id: string; name: string }[];
  setSelectedNames: (rows: { id: string; name: string }[]) => void;
}) => {
  const TIME_LABELS = getTimeLabels(hours);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "Имя",
      cell: ({ row }) => (
        <select
          className="min-w-40"
          value={row.original.name}
          onChange={(e) => {
            const updated = [...selectedNames];
            updated[row.index].name = e.target.value;
            setSelectedNames(updated);
          }}
        >
          {names.map((name, idx) => (
            <option key={idx} value={name}>
              {name}
            </option>
          ))}
        </select>
      ),
    },
    ...TIME_LABELS.map((time) => ({
      accessorKey: time,
      header: time,
      cell: ({ row }: any) => {
        const rowId = row.original.id;
        const key = `${rowId}-${time}`;
        return (
          <div
            onClick={() =>
              setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
            }
            style={{
              backgroundColor: checked[key] ? "black" : "white",
              width: "24px",
              height: "24px",
              //   border: "1px solid #ccc",
              cursor: "pointer",
            }}
          />
        );
      },
    })),
  ];

  const table = useReactTable({
    data: selectedNames,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-auto mb-10">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <table className="border border-gray-300">
        <thead>
          <tr>
            <th className="p-1 border border-gray-300"></th>
            <th className="p-1 border border-gray-300"></th>
            {hours.map((h) => (
              <th
                key={h}
                className="p-1 border border-gray-300 text-center"
                colSpan={3}
              >
                {h % 24}:00
              </th>
            ))}
          </tr>
          <tr>
            <th className="p-1 border border-gray-300"></th>
            <th className="p-1 border border-gray-300"></th>
            {hours.flatMap((h) =>
              ["00", "20", "40"].map((min) => (
                <th
                  key={`${h}-${min}`}
                  className="p-1 border border-gray-300 text-center"
                >
                  {min}
                </th>
              ))
            )}
          </tr>
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-1 border border-gray-300 text-center"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Table = () => {
  const names = ["Gherasiov", "Bergoi", "Amafteoae"];
  const [selectedNames, setSelectedNames] = useState(
    INITIAL_IDS.map((id, idx) => ({ id, name: names[idx] || "" }))
  );

  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <div className="flex flex-col items-start gap-8">
      <HourTable
        key={1}
        title="Дневная смена"
        hours={[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]}
        names={names}
        checked={checked}
        setChecked={setChecked}
        selectedNames={selectedNames}
        setSelectedNames={setSelectedNames}
      />
      <HourTable
        key={2}
        title="Ночная смена"
        hours={[20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7]}
        names={names}
        checked={checked}
        setChecked={setChecked}
        selectedNames={selectedNames}
        setSelectedNames={setSelectedNames}
      />
    </div>
  );
};

export default Table;
