import * as yup from "yup";

export const schemaShift = yup
  .array()
  .of(
    yup.object({
      name: yup.string().nullable().default(""),
      time: yup.string().nullable().default(""),
      over: yup.string().nullable().default(""),
    })
  )
  .default([{ name: "", time: "", over: "" }]);

export const movementSchema = yup
  .array()
  .of(
    yup.object({
      nameOutside: yup.string().nullable().default(""),
      nameInside: yup.string().nullable().default(""),
      quantity: yup.string().nullable().default(""),
    })
  )
  .default([{ nameOutside: "", nameInside: "", quantity: "" }]);

export const remainsSchema = yup
  .array()
  .of(
    yup.object({
      name: yup.string().nullable().default(""),
      quantity: yup.string().nullable().default(""),
    })
  )
  .default([{ name: "", quantity: "" }]);

export const schemaReportCucina = yup.object({
  date: yup.string().nullable().default(""),
  shifts: schemaShift,
  leftoversLeft: remainsSchema,
  leftoversRight: yup
    .array()
    .of(
      yup.object({
        name: yup.string().nullable().default(""),
        quantity: yup.string().nullable().default(""),
      })
    )
    .default([{ name: "", quantity: "" }]),
  preparedSalads: yup
    .array()
    .of(
      yup.object({
        name: yup.string().nullable().default(""),
        rawWeight: yup.string().nullable().default(""),
        portions: yup.string().nullable().default(""),
      })
    )
    .default([{ name: "", rawWeight: "", portions: "" }]),
  preparedSeconds: yup
    .array()
    .of(
      yup.object({
        name: yup.string().nullable().default(""),
        rawWeight: yup.string().nullable().default(""),
        portions: yup.string().nullable().default(""),
      })
    )
    .default([{ name: "", rawWeight: "", portions: "" }]),
  preparedDesserts: yup
    .array()
    .of(
      yup.object({
        name: yup.string().nullable().default(""),
        rawWeight: yup.string().nullable().default(""),
        portions: yup.string().nullable().default(""),
      })
    )
    .default([{ name: "", rawWeight: "", portions: "" }]),
  cuttingLeft: yup
    .array()
    .of(
      yup.object({
        name: yup.string().nullable().default(""),
        rawWeight: yup.string().nullable().default(""),
      })
    )
    .default([{ name: "", rawWeight: "" }]),
  cuttingRight: yup
    .array()
    .of(
      yup.object({
        name: yup.string().nullable().default(""),
        rawWeight: yup.string().nullable().default(""),
      })
    )
    .default([{ name: "", rawWeight: "" }]),
  staffMeals: yup
    .array()
    .of(
      yup.object({
        name: yup.string().nullable().default(""),
        rawWeight: yup.string().nullable().default(""),
        portions: yup.string().nullable().default(""),
      })
    )
    .default([{ name: "", rawWeight: "", portions: "" }]),
  movement: movementSchema,
  writeOff: yup
    .array()
    .of(
      yup.object({
        name: yup.string().nullable().default(""),
        quantity: yup.string().nullable().default(""),
        reason: yup.string().nullable().default(""),
      })
    )
    .default([{ name: "", quantity: "", reason: "" }]),
  notes: yup.string().nullable().default(""),
});
export type ReportCucinaType = yup.InferType<typeof schemaReportCucina>;
export const defaultReportCucina = schemaReportCucina.getDefault();
