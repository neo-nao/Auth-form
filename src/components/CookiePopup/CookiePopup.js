import { useState, useEffect } from "react";
import styled from "styled-components";
import { flexbox } from "../../styles/ExtendableStyles/ExtendableStyles";
import { tokenCookie } from "../../services/cookieServices";
import { IoClose } from "react-icons/io5";
import Button from "../common/Button/Button";

const CookiePopupContainer = styled.div`
  transition: all 1s ease;
  ${(props) =>
    !props.isPopupShowing &&
    `
    pointer-events:none;
    bottom:-100% !important;
`}
  will-change:position;
  width: clamp(17rem, 90%, 22.75rem);
  height: 4.25rem;
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: var(--secondary-border-radius);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2), 0 3px 3px rgba(0, 0, 0, 0.05);
  padding: 10px;
  ${flexbox({ justify: "space-between" })}
  color: #363636;
  z-index: 20;
`;

const CookieAcceptButton = styled.button`
  transition: background 0.2s ease;
  width: clamp(6rem, 40%, 7rem);
  height: 100%;
  border-radius: 13px;
  font-size: 1rem;
  font-weight: 600;
  background-color: var(--secondary-blue);
  cursor: pointer;
  color: #fff;

  :hover {
    background-color: #008990;
  }
`;

const CookieButtonSection = styled.section`
  height: 100%;
  min-width: 9.5rem;
  ${flexbox({ justify: "space-between" })}
`;

const CookiePopup = () => {
  const [isPopupShowing, setIsPopupShowing] = useState(false);

  const handleCookiePopup = (confirmationValue) => {
    if (confirmationValue === "allow") {
      tokenCookie.cookieEnabled = true;
    }
    setIsPopupShowing(false);
  };

  useEffect(() => {
    if (!tokenCookie.isCookieEnabled) setIsPopupShowing(true);
  }, []);

  return (
    <CookiePopupContainer isPopupShowing={isPopupShowing}>
      <span style={{ padding: "0 10px" }}>Accept cookies?</span>
      <CookieButtonSection>
        <Button
          color="var(--secondary-blue)"
          rgb="50,220,200"
          width="48px"
          height="100%"
          onClick={() => handleCookiePopup("reject")}
        >
          <IoClose />
        </Button>
        <CookieAcceptButton onClick={() => handleCookiePopup("allow")}>
          Accept
        </CookieAcceptButton>
      </CookieButtonSection>
    </CookiePopupContainer>
  );
};

export default CookiePopup;
