import {
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
  PRESTAPAC,
  ROGOB,
  VERGNANO,
  VITAFOR,
} from "./constants";
import {} from "./constants";

type FieldName =
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
  | (typeof DELPHI)[number];

export type OrderListTTNFormValues = {
  [key in FieldName]?: string;
};
