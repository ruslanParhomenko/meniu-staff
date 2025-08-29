"use client";
import { ArhiveListTable } from "./ArchiveListTable";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import BreakListTable from "./BreakListTable";
import ReportTable from "./ReportCucinaTable";
import RemarkTable from "./RemarkTable";
import { ReportBarTable } from "./ReportBarTable";
import {
  BREAK_LIST_ENDPOINT,
  REMARKS_ENDPOINT,
  REPORT_BAR_ENDPOINT,
  REPORT_CUCINA_ENDPOINT,
} from "@/constants/endpoint-tag";

export const ArchiveForm = () => {
  const form = useForm();

  return (
    <Form {...form}>
      <ArhiveListTable nameTag={BREAK_LIST_ENDPOINT}>
        {(breakList) => <BreakListTable data={breakList} />}
      </ArhiveListTable>
      <ArhiveListTable nameTag={REPORT_BAR_ENDPOINT}>
        {(report) => <ReportBarTable data={report} />}
      </ArhiveListTable>
      <ArhiveListTable nameTag={REPORT_CUCINA_ENDPOINT}>
        {(report) => <ReportTable data={report} />}
      </ArhiveListTable>
      <ArhiveListTable nameTag={REMARKS_ENDPOINT}>
        {(remarks) => <RemarkTable data={remarks} />}
      </ArhiveListTable>
    </Form>
  );
};
