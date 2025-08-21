import PageNav from "@/features/nav/PageNav";
import { SHEDULE_NAV_ITEMS } from "@/features/navigation/constants";

const SheduleLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PageNav navItems={SHEDULE_NAV_ITEMS} mainRoute={"schedule"} />
      {children}
    </>
  );
};

export default SheduleLayout;
