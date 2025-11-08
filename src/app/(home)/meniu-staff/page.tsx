import { getMeniuData } from "@/app/actions/getMeniuData";
import MeniuStaffForm from "@/features/meniu-staff/MeniuStaffForm";

export default async function Page() {
  const data = await getMeniuData();
  return <MeniuStaffForm data={data} />;
}
