import * as yup from "yup";
//expenses
export const expenseSchema = yup.array(
  yup.object().shape({
    name: yup.string(),
    sum: yup.string(),
  })
);

export type ExpensesSchemaType = yup.InferType<typeof expenseSchema>;
export const expensesDefault = new Array(8).fill({
  name: "",
  sum: "",
});

//tobacco
const LIST_TOBACCO = [
  "Marlboro",
  "Parliament",
  "Cohiba Siglo I",
  "Guantonomera",
  "Monte Cristo",
  "R&J N3",
  "Гильотина (2)",
  "Пепельница",
  "Зажигалка",
];
export const tobaccoSchema = yup.array(
  yup.object().shape({
    name: yup
      .string()
      .oneOf(LIST_TOBACCO, "Name must be one of the predefined list"),
    stock: yup.string(),
    incoming: yup.string(),
    outgoing: yup.string(),
    finalStock: yup.string(),
  })
);
export type TobaccoSchemaType = yup.InferType<typeof tobaccoSchema>;
export const tobaccoDefault = LIST_TOBACCO.map((name) => ({
  name,
  stock: "",
  incoming: "",
  outgoing: "",
  finalStock: "",
}));

// cash verify

export const HOURS = Array.from({ length: 24 }).map((_, idx) => {
  const hour = (8 + idx) % 24;
  return hour.toString().padStart(2, "0") + ":00";
});
export const cashVerifySchema = yup.array(
  yup.object().shape({
    hours: yup.string(),
    value: yup.string(),
  })
);

export type CashVerifySchemaType = yup.InferType<typeof cashVerifySchema>;
export const cashVerifyDefault = HOURS.map((hour) => ({
  hours: hour,
  value: "",
}));

//report bar
export const reportBarSchema = yup.object().shape({
  date: yup.string().required("Date is required"),
  expenses: expenseSchema,
  tobacco: tobaccoSchema,
  cashVerify: cashVerifySchema,
});

export type ReportBarFormValues = yup.InferType<typeof reportBarSchema>;
export const defaultValuesReportBar = {
  expenses: expensesDefault,
  tobacco: tobaccoDefault,
  cashVerify: cashVerifyDefault,
};
