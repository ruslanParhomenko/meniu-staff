import SelectInput from "@/components/inputs/SelectInput";
import { useWatch } from "react-hook-form";
import { useReportListById } from "@/hooks/use-report-list-id";
import { ReportTableByData } from "../report/bar/ReportTableByData";

export const ArhiveReportListTable = ({ data }: { data: any }) => {
  const id = useWatch({ name: "selectDataId" });

  const { report } = useReportListById(id);

  return (
    <>
      <div className="md:w-1/4 w-full py-4">
        <SelectInput fieldName={"selectDataId"} data={data} />
      </div>
      {report && <ReportTableByData report={report} />}
    </>
  );
};
