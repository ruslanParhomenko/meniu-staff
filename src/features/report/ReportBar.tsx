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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  { name: "Monte Cristo Edmundo", stock: 2, incoming: 0, outgoing: 0 },
  { name: "R&J N3", stock: 3, incoming: 0, outgoing: 0 },
  { name: "Гильотина (2)", stock: 2, incoming: 0, outgoing: 0 },
  { name: "Пепельница", stock: 16, incoming: 0, outgoing: 0 },
  { name: "Зажигалка", stock: 495, incoming: 0, outgoing: 0 },
];

export default function StockTable() {
  const [filter, setFilter] = useState<string>("all");
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

  const filteredItems =
    filter === "all"
      ? items
      : items.filter((item) => item.name.includes(filter));

  return (
    <div className="space-y-4 w-[800px]">
      {/* Фильтр */}

      {/* Таблица */}
      <Table className="[&_th]:text-center [&_td]:text-center">
        <TableHeader>
          <TableRow className="h-10">
            <TableHead style={{ width: "80px" }}>
              {/* <Select
                onValueChange={(val) => setFilter(val)}
                defaultValue="all"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выбери категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="Marlboro">Marlboro</SelectItem>
                  <SelectItem value="Parliament">Parliament</SelectItem>
                  <SelectItem value="Cohiba">Cohiba</SelectItem>
                </SelectContent>
              </Select> */}
            </TableHead>
            <TableHead style={{ width: "80px" }}></TableHead>
            <TableHead style={{ width: "50px" }}>+</TableHead>
            <TableHead style={{ width: "50px" }}>-</TableHead>
            <TableHead style={{ width: "80px" }}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item, idx) => {
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
