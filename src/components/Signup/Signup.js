import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { createUserToken } from "../../services/userServices";
import { checkDoesAccountExist } from "../../services/accountServices";
import {
  initialValues,
  validationSchema,
  onSubmit,
} from "./signupRequiredValues";
import stepInputDatas from "./stepInputDatas";
import toast from "react-hot-toast";
import HeaderTitle from "../HeaderTitle/HeaderTitle";
import {
  AuthForm,
  InputWrapper,
} from "../../styles/StyledElements/StyledElements";
import MainInput from "../StyledInput/MainInput";
import MethodSelection from "../../containers/MethodSelection/MethodSelection";
import MainButton from "../StyledButton/MainButton";
import AuthMethodSelection from "../AuthMethodSelection/AuthMethodSelection";
import ImageSelectInput from "../ImageSelectInput/ImageSelectInput";

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
      .then(() => {
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

    let shouldStopOnStep = false;

    const errorText = `${formikSelectedMethod.replace(
      formikSelectedMethod.charAt(0),
      formikSelectedMethod.charAt(0).toUpperCase()
    )} already exists!`;

    if (inpErrors.length === 0) {
      if (
        stepInputDatas[signupStepIndex].some((inputData) => {
          return inputData.checkExistence;
        })
      ) {
        shouldStopOnStep = true;
        checkDoesAccountExist(formikValues)
          .then((res) => {
            if (res.length > 0) {
              formik.setErrors({
                ...formik.errors,
                [formikSelectedMethod]: errorText,
              });

              toast.error(errorText);
            } else {
              shouldStopOnStep = false;
              !shouldStopOnStep && setSignupStepIndex(signupStepIndex + 1);
            }
          })
          .catch((err) => console.error(err));
      }
      if (!isOnSubmit) {
        !shouldStopOnStep && setSignupStepIndex(signupStepIndex + 1);
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
          if (formikSelectedMethod === "email") {
            formik.errors[inpError.togglingInputs[0].name] !== ""
              ? toast.error(formik.errors[inpError.togglingInputs[0].name])
              : toast.error(
                  `${inpError.togglingInputs[0].placeholderText} can't be empty`
                );
          } else {
            formik.errors[inpError.togglingInputs[1].name] !== ""
              ? toast.error(formik.errors[inpError.togglingInputs[1].name])
              : toast.error(
                  `${inpError.togglingInputs[1].placeholderText} can't be empty`
                );
          }
        }
      });
    }
  };

  const handleMethod = (methodType) =>
    formik.setValues({ ...formikValues, selectedMethod: methodType });

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
      <AuthForm
        style={{
          margin: "2rem 0",
          height:
            stepInputDatas[signupStepIndex].some((sid) => sid.id === 6) &&
            "26.5rem",
        }}
      >
        <InputWrapper>
          {signupStepIndex === 1 && (
            <MethodSelection
              method={formikSelectedMethod}
              methodHandler={handleMethod}
            />
          )}
          <fieldset id="main-signup-inputs">
            {stepInputDatas[signupStepIndex].map(
              ({ id, type, name, togglingInputs, ...restInputData }) => {
                const inpTogglingName = togglingInputs
                  ? formikSelectedMethod === "email"
                    ? togglingInputs[0].name
                    : togglingInputs[1].name
                  : name;

                return ["text", "email", "password", "tel"].includes(
                  togglingInputs
                    ? formikSelectedMethod === "email"
                      ? togglingInputs[0].type
                      : togglingInputs[1].type
                    : type
                ) ? (
                  <MainInput
                    key={id}
                    type={type}
                    {...handleInputProps(name, togglingInputs, restInputData)}
                    isError={handleInputError(inpTogglingName)}
                  />
                ) : (
                  <ImageSelectInput key={id} />
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
        </InputWrapper>
      </AuthForm>
    </>
  );
};

export default Signup;
