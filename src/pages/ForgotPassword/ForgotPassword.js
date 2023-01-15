import { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import MethodSelection from "../../containers/MethodSelection/MethodSelection";
import MainInput from "../../components/StyledInput/MainInput";
import MainButton from "../../components/StyledButton/MainButton";

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

const onSubmit = (values, method) => {
  console.log(values, method);
};

const ForgotPassword = () => {
  const [method, setMethod] = useState("email");

  const formik = useFormik({
    initialValues,
    initialTouched: initialValues,
    initialErrors: initialValues,
    validationSchema: () => validationSchema(method),
    onSubmit: (values) => onSubmit(values, method),
  });

  useEffect(() => {
    formik.setValues(initialValues);
    formik.setTouched(initialValues);

    document
      .querySelectorAll("#main-reset-password-inputs input")
      .forEach((inp) => (inp.value = ""));
  }, [method]);

  const handleMethod = (value) =>
    (value === "email" || value === "number") && setMethod(value);

  const methodSelector = useMemo(
    () => <MethodSelection method={method} methodHandler={handleMethod} />,
    [method]
  );

  return (
    <>
      <HeaderTitle
        mainTitle="Forgot password &#129300;"
        headerParagraph="Here, you can pass your pre-signed up email or number to reset your password and Log in successfully."
      />
      <main style={{ margin: "2rem 0" }}>
        {methodSelector}
        <fieldset style={{ padding: "1rem 0" }} id="main-reset-password-inputs">
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
      </main>
    </>
  );
};

export default ForgotPassword;
