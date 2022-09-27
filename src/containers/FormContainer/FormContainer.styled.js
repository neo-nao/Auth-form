import styled from "styled-components";

const FormContainerStyles = styled.section`
  width: clamp(15rem, 92.5%, 23rem);
  height: 39rem;
  background-color: #ffffff;
  border-radius: 2rem;
  padding: 2.5rem 1.5rem;

  > * {
    width: 100%;
  }

  @media (max-width: 450px) {
    width: 100%;
    height: 37.5rem;
    max-height: 40rem;
    border-radius: 0;
  }

  @media (max-height: 600px) {
    margin: auto;
  }
`;

export default FormContainerStyles;
