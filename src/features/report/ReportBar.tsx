"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

type Item = {
  name: string;
  stock: number;
  incoming: number;
  outgoing: number;
};

const initialData: Item[] = [
  { name: "Marlboro", stock: 122, incoming: 0, outgoing: 0 },
  { name: "Parliament", stock: 162, incoming: 0, outgoing: 0 },
  { name: "Cohiba Siglo I", stock: 1, incoming: 0, outgoing: 0 },
  { name: "Guantonomera", stock: 3, incoming: 0, outgoing: 0 },
  { name: "Monte Cristo", stock: 2, incoming: 0, outgoing: 0 },
  { name: "R&J N3", stock: 3, incoming: 0, outgoing: 0 },
  { name: "Гильотина (2)", stock: 2, incoming: 0, outgoing: 0 },
  { name: "Пепельница", stock: 16, incoming: 0, outgoing: 0 },
  { name: "Зажигалка", stock: 495, incoming: 0, outgoing: 0 },
];

export default function ReportBarForm() {
  const [items, setItems] = useState<Item[]>(initialData);

  const handleChange = (
    index: number,
    field: "incoming" | "outgoing",
    value: string
  ) => {
    const updated = [...items];
    updated[index][field] = Number(value) || 0;
    setItems(updated);
  };

  return (
    <div className="w-full">
      <Table className="[&_th]:text-center [&_td]:text-center md:w-1/3">
        <TableHeader>
          <TableRow className="h-10">
            <TableHead style={{ width: "80px" }}></TableHead>
            <TableHead style={{ width: "80px" }}></TableHead>
            <TableHead style={{ width: "50px" }}>+</TableHead>
            <TableHead style={{ width: "50px" }}>-</TableHead>
            <TableHead style={{ width: "80px" }}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, idx) => {
            const finalStock = item.stock + item.incoming - item.outgoing;
            return (
              <TableRow key={idx} className="h-10">
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.incoming}
                    onChange={(e) =>
                      handleChange(idx, "incoming", e.target.value)
                    }
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.outgoing}
                    onChange={(e) =>
                      handleChange(idx, "outgoing", e.target.value)
                    }
                    className="text-center"
                  />
                </TableCell>
                <TableCell>{finalStock}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
