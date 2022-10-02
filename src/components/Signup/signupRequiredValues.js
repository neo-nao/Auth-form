import * as yup from "yup";
import { createAccountRequest } from "../../services/accountRequestFuncs";
import { tokenCookie } from "../../services/cookieServices";
import { toast } from "react-hot-toast";

const initialValues = {
  name: "",
  lastName: "",
  selectedMethod: "email",
  email: "",
  displyEmail: "",
  number: "",
  profileImage: "",
  password: "",
  passwordConfirmation: "",
};

const initialErrorsSchema = {
  name: yup.string().required("Name cannot be empty"),
  lastName: yup.string().required("Last name cannot be empty"),
  password: yup
    .string()
    .required("Password cannot be empty")
    .min(8, "Password must contain at least 8 characters"),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is empty")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
};

const validationSchema = (method) => {
  if (method === "email")
    return yup.object({
      ...initialErrorsSchema,
      email: yup
        .string()
        .email("Email is not valid")
        .required("Email is required"),
    });

  return yup.object({
    ...initialErrorsSchema,
    number: yup.number().required("Number is required"),
  });
};

const onSubmit = (values, pushMethod) => {
  const editedValues = { ...values, email: values.email.toLocaleLowerCase() };
  const createAccountPromise = createAccountRequest(editedValues);
  toast.promise(createAccountPromise, {
    loading: "Loading...",
    success: (msg) => msg || "Account created",
    error: (err) => err || "Failed to create account!",
  });
  createAccountPromise.then(() => {
    tokenCookie.isCookieEnabled &&
      tokenCookie.createTokenCookie({
        cookiePassedValue: editedValues.userToken,
      });
    pushMethod("/");
  });
};

export { initialValues, validationSchema, onSubmit };
