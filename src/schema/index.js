import * as Yup from "yup";

export const signupSchema = Yup.object({
  first_name: Yup.string().min(2).max(30).required("Mandatory field."),
  last_name: Yup.string().min(2).max(30).required("Mandatory field."),
  phone_number: Yup.number()
    .min(10)
    .required("Please enter your phone number."),
  email: Yup.string().email().required("Please enter your email id."),
  password: Yup.string().min(8).required("Please enter your password."),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match."),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email id."),
  password: Yup.string().min(8).required("Please enter your password."),
});
