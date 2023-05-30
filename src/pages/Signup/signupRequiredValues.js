import * as yup from "yup";
import { tokenCookie } from "../../services/cookieServices";
import { toast } from "react-hot-toast";
import { userAccount } from "../../services/userServices";

const initialValues = {
  name: "",
  lastName: "",
  selectedMethod: "email",
  email: "",
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

const { getUserAccount, setUserAccount } = userAccount();

const checkDoesAccountExist = () => {
  const userAcc = getUserAccount();

  if (userAcc) {
    if (
      window.confirm(
        "Account already exists are you sure want to overwrite it?"
      )
    )
      return false;
    else return true;
  }

  return false;
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
  const editedValues = { ...values, email: values.email };
  setUserAccount(editedValues);
  toast.success("Account created");
  tokenCookie.cookieEnabled &&
    tokenCookie.createTokenCookie({
      cookiePassedValue: editedValues.userToken,
    });
  pushMethod("/");
};

export { initialValues, checkDoesAccountExist, validationSchema, onSubmit };
