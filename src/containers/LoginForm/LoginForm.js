import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import toast from "react-hot-toast";
import MainInput from "../../components/StyledInput/MainInput";
import {
  AuthForm,
  ForgotPassLink,
} from "../../styles/StyledElements/StyledElements";
import MainButton from "../../components/StyledButton/MainButton";
import { createUserToken, userAccount } from "../../services/userServices";
import { checkUserCookie, tokenCookie } from "../../services/cookieServices";

// initial values for formik hook
const initialValues = {
  emailMethodValues: { email: "", password: "" },
  numberMethodValues: { number: "", password: "" },
};

const handleLogin = (
  pushMethod,
  method,
  { emailMethodValues, numberMethodValues }
) =>
  new Promise(async (resolve, reject) => {
    try {
      let valueBasedOnMethod =
        method === "email" ? emailMethodValues : numberMethodValues;

      if (method === "email") {
        valueBasedOnMethod = {
          ...valueBasedOnMethod,
          email: valueBasedOnMethod.email.toLowerCase(),
        };
      }

      const { getUserAccount } = userAccount();

      const userAcc = getUserAccount();

      if (
        userAcc &&
        (method === "email"
          ? valueBasedOnMethod.email.toLowerCase() ===
            userAcc.email.toLowerCase()
          : valueBasedOnMethod.number === userAcc.number) &&
        valueBasedOnMethod.password === userAcc.password
      ) {
        tokenCookie.cookieEnabled = true;
        tokenCookie.createTokenCookie({ cookiePassedValue: userAcc.userToken });

        pushMethod({
          pathname: "/profile",
        });

        resolve("Loged in successfully");
      } else {
        reject("Incorrect credentials!");
      }
    } catch (err) {
      reject("Error occured!");
    }
  });

const onSubmit = (values, method, pushMethod) => {
  const loginPromise = handleLogin(pushMethod, method, values);

  toast.promise(loginPromise, {
    loading: "Loading...",
    success: (res) => res,
    error: (err) => err,
  });
};

const validationSchema = (method) => {
  return method === "email"
    ? yup.object({
        emailMethodValues: yup.object({
          email: yup
            .string()
            .email("email is invalid")
            .required("email is required"),
          password: yup.string().required("password is required"),
        }),
      })
    : yup.object({
        numberMethodValues: yup.object({
          number: yup.number().required("number is required"),
          password: yup.string().required("password is required"),
        }),
      });
};

const LoginForm = ({ method, history: { push } }) => {
  const formik = useFormik({
    initialValues,
    initialTouched: initialValues,
    initialErrors: initialValues,
    onSubmit: (values) => onSubmit(values, method, push),
    validationSchema: () => validationSchema(method),
    validateOnMount: true,
  });

  const formikErrors = formik.errors;
  const formikTouched = formik.touched;

  // set formik values to empty every time method get changed
  useEffect(() => {
    formik.setValues(initialValues);
    formik.setTouched(initialValues);

    document
      .querySelectorAll("#main-login-inputs input")
      .forEach((inp) => (inp.value = ""));
  }, [method]);

  const methodGroupTouched =
    method === "email"
      ? formikTouched.emailMethodValues
      : formikTouched.numberMethodValues;

  const hasErrorObjectTester = () => {
    if (method === "email") {
      if (Object.keys(formikErrors).includes("emailMethodValues")) return true;
      else return false;
    } else {
      if (Object.keys(formikErrors).includes("numberMethodValues")) return true;
      else return false;
    }
  };

  return (
    <AuthForm onSubmit={formik.handleSubmit}>
      <fieldset id="main-login-inputs">
        {method === "email" ? (
          <MainInput
            type="email"
            {...formik.getFieldProps("email")}
            placeholderText="Email"
            name="emailMethodValues.email"
            isError={
              hasErrorObjectTester() &&
              formikErrors.emailMethodValues.email &&
              formik.touched.emailMethodValues.email &&
              true
            }
          />
        ) : (
          <MainInput
            type="tel"
            {...formik.getFieldProps("number")}
            placeholderText="Number"
            name="numberMethodValues.number"
            isError={
              hasErrorObjectTester() &&
              formikErrors.numberMethodValues.number &&
              formikTouched.numberMethodValues.number &&
              true
            }
          />
        )}
        <MainInput
          type="password"
          placeholderText="Password"
          {...(method === "email"
            ? formik.getFieldProps("emailMethodValues.password")
            : formik.getFieldProps("numberMethodValues.password"))}
          name={
            method === "email"
              ? "emailMethodValues.password"
              : "numberMethodValues.password"
          }
          isError={
            hasErrorObjectTester() &&
            (method === "email"
              ? formikErrors.emailMethodValues.password
              : formikErrors.numberMethodValues.password) &&
            methodGroupTouched.password &&
            true
          }
        />
      </fieldset>
      <section style={{ textAlign: "end" }}>
        <ForgotPassLink>
          <Link to="/forgot-password">Forgot Password?</Link>
        </ForgotPassLink>
      </section>
      <MainButton
        id="login-button"
        style={{ marginTop: "2.5rem" }}
        type="submit"
        disabled={!formik.isValid}>
        Login
      </MainButton>
    </AuthForm>
  );
};

export default withRouter(LoginForm);
