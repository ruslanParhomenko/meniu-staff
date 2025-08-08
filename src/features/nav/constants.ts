import { BarChart2, LineChart, List, Pause } from "lucide-react";

export const SIDEBAR_NAVIGATION = [
  {
    title: "schedule",
    url: "/schedule",
    icon: LineChart,
  },
  {
    title: "report",
    url: "/report",
    icon: BarChart2,
  },
  {
    title: "breakList",
    url: "/breakList",
    icon: Pause,
  },
  {
    title: "ordersList",
    url: "/orders-list-ttn/orders-ttn-bar",
    icon: List,
  },
  {
    title: "orderListBar",
    url: "/orders-list/orders-bar",
    icon: List,
  },
  {
    title: "settings",
    url: "/settings",
    icon: List,
  },
];
