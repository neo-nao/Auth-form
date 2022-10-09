import styled from "styled-components";
import { flexbox } from "../../styles/ExtendableStyles/ExtendableStyles";

const FormContainerStyles = styled.section`
  width: clamp(15rem, 92.5%, 23rem);
  height: 39rem;
  background-color: #ffffff;
  border-radius: 2rem;
  padding: 2.5rem 1.5rem;
  position: relative;

  > * {
    width: 100%;
  }

  @media (max-width: 450px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    ${flexbox({ direction: "column" })}
  }
`;

export default FormContainerStyles;
