import { useEffect } from "react";
import { useRef } from "react";
import { useState, useMemo } from "react";
import styled from "styled-components";
import MainButton from "../../components/StyledButton/MainButton";
import { flexbox } from "../../styles/ExtendableStyles/ExtendableStyles";
import { useAuthCode } from "../../providers/AuthCodeProvider";
import { toast } from "react-hot-toast";

const AuthCodeSection = styled.section`
  .code-input-field {
    margin: 100px 0 40px;
    ${flexbox({ justify: "space-evenly" })}
  }
`;

const AuthCodeInput = styled.input`
  transition: box-shadow 0.2s ease, border 0.3s ease;
  width: 45px;
  height: 55px;
  border: 2px solid
    ${(props) => (props.filled ? "var(--main-blue)" : "rgba(20,100,220,.35)")};
  border-radius: 10px;
  font-size: 25px;
  color: #313131;
  text-align: center;
  font-weight: 700;
  padding: 10px;
  font-family: var(--primary-font);

  &:focus {
    box-shadow: 0 0 0 2px rgb(20 100 220 / 35%);
  }
`;

const initialState = new Array(4).fill("");

const AuthCode = ({ handlePageSections, authCodeToastId }) => {
  const [value, setValue] = useState(initialState);
  const [focusIndex, setFocusIndex] = useState(0);

  const inputsFieldRef = useRef();

  const authCode = useAuthCode();

  useEffect(() => {
    if (inputsFieldRef) {
      const inputs = inputsFieldRef.current.children;

      inputs[focusIndex].focus();
    }
  }, [focusIndex]);

  const handleInputChange = (index, inputValue) => {
    if (
      inputValue.length < 2 &&
      (/[0-9]/.test(inputValue) || inputValue === "")
    ) {
      const newValue = [...value];
      newValue[index] = inputValue;
      setValue(newValue);
    }

    /[0-9]/.test(inputValue) &&
      focusIndex < value.length - 1 &&
      setFocusIndex(focusIndex + 1);
  };

  const handleClearCode = (index, event) => {
    if (event.key.toLowerCase() === "backspace") {
      focusIndex > 0 && !value[index] && setFocusIndex(focusIndex - 1);
      const newValue = [...value];
      newValue[index] = "";
      setValue(newValue);
    }
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < 4; i++) {
      const input = (
        <AuthCodeInput
          key={i}
          type="tel"
          value={value[i]}
          onChange={(e) => handleInputChange(i, e.target.value)}
          onKeyDown={(e) => handleClearCode(i, e)}
          onFocus={() => setFocusIndex(i)}
          filled={!!value[i]}
        />
      );

      inputs.push(input);
    }

    return inputs;
  };

  const handleAuthentication = () => {
    const code = authCode.currentCode.code;
    const userCode = parseInt(value.join(""));

    if (code === userCode) {
      toast.dismiss(authCodeToastId);
      toast.success("Auth code is accurate");
      authCode.clearCode();
      handlePageSections(2);
    } else {
      toast.error("Auth code is incorrect!");
    }
  };

  const isButtonDisabled = useMemo(() => value.some((code) => !code), [value]);

  return (
    <AuthCodeSection>
      <fieldset className="code-input-field" ref={inputsFieldRef}>
        {renderInputs()}
      </fieldset>
      <MainButton onClick={handleAuthentication} disabled={isButtonDisabled}>
        Check Code
      </MainButton>
    </AuthCodeSection>
  );
};

export default AuthCode;
