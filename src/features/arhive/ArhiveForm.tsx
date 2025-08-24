"use client";
import { ArhiveListTable } from "./ArhiveListTable";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import BreakListTable from "./BreakListTable";
import ReportTable from "./ReportTable";
import RemarkTable from "./RemarkTable";
import { ReportBarTable } from "./ReportBarTable";

export const ArhiveForm = () => {
  const form = useForm();

  return (
    <Form {...form}>
      <ArhiveListTable nameTag="breakList">
        {(breakList) => <BreakListTable data={breakList} />}
      </ArhiveListTable>
      <ArhiveListTable nameTag="report">
        {(report) => <ReportBarTable data={report} />}
      </ArhiveListTable>
      <ArhiveListTable nameTag="report-cucina">
        {(report) => <ReportTable data={report} />}
      </ArhiveListTable>
      <ArhiveListTable nameTag="remarks">
        {(remarks) => <RemarkTable data={remarks} />}
      </ArhiveListTable>
    </Form>
  );
};
