import { useState, useMemo, useEffect } from "react";
import { useFormik } from "formik";
import MethodSelection from "../MethodSelection/MethodSelection";
import * as yup from "yup";
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

const onSubmit = (values, method, checkAccount) => {
  checkAccount(method, values);
};

const ForgotPassword = ({ checkAccount }) => {
  const formik = useFormik({
    initialValues,
    initialTouched: initialValues,
    initialErrors: initialValues,
    validationSchema: () => validationSchema(method),
    onSubmit: (values) => onSubmit(values, method, checkAccount),
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

export default ForgotPassword;
