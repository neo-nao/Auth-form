import { useState, useEffect } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { createAccountRequest } from "../../services/accountRequestFuncs";
import { createUserToken } from "../../services/userServices";
import { tokenCookie } from "../../services/cookieServices";
import HeaderTitle from "../HeaderTitle/HeaderTitle";
import { AuthForm } from "../../styles/StyledElements/StyledElements";
import MainInput from "../StyledInput/MainInput";
import MethodSelection from "../../containers/MethodSelection/MethodSelection";
import MainButton from "../StyledButton/MainButton";
import AuthMethodSelection from "../AuthMethodSelection/AuthMethodSelection";
import stepInputDatas from "./stepInputDatas";
import toast from "react-hot-toast";

const FlexWrapper = styled.div`
  height: 100%;
  position: relative;

  > * {
    width: 100%;
  }
`;

const initialValues = {
  name: "",
  lastName: "",
  selectedMethod: "email",
  email: "",
  displyEmail: "",
  number: "",
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

const Signup = (props) => {
  const [signupStepIndex, setSignupStepIndex] = useState(0);

  const formik = useFormik({
    initialValues,
    initialErrors: initialValues,
    validationSchema: () => validationSchema(formik.values.selectedMethod),
    onSubmit: (values) => onSubmit(values, props.history.push),
  });

  const formikValues = formik.values;

  const formikSelectedMethod = formik.values.selectedMethod;

  const isOnSubmit =
    signupStepIndex === stepInputDatas.length - 1 ? true : false;

  const handleSignupStep = (e) => {
    e.preventDefault();

    const putTokenPromise = formik.setValues({
      ...formikValues,
      displyEmail: formik.values.email,
    });

    putTokenPromise
      .then((res) => {
        !formikValues.userToken &&
          formik.setValues({ ...formikValues, userToken: createUserToken() });
      })
      .catch((err) => console.error(err));

    const errorKeys = Object.keys(formik.errors);

    const inpErrors = stepInputDatas[signupStepIndex].filter((inpData) => {
      if (!inpData.togglingInputs) {
        return errorKeys.includes(inpData.name);
      }
      return formikSelectedMethod === "email"
        ? errorKeys.includes(inpData.togglingInputs[0].name)
        : errorKeys.includes(inpData.togglingInputs[1].name);
    });

    if (inpErrors.length === 0) {
      if (!isOnSubmit) {
        setSignupStepIndex(signupStepIndex + 1);
      } else {
        formik.submitForm();
      }
    } else {
      inpErrors.reverse().forEach((inpError) => {
        if (!inpError.togglingInputs) {
          if (formik.errors[inpError.name] !== "")
            toast.error(formik.errors[inpError.name]);
          else toast.error(`${inpError.placeholderText} can't be empty`);
        } else {
          if (formik.values.selectedMethod === "email") {
            if (formik.errors[inpError.togglingInputs[0].name] !== "")
              toast.error(formik.errors[inpError.togglingInputs[0].name]);
            else toast.error(`${inpError.togglingInputs[0].placeholderText}`);
          } else {
            if (formik.errors[inpError.togglingInputs[1].name] !== "")
              toast.error(formik.errors[inpError.togglingInputs[1].name]);
            else toast.error(`${inpError.togglingInputs[1].placeholderText}`);
          }
        }
      });
    }
  };

  const handleMethod = (methodType) =>
    formik.setValues({ ...formikValues, selectedMethod: methodType });

  // const handleInpError = (name) => {
  //   return ;
  // };

  const handleInputProps = (name, togglingInputs, restInpDatas) => {
    if (togglingInputs) {
      return formikSelectedMethod === "email"
        ? {
            ...formik.getFieldProps(togglingInputs[0].name),
            ...togglingInputs[0],
          }
        : {
            ...formik.getFieldProps(togglingInputs[1].name),
            ...togglingInputs[1],
          };
    } else {
      return {
        ...formik.getFieldProps(name),
        ...restInpDatas,
      };
    }
  };

  useEffect(() => {
    formik.setValues({ ...formikValues, email: "", number: "" });
    formik.setTouched({ ...formik.touched, email: false, number: false });

    document
      .querySelectorAll("#main-signup-inputs input")
      .forEach((inp) => (inp.value = ""));
  }, [formikSelectedMethod]);

  const handleInputError = (inpTogglingName) => {
    return (
      formik.errors[inpTogglingName] && formik.touched[inpTogglingName] && true
    );
  };

  return (
    <>
      <HeaderTitle
        mainTitle="create new account &#128293;"
        headerParagraph="please fill in the forms to continue"
      />
      <AuthForm style={{ margin: "2rem 0" }}>
        <FlexWrapper>
          {signupStepIndex === 1 && (
            <MethodSelection
              method={formikSelectedMethod}
              methodHandler={handleMethod}
            />
          )}
          <fieldset id="main-signup-inputs">
            {stepInputDatas[signupStepIndex].map(
              ({ id, name, togglingInputs, ...restInputData }) => {
                const inpTogglingName = togglingInputs
                  ? formikSelectedMethod === "email"
                    ? togglingInputs[0].name
                    : togglingInputs[1].name
                  : name;

                return (
                  <MainInput
                    key={id}
                    {...handleInputProps(name, togglingInputs, restInputData)}
                    isError={handleInputError(inpTogglingName)}
                  />
                );
              }
            )}
          </fieldset>
          <section style={{ position: "absolute", bottom: 0 }}>
            <MainButton onClick={handleSignupStep}>
              {isOnSubmit ? "Create account" : "Next"}
            </MainButton>
            <AuthMethodSelection
              authText="Already have an account?"
              authRedirect={{ redirectLink: "/login", redirectText: "Login" }}
            />
          </section>
        </FlexWrapper>
      </AuthForm>
    </>
  );
};

export default Signup;
