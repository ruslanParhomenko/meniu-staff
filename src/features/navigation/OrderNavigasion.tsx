"use client";

import { usePathname } from "@/i18n/navigation";
import PageNav from "../nav/PageNav";
import { ORDER_NAV_ITEMS } from "./constants";

function OrderNav() {
  const patchname = usePathname();
  const mainPath = patchname.split("/")[1];

  return <PageNav navItems={ORDER_NAV_ITEMS} mainRoute={mainPath} />;
}

export default OrderNav;
