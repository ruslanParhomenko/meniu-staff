import SelectInput from "@/components/inputs/SelectInput";
import { useWatch } from "react-hook-form";
import { useReportCucinaListById } from "@/hooks/use-report-cucina-id";
import ReportTable from "../report/cucina/ReportTableByData";

export const ArhiveReportCucinaListTable = ({ data }: { data: any }) => {
  const id = useWatch({ name: "selectDataId" });

  const { report } = useReportCucinaListById(id);

  return (
    <>
      <div className="md:w-1/4 w-full py-4">
        <SelectInput fieldName={"selectDataId"} data={data} />
      </div>
      {report && <ReportTable report={report} />}
    </>
  );
};
