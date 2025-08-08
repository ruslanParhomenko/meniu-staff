import {
  ACVAMONT,
  ACVILIN,
  APIFERA,
  AQUATRADE,
  BUCURIA,
  CHOCO,
  COCACOLA,
  DAVIDAN,
  FORWARD,
  FRUITBOX,
  GLOBARSPIRIT,
  VERGNANO,
} from "./constants";
import {
  FRUITS_CUCINE,
  GREEN,
  MEAT,
  MILK,
  NUTS,
  OTHER,
  SPICES,
  SPICES_2,
  VEGETABLES,
} from "./constants";

type FieldName =
  | (typeof NUTS)[number]
  | (typeof SPICES)[number]
  | (typeof SPICES_2)[number]
  | (typeof VEGETABLES)[number]
  | (typeof GREEN)[number]
  | (typeof FRUITS_CUCINE)[number]
  | (typeof MEAT)[number]
  | (typeof MILK)[number]
  | (typeof OTHER)[number]
  | (typeof AQUATRADE)[number]
  | (typeof BUCURIA)[number]
  | (typeof COCACOLA)[number]
  | (typeof FORWARD)[number]
  | (typeof GLOBARSPIRIT)[number]
  | (typeof ACVILIN)[number]
  | (typeof ACVAMONT)[number]
  | (typeof VERGNANO)[number]
  | (typeof CHOCO)[number]
  | (typeof FRUITBOX)[number]
  | (typeof APIFERA)[number]
  | (typeof DAVIDAN)[number];
export type OrderListTTNFormValues = {
  [key in FieldName]?: string;
};
