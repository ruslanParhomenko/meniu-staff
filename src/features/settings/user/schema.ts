import * as yup from "yup";

export const schemaUser = yup.object().shape({
  mail: yup.string().required("mail  is required"),
  role: yup.string().required("roles required"),
});

export type UserType = yup.InferType<typeof schemaUser>;

export const defaultUser: UserType = {
  mail: "",
  role: "",
};
