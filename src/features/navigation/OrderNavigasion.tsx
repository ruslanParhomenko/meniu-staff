"use client";

import PageNav from "../nav/PageNav";
import { ORDER_NAV_ITEMS } from "./constants";

function OrderNav() {
  return <PageNav navItems={ORDER_NAV_ITEMS} mainRoute="orders-list" />;
}

export default OrderNav;
