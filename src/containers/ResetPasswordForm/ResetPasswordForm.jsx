import { useState, useMemo, useEffect } from "react";
import { useFormik } from "formik";
import MethodSelection from "../MethodSelection/MethodSelection";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { getAccounts } from "../../services/accountServices";
import MainButton from "../../components/StyledButton/MainButton";
import { AuthForm } from "../../styles/StyledElements/StyledElements";
import MainInput from "../../components/StyledInput/MainInput";

const initialValues = {
  email: "",
  number: "",
};

const validationSchema = (method) =>
  method === "email"
    ? yup.object({
        email: yup
          .string()
          .email("email is invalid")
          .required("email is required"),
      })
    : yup.object({
        number: yup.number().required("number is required"),
      });

const checkResponse = (account) => {
  if (account) {
    return (
      <>
        Your code : <h4 style={{ marginLeft: ".5ch" }}>{2}</h4>
      </>
    );
  } else {
    return "Account not found";
  }
};

const onSubmit = (values, method, handleIsOnAuthCode, authCode) => {
  const checkAccount = async () => {
    const promiseToast = toast.loading("Loading...");
    const response = await (method === "email"
      ? getAccounts("?email=" + values.email)
      : getAccounts("?number=" + values.number));

    const {
      data: [account],
    } = response;

    toast.dismiss(promiseToast);

    if (account) {
      handleIsOnAuthCode(true);
      authCode.generateCode();
      toast(
        <>
          Your code :{" "}
          <h4 style={{ marginLeft: ".5ch" }}>{authCode.getCode()}</h4>
        </>,
        { icon: "📧", duration: 1000 * 60 }
      );
    } else {
      toast.error("Account is not found!");
    }
  };

  checkAccount();
};

const ResetPasswordForm = ({ handleIsOnAuthCode, authCode }) => {
  const formik = useFormik({
    initialValues,
    initialTouched: initialValues,
    initialErrors: initialValues,
    validationSchema: () => validationSchema(method),
    onSubmit: (values) =>
      onSubmit(values, method, handleIsOnAuthCode, authCode),
  });
  const [method, setMethod] = useState("email");

  const handleMethod = (value) =>
    (value === "email" || value === "number") && setMethod(value);

  const methodSelector = useMemo(
    () => <MethodSelection method={method} methodHandler={handleMethod} />,
    [method]
  );

  useEffect(() => {
    formik.setValues(initialValues);
    formik.setTouched(initialValues);

    document
      .querySelectorAll("#main-reset-password-inputs input")
      .forEach((inp) => (inp.value = ""));
  }, [method]);

  return (
    <>
      {methodSelector}
      <AuthForm onSubmit={formik.handleSubmit}>
        <fieldset
          style={{ padding: "0 0 1rem" }}
          id="main-reset-password-inputs"
        >
          <MainInput
            type={method === "email" ? method : method === "number" && "tel"}
            {...formik.getFieldProps(method)}
            placeholderText={method.replace(
              method.at(0),
              method.at(0).toUpperCase()
            )}
            name={method}
            isError={formik.errors[method] && formik.touched[method] && true}
          />
        </fieldset>
        <MainButton type="submit" disabled={!formik.isValid}>
          Get code
        </MainButton>
      </AuthForm>
    </>
  );
};

export default ResetPasswordForm;
