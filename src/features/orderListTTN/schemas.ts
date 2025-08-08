import { QUANTITY_SELECT } from "./constants";
import {
  FRUITS,
  FRUITS_CUCINE,
  GREEN,
  GROCERIES,
  HIMICALS,
  MEAT,
  MILK,
  MISCELLANEOUS,
  NUTS,
  OFFICE,
  OTHER,
  PHARMACEUTICAL,
  SPICES,
  SPICES_2,
  VEGETABLES,
} from "./constants";

type FieldName =
  | (typeof FRUITS)[number]
  | (typeof GROCERIES)[number]
  | (typeof HIMICALS)[number]
  | (typeof MISCELLANEOUS)[number]
  | (typeof OFFICE)[number]
  | (typeof PHARMACEUTICAL)[number]
  | (typeof NUTS)[number]
  | (typeof SPICES)[number]
  | (typeof SPICES_2)[number]
  | (typeof VEGETABLES)[number]
  | (typeof GREEN)[number]
  | (typeof FRUITS_CUCINE)[number]
  | (typeof MEAT)[number]
  | (typeof MILK)[number]
  | (typeof OTHER)[number];
export type OrderListBarFormValues = {
  [key in FieldName]?: string;
};
