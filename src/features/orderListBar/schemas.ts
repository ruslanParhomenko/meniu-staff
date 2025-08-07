import {
  FRUITS,
  GROCERIES,
  HIMICALS,
  MISCELLANEOUS,
  OFFICE,
  PHARMACEUTICAL,
} from "./constants";

type FieldName =
  | (typeof FRUITS)[number]
  | (typeof GROCERIES)[number]
  | (typeof HIMICALS)[number]
  | (typeof MISCELLANEOUS)[number]
  | (typeof OFFICE)[number]
  | (typeof PHARMACEUTICAL)[number];
export type OrderListBarFormValues = {
  [key in FieldName]?: string;
};
