import * as yup from "yup";
export const schemaRemarks = yup.object().shape({
  name: yup.string().default(""),
  dayHours: yup.string().default(""),
  nightHours: yup.string().default(""),
  penality: yup.string().default(""),
  reason: yup.string().default(""),
});
export type Remarks = yup.InferType<typeof schemaRemarks>;
export const defaultRemarks = schemaRemarks.getDefault();

export const schemaRemarksForm = yup.object().shape({
  date: yup
    .string()
    .required("Date is required")
    .default(new Date().toString()),
  remarks: yup
    .array(schemaRemarks)
    .default([
      { name: "", dayHours: "", nightHours: "", penality: "", reason: "" },
    ]),
});

export type RemarksForm = yup.InferType<typeof schemaRemarksForm>;

export const defaultRemarksForm = schemaRemarksForm.getDefault();
