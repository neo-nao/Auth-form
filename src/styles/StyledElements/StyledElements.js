import styled from "styled-components";
import { flexbox } from "../ExtendableStyles/ExtendableStyles";

const AuthForm = styled.form`
  height: 18.5rem;
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
`;

const Input = styled.input.attrs(({ type, ...rest }) => ({
  type,
  ...rest,
}))`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  border-radius: var(--main-border-radius);
  font-size: 14px;
  font-weight: 600;
  background-color: ${({ isError }) =>
    isError ? "rgba(255, 0, 0, 0.1)" : "var(--light-blue)"};
  transition: all 0.3s ease;
  ${({ type }) =>
    type === "password" &&
    `font-weight: 900;
  letter-spacing: 1px;
  `}

  :focus {
    box-shadow: 0 0 0 1.5px
      ${({ isError }) =>
        isError ? "rgba(255, 0, 0, 0.75)" : "var(--main-blue)"};
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
  ForgotPassLink,
  StyledButton,
  StyledButtonContainer,
};
