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

export default function ReportTable({ report }: any) {
  return (
    <div className="space-y-6">
      <div className="text-base font-semibold">
        {new Date(report.date).toLocaleDateString(undefined, {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </div>
      {report.notes && <p>Notes: {report.notes}</p>}

      <Accordion type="single" collapsible>
        <AccordionItem value="shifts">
          <AccordionTrigger className="text-base cursor-pointer w-full [&>svg]:hidden px-4 py-1  no-underline! focus:no-underline">
            Shifts
          </AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="remains">
          <AccordionTrigger className="text-base cursor-pointer w-full [&>svg]:hidden px-4 py-1  no-underline! focus:no-underline">
            Remains
          </AccordionTrigger>
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
                {report.remains.map((item: any) => (
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

        <AccordionItem value="preparedSalads">
          <AccordionTrigger className="text-base cursor-pointer w-full [&>svg]:hidden px-4 py-1  no-underline! focus:no-underline">
            Prepared Salads
          </AccordionTrigger>
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
                {report.preparedSalads.map((item: any) => (
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

        <AccordionItem value="preparedSeconds">
          <AccordionTrigger className="text-base cursor-pointer w-full [&>svg]:hidden px-4 py-1  no-underline! focus:no-underline">
            Prepared Seconds
          </AccordionTrigger>
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
                {report.preparedSeconds.map((item: any) => (
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

        <AccordionItem value="preparedDesserts">
          <AccordionTrigger className="text-base cursor-pointer w-full [&>svg]:hidden px-4 py-1  no-underline! focus:no-underline">
            Prepared Desserts
          </AccordionTrigger>
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
                {report.preparedDesserts.map((item: any) => (
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

        <AccordionItem value="cutting">
          <AccordionTrigger className="text-base cursor-pointer w-full [&>svg]:hidden px-4 py-1  no-underline! focus:no-underline">
            Cutting
          </AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="staff">
          <AccordionTrigger className="text-base cursor-pointer w-full [&>svg]:hidden px-4 py-1  no-underline! focus:no-underline">
            Staff
          </AccordionTrigger>
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
                {report.staff.map((item: any) => (
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

        <AccordionItem value="movement">
          <AccordionTrigger className="text-base cursor-pointer w-full [&>svg]:hidden px-4 py-1  no-underline! focus:no-underline">
            Movement
          </AccordionTrigger>
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
                {report.movement.map((item: any) => (
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

        <AccordionItem value="writeOff">
          <AccordionTrigger className="text-base cursor-pointer w-full [&>svg]:hidden px-4 py-1  no-underline! focus:no-underline">
            Write Off
          </AccordionTrigger>
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
                {report.writeOff.map((item: any) => (
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
