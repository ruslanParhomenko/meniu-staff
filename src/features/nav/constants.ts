import { url } from "inspector";
import { BarChart2, LineChart, List, Pause } from "lucide-react";

export const SIDEBAR_NAVIGATION = [
  {
    title: "schedule",
    url: "/schedule",
    url2: "/schedule",
    icon: LineChart,
  },
  {
    title: "report",
    url: "/report",
    url2: "/report",
    icon: BarChart2,
  },
  {
    title: "breakList",
    url: "/breakList",
    url2: "/breakList",
    icon: Pause,
  },
  {
    title: "ordersList",
    url: "/orders-list-ttn/orders-ttn-bar",
    url2: "/orders-list-ttn/orders-ttn-cucina",
    icon: List,
  },
  {
    title: "orderListBar",
    url: "/orders-list/orders-bar",
    url2: "/orders-list/orders-cucina",
    icon: List,
  },
  {
    title: "settings",
    url: "/settings",
    url2: "/settings",
    icon: List,
  },
  {
    title: "arhive",
    url: "/arhive",
    url2: "/arhive",
    icon: List,
  },
];
