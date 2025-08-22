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

interface Reportreport {
  id: number;
  date: string;
  notes: string | null;
  shifts: {
    id: number;
    name: string;
    time: string;
    over: string;
    employees: string;
    reportId: number;
  }[];
  remains: {
    id: number;
    product: string;
    portions: string;
    weight: string;
    reportId: number;
  }[];
  preparedSalads: {
    id: number;
    product: string;
    portions: string;
    weight: string;
    reportId: number;
  }[];
  preparedSeconds: {
    id: number;
    product: string;
    portions: string;
    weight: string;
    reportId: number;
  }[];
  preparedDesserts: {
    id: number;
    product: string;
    portions: string;
    weight: string;
    reportId: number;
  }[];
  cutting: { id: number; product: string; weight: string; reportId: number }[];
  staff: {
    id: number;
    product: string;
    portions: string;
    weight: string;
    reportId: number;
  }[];
  movement: {
    id: number;
    nameOutside: string;
    nameInside: string;
    weight: string;
    reportId: number;
  }[];
  writeOff: {
    id: number;
    product: string;
    weight: string;
    reason: string;
    reportId: number;
  }[];
}

interface Props {
  report: Reportreport;
}

export default function ReportTable({ report }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">
        Report Date: {new Date(report.date).toLocaleDateString()}
      </h2>
      {report.notes && <p>Notes: {report.notes}</p>}

      {/* Shifts */}
      <Accordion type="single" collapsible>
        <AccordionItem value="shifts">
          <AccordionTrigger>Shifts</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Over</TableHead>
                  <TableHead>Employees</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.shifts.map((shift) => (
                  <TableRow key={shift.id}>
                    <TableCell>{shift.name}</TableCell>
                    <TableCell>{shift.time}</TableCell>
                    <TableCell>{shift.over}</TableCell>
                    <TableCell>{shift.employees}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        {/* Remains */}
        <AccordionItem value="remains">
          <AccordionTrigger>Remains</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Portions</TableHead>
                  <TableHead>Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.remains.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.portions}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        {/* Prepared Salads */}
        <AccordionItem value="preparedSalads">
          <AccordionTrigger>Prepared Salads</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Portions</TableHead>
                  <TableHead>Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.preparedSalads.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.portions}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        {/* Prepared Seconds */}
        <AccordionItem value="preparedSeconds">
          <AccordionTrigger>Prepared Seconds</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Portions</TableHead>
                  <TableHead>Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.preparedSeconds.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.portions}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        {/* Prepared Desserts */}
        <AccordionItem value="preparedDesserts">
          <AccordionTrigger>Prepared Desserts</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Portions</TableHead>
                  <TableHead>Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.preparedDesserts.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.portions}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        {/* Cutting */}
        <AccordionItem value="cutting">
          <AccordionTrigger>Cutting</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.cutting.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        {/* Staff */}
        <AccordionItem value="staff">
          <AccordionTrigger>Staff</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Portions</TableHead>
                  <TableHead>Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.staff.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.portions}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        {/* Movement */}
        <AccordionItem value="movement">
          <AccordionTrigger>Movement</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name Outside</TableHead>
                  <TableHead>Name Inside</TableHead>
                  <TableHead>Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.movement.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.nameOutside}</TableCell>
                    <TableCell>{item.nameInside}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        {/* Write Off */}
        <AccordionItem value="writeOff">
          <AccordionTrigger>Write Off</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.writeOff.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell>{item.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
