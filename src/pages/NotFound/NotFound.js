import styled from "styled-components";
import { flexbox } from "../../styles/ExtendableStyles/ExtendableStyles";

const NotFoundPageContainer = styled.div`
  width: 100%;
  height: 100%;
  ${flexbox()}

  h1 {
    font-size: 30px;
    color: var(--main-blue);
  }
`;

const NotFound = () => {
  return (
    <NotFoundPageContainer>
      <h1>404 - Not Found</h1>
    </NotFoundPageContainer>
  );
};

export default NotFound;
