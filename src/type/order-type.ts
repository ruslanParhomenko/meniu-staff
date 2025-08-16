import {
  FRUITS,
  GROCERIES,
  CHEMICALS,
  MISCELLANEOUS,
  OFFICE,
  PHARMACEUTICAL,
  NUTS,
  SPICES,
  SPICES_2,
  VEGETABLES,
  GREEN,
  FRUITS_CUISINE,
  MEAT,
  MILK,
  OTHER,
  ACVAMONT,
  ACVILIN,
  APIFERA,
  AQUATRADE,
  ARTACULINAR,
  BLUESHARK,
  BUCURIA,
  CHOCO,
  COCACOLA,
  DAVIDAN,
  DELPHI,
  DINOVA,
  ETALONUS,
  FORWARD,
  FORWARD_CUCINE,
  FRUITBOX,
  FRUITBOX_C,
  GLOBARSPIRIT,
  IMCOMVIL,
  IUG,
  PRESTAPAC,
  ROGOB,
  UBFB,
  UBFB2,
  VERGNANO,
  VITAFOR,
} from "@/features/order-list/constants";

type FieldName =
  // TTN
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
  | (typeof DAVIDAN)[number]
  | (typeof ROGOB)[number]
  | (typeof BLUESHARK)[number]
  | (typeof FRUITBOX_C)[number]
  | (typeof DINOVA)[number]
  | (typeof FORWARD_CUCINE)[number]
  | (typeof PRESTAPAC)[number]
  | (typeof IMCOMVIL)[number]
  | (typeof ARTACULINAR)[number]
  | (typeof ETALONUS)[number]
  | (typeof VITAFOR)[number]
  | (typeof DELPHI)[number]
  | (typeof IUG)[number]
  | (typeof UBFB)[number]
  | (typeof UBFB2)[number]
  // BAR
  | (typeof FRUITS)[number]
  | (typeof GROCERIES)[number]
  | (typeof CHEMICALS)[number]
  | (typeof MISCELLANEOUS)[number]
  | (typeof OFFICE)[number]
  | (typeof PHARMACEUTICAL)[number]
  | (typeof NUTS)[number]
  | (typeof SPICES)[number]
  | (typeof SPICES_2)[number]
  | (typeof VEGETABLES)[number]
  | (typeof GREEN)[number]
  | (typeof FRUITS_CUISINE)[number]
  | (typeof MEAT)[number]
  | (typeof MILK)[number]
  | (typeof OTHER)[number];

export type OrderListFormType = {
  [key in FieldName]?: string;
};
