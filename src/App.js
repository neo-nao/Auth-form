import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles/globalStyles.styled";
import FormContainer from "./containers/FormContainer/FormContainer";
import { flexbox } from "./styles/ExtendableStyles/ExtendableStyles";
import { Toaster } from "react-hot-toast";
import { tokenCookie } from "./services/cookieServices";

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  ${flexbox()};

  @media (max-width: 450px) {
    height: 92vh;
  }

  @media (max-height: 600px) {
    display: block;
  }
`;

const cookieAsker = () => {
  const confirmPopup = window.confirm("Accept cookies?");
  if (confirmPopup) {
    tokenCookie.cookieEnabled = true;
  }
};

!tokenCookie.isCookieEnabled && cookieAsker()

function App() {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <FormContainer />
        <Toaster />
      </AppContainer>
    </>
  );
}

export default App;
