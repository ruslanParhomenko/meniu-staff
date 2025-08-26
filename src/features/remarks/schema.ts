import * as yup from "yup";
export const schemaRemarks = yup.object().shape({
  name: yup.string(),
  dayHours: yup.string(),
  nightHours: yup.string(),
  penality: yup.string(),
  reason: yup.string(),
});
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
