import { Link } from "react-router-dom";
import styled from "styled-components";

const AuthMethodSelectionContainer = styled.section`
  font-size: 13px;
  letter-spacing: 0;
  text-align: center;
  margin-top: 25px;

  > a {
    text-decoration: none;
  }
`;

const SignupLink = styled.span`
  color: var(--main-blue);
  font-weight: 600;
  position: relative;

  ::after {
    content: "";
    transition: all 0.2s ease;
    width: 0;
    height: 2.5px;
    background-color: var(--main-blue);
    border-radius: 20px;
    position: absolute;
    bottom: -5px;
    left: calc(50% + 1.5px);
    transform: translateX(-50%);
    opacity: 0;
  }

  :hover::after {
    width: 100%;
    opacity: 1;
  }
`;

const AuthMethodSelection = ({
  authText,
  authRedirect: { redirectLink, redirectText },
}) => {
  return (
    <AuthMethodSelectionContainer>
      <span style={{ color: "var(--main-gray)" }}>{authText}</span>
      <Link to={redirectLink}>
        <SignupLink>{" " + redirectText}</SignupLink>
      </Link>
    </AuthMethodSelectionContainer>
  );
};

export default AuthMethodSelection;
