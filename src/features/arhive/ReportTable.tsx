"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ReportTable({ data: report }: any) {
  return (
    <div className="space-y-6">
      {report.notes && <p>Notes: {report.notes}</p>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employees</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Over</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {report.shifts.map((shift: any) => (
            <TableRow key={shift.id}>
              <TableCell>{shift.employees}</TableCell>
              <TableCell>{shift.time}</TableCell>
              <TableCell>{shift.over}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Portions</TableHead>
            <TableHead>Weight</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {report.remains.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.portions}</TableCell>
              <TableCell>{item.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Portions</TableHead>
            <TableHead>Weight</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {report.preparedSalads.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.portions}</TableCell>
              <TableCell>{item.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Portions</TableHead>
            <TableHead>Weight</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {report.preparedSeconds.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.portions}</TableCell>
              <TableCell>{item.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Portions</TableHead>
            <TableHead>Weight</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {report.preparedDesserts.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.portions}</TableCell>
              <TableCell>{item.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Weight</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {report.cutting.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Portions</TableHead>
            <TableHead>Weight</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {report.staff.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.portions}</TableCell>
              <TableCell>{item.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name Outside</TableHead>
            <TableHead>Name Inside</TableHead>
            <TableHead>Weight</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {report.movement.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.nameOutside}</TableCell>
              <TableCell>{item.nameInside}</TableCell>
              <TableCell>{item.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Reason</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {report.writeOff.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell>{item.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
