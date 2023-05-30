import { useState, useRef, useEffect, memo } from "react";
import inputHandlers from "../../containers/LoginForm/inputHandlers";
import {
  InputContainer,
  Input,
  InputLabel,
  InputPlaceholderText,
  EyeButton,
} from "../../styles/StyledElements/StyledElements";
import { HiEye, HiEyeOff } from "react-icons/hi";

const MainInput = ({ type, placeholderText, isError, ...attributes }) => {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [isInputOnFocus, setIsInputOnFocus] = useState(false);
  const { checkInputType } = inputHandlers();

  const inputRef = useRef();

  useEffect(() => {
    if (inputRef) {
      inputRef.current.addEventListener("focus", () => setIsInputOnFocus(true));
      inputRef.current.addEventListener("blur", () => setIsInputOnFocus(false));
    }
  }, [inputRef]);

  const togglePasswordShowing = () => {
    setIsPasswordShowing(!isPasswordShowing);
  };

  return (
    <InputContainer
      isError={isError}
      isPassword={type === "password" ? true : false}
      isOnFocus={isInputOnFocus}>
      <Input
        type={
          type === "password" ? (isPasswordShowing ? "text" : "password") : type
        }
        placeholder=" "
        {...attributes}
        isError={isError}
        isPassword={type === "password" ? true : false}
        ref={inputRef}
      />
      <InputLabel>
        {checkInputType(type)}
        <InputPlaceholderText>{placeholderText}</InputPlaceholderText>
      </InputLabel>
      {type === "password" && (
        <EyeButton type="button" onClick={togglePasswordShowing}>
          {isPasswordShowing ? <HiEye /> : <HiEyeOff />}
        </EyeButton>
      )}
    </InputContainer>
  );
};

export default memo(MainInput);
