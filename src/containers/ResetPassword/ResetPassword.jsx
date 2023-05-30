import { AuthForm } from "../../styles/StyledElements/StyledElements";
import MainInput from "../../components/StyledInput/MainInput";
import { useFormik } from "formik";
import * as yup from "yup";
import MainButton from "../../components/StyledButton/MainButton";
import { toast } from "react-hot-toast";
import { userAccount } from "../../services/userServices";

const initialValues = {
  password: "",
  passwordConfirm: "",
};

const validationSchema = () =>
  yup.object({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must contain at least 8 charact"),
    passwordConfirm: yup
      .string()
      .required("Confirm your password")
      .oneOf([yup.ref("password"), null], "Passwords does not match"),
  });

const updatedAccount = (accountId, data) => {
  const { getUserAccount, setUserAccount } = userAccount();
  if (getUserAccount.id === accountId) {
    setUserAccount({ ...getUserAccount(), data });
    return "success";
  }

  console.error("account id is not equal");
};

const handleSubmit = (values, account, push2Login) => {
  if (values.password === values.passwordConfirm) {
    const modifiedAccount = { ...account, password: values.password };

    updatedAccount(account.id, modifiedAccount) === "success" && push2Login();
  } else {
    toast.error("Passwords doesn't match");
  }
};

const ResetPassword = ({ account, push2Login }) => {
  const formik = useFormik({
    initialValues,
    initialErrors: initialValues,
    validationSchema,
    onSubmit: (values) => handleSubmit(values, account, push2Login),
  });

  return (
    <AuthForm onSubmit={formik.handleSubmit}>
      <fieldset>
        <MainInput
          type="password"
          placeholderText="New password"
          {...formik.getFieldProps("password")}
          name="password"
          isError={formik.errors.password && formik.touched.password && true}
        />
        <MainInput
          type="password"
          placeholderText="Re-enter new password"
          {...formik.getFieldProps("passwordConfirm")}
          name="passwordConfirm"
          isError={
            formik.errors.passwordConfirm &&
            formik.touched.passwordConfirm &&
            true
          }
        />
      </fieldset>
      <MainButton
        type="submit"
        disabled={!formik.isValid}
        style={{ marginTop: "20px" }}>
        Change Password
      </MainButton>
    </AuthForm>
  );
};

export default ResetPassword;
