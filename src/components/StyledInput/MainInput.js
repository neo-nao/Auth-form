import inputHandlers from "../../containers/LoginForm/inputHandlers";
import {
  InputContainer,
  Input,
  InputLabel,
  InputPlaceholderText,
} from "../../styles/StyledElements/StyledElements";

const MainInput = ({ type, placeholderText, ...attributes }) => {
  const { checkInputType } = inputHandlers();

  return (
    <InputContainer>
      <Input type={type} placeholder=" " {...attributes} />
      <InputLabel>
        {checkInputType(type)}
        <InputPlaceholderText>{placeholderText}</InputPlaceholderText>
      </InputLabel>
    </InputContainer>
  );
};

export default MainInput;
