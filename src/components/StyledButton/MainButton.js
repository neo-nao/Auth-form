import {
  StyledButtonContainer,
  StyledButton,
} from "../../styles/StyledElements/StyledElements";

const MainButton = ({ type, children, disabled, ...attributes }) => {
  return (
    <StyledButtonContainer {...attributes}>
      <StyledButton type={type} disabled={disabled}>
        {children}
      </StyledButton>
    </StyledButtonContainer>
  );
};

export default MainButton;
