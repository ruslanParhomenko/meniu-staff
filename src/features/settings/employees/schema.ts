import * as yup from "yup";

export const schemaEmployee = yup.object().shape({
  firstName: yup.string().required("name is required"),
  lastName: yup.string().required("mail is required"),
  position: yup.string().required("mail is required"),
  rate: yup.string().required("role is required"),
});

export type Employee = yup.InferType<typeof schemaEmployee>;

export const defaultEmployee = {
  firstName: "",
  lastName: "",
  position: "",
  rate: "",
};
