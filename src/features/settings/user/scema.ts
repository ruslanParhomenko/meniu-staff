import * as yup from "yup";

export const schemaUser = yup.object().shape({
  id: yup.number(),
  mail: yup.string().required("mail  is required"),
  role: yup.string().required("roleis required"),
});

export type UserType = yup.InferType<typeof schemaUser>;

export const defaultUser: UserType = {
  mail: "",
  role: "",
};
