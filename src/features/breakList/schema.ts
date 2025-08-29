import { BREAK_LIST_DEFAULT } from "./constant";

export type BreakListItem = {
  id: string;
  name: string;
  hours: Record<string, string>[];
};

export type BreakListFormValues = {
  date?: Date;
  rows: BreakListItem[];
};

export const defaultValuesBraekList = {
  rows: BREAK_LIST_DEFAULT.map((item) => ({
    id: item.id,
    name: item.name,
    hours: Object.assign({}, ...item.hours),
  })),
};
