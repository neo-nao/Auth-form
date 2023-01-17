import styled from "styled-components";
import { flexbox } from "../ExtendableStyles/ExtendableStyles";

const AuthForm = styled.form`
  margin: 1.25rem 0;
`;

const InputWrapper = styled.div`
  height: 100%;
  position: relative;

  > * {
    width: 100%;
  }
`;

const InputContainer = styled.div`
  height: var(--input-height);
  position: relative;
  margin: 1rem 0;
  background-color: ${({ isError }) =>
    isError ? "rgba(255, 0, 0, 0.1)" : "var(--light-blue)"};
  border-radius: var(--main-border-radius);
  transition: all 0.3s ease;

  ${(props) =>
    props.isPassword &&
    props.isOnFocus &&
    `
  box-shadow:  0 0 0 1.5px
  ${props.isError ? "rgba(255, 0, 0, 0.75)" : "var(--main-blue)"};
  `}
`;

const Input = styled.input.attrs(({ type, ...rest }) => ({
  type,
  ...rest,
}))`
  transition: box-shadow 0.3s ease;
  width: ${(props) => (props.isPassword ? "85%" : "100%")};
  height: 100%;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  background: none;
  border-radius: var(--main-border-radius);

  ${({ type }) =>
    type === "password" &&
    `font-weight: 900;
  letter-spacing: 1px;
  `}

  :focus {
    box-shadow: ${(props) =>
      !props.isPassword
        ? `0 0 0 1.5px
   ${props.isError ? "rgba(255, 0, 0, 0.75)" : "var(--main-blue)"}`
        : "unset"};
  }

  :focus + label {
    display: none;
  }

  :not(:placeholder-shown) + label {
    display: none;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 7%;
  transform: translate(0, -50%);
  pointer-events: none;
  color: var(--main-gray);
  font-size: 23px;
  ${flexbox({ justify: "flex-start" })};
`;

const InputPlaceholderText = styled.span`
  font-size: 13px;
  margin-left: 12.5px;
`;

const EyeButton = styled.button`
  width: 35px;
  height: 35px;
  font-size: 25px;
  ${flexbox()}
  background: none;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  color: rgb(30, 130, 200);
  cursor: pointer;
`;

const ForgotPassLink = styled.span`
  color: var(--main-gray);
  font-size: 13px;
  margin-right: 1.5rem;
`;

const StyledButtonContainer = styled.div`
  height: var(--button-height);
`;

const StyledButton = styled.button`
  transition: all 0.3s ease;
  width: 100%;
  height: 100%;
  border-radius: var(--main-border-radius);
  background-color: var(--main-blue);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  color: #fff;

  ${(props) =>
    !props.disabled &&
    `:hover {
    background-color: var(--main-blue-dark);
  }`}

  :disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export {
  AuthForm,
  InputWrapper,
  InputContainer,
  Input,
  InputLabel,
  InputPlaceholderText,
  EyeButton,
  ForgotPassLink,
  StyledButton,
  StyledButtonContainer,
};
