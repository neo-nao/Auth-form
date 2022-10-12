import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles/globalStyles.styled";
import FormContainer from "./containers/FormContainer/FormContainer";
import { flexbox } from "./styles/ExtendableStyles/ExtendableStyles";
import { Toaster } from "react-hot-toast";
import CookiePopup from "./components/CookiePopup/CookiePopup";

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  ${flexbox()}

  @media (max-width: 450px) {
    height: calc(100vh - 8vh);
  }
`;

const LargeImageContainer = styled.div`
  transition: background-color 0.2s ease;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  visibility: hidden;
  z-index: 50;

  > .image-shown {
    transition: border-radius 0.4s ease, transform 0.4s ease, top 0.4s ease,
      left 0.4s ease, all 0.4s ease;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    top: 50% !important;

    transform: translateY(-50%) scale(5);

    > img {
      opacity: 1;
    }

    @media (max-width: 680px) {
      transform: translateY(-50%) scale(4) !important;
    }
    @media (max-width: 534px) {
      transform: translateY(-50%) scale(3) !important;
    }
    @media (max-width: 405px) {
      transform: translateY(-50%) scale(2.5) !important;
    }
    @media (max-width: 350px) {
      transform: translateY(-50%) scale(2) !important;
    }
  }
`;

const LargeImage = styled.div`
  transition: all 0.3s ease;
  width: 125px;
  height: 125px;
  border-radius: 50%;
  background-color: #777;
  position: absolute;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  z-index: 10;

  > img {
    transition: opacity 0.3s ease;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    opacity: 0;
  }
`;

const closeImage = (e) => {
  e.target.style.backgroundColor = "rgba(0,0,0,0)";
  e.target.style.visibility = "hidden";

  document
    .getElementById("large-image-container")
    .children.item(0)
    .removeChild(document.querySelector("#large-image > img"));

  document.getElementById("large-image").classList.remove("image-shown");
};

function App() {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <FormContainer />
        <CookiePopup />
        <Toaster />
      </AppContainer>
      <LargeImageContainer id="large-image-container" onClick={closeImage}>
        <LargeImage id="large-image"></LargeImage>
      </LargeImageContainer>
    </>
  );
}

export default App;
