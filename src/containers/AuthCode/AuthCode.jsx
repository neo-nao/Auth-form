import { useMemo } from "react";
import { useState } from "react";
import styled from "styled-components";
import MainButton from "../../components/StyledButton/MainButton";
import { flexbox } from "../../styles/ExtendableStyles/ExtendableStyles";

const AuthCodeSection = styled.section`
  .code-input-field {
    margin: 100px 0 40px;
    ${flexbox({ justify: "space-evenly" })}
  }
`;

const AuthCodeInput = styled.input`
  transition: box-shadow 0.2s ease;
  width: 45px;
  height: 55px;
  border: 2px solid var(--main-blue);
  border-radius: 10px;
  font-size: 25px;
  color: #313131;
  text-align: center;
  font-weight: 700;
  padding: 10px;
  font-family: var(--primary-font);

  &:focus {
    box-shadow: 0 0 0 2px rgba(30, 70, 200, 0.5);
  }
`;

const initialState = new Array(4).fill("");

const AuthCode = () => {
  const [value, setValue] = useState(initialState);

  const handleInputChange = (index, inputValue) => {
    if (
      inputValue.length < 2 &&
      (/\b[0-9]/.test(inputValue) || inputValue === "")
    ) {
      const newValue = [...value];
      newValue[index] = inputValue;
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
        />
      );

      inputs.push(input);
    }
    
    return inputs;
  };

  const handleAuthentication = () => {};

  const isButtonDisabled = useMemo(() => value.some((code) => !code), [value]);

  return (
    <AuthCodeSection>
      <fieldset className="code-input-field">{renderInputs()}</fieldset>
      <MainButton onClick={handleAuthentication} disabled={isButtonDisabled}>
        Check Code
      </MainButton>
    </AuthCodeSection>
  );
};

export default AuthCode;
