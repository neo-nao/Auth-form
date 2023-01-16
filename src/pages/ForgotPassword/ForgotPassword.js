import { useState } from "react";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import Button from "../../components/common/Button/Button";
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";
import ResetPasswordForm from "../../containers/ResetPasswordForm/ResetPasswordForm";
import { useAuthCode } from "../../providers/AuthCodeProvider";
import AuthCode from "../../containers/AuthCode/AuthCode";

const NavigationContainer = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
`;

const ForgotPassword = ({ history }) => {
  const [isOnAuthCode, setIsOnAuthCode] = useState(false);

  const authCode = useAuthCode();

  const handleIsOnAuthCode = (value) => {
    setIsOnAuthCode(value);
  };

  const handleReturnClick = () =>
    isOnAuthCode ? handleIsOnAuthCode(false) : history.push("/login");

  const mainTitle = !isOnAuthCode ? <>Forgot password? &#129300;</> : "";
  const headerParagraph = !isOnAuthCode
    ? "Here, you can pass your pre-signed up email or number to reset your password and Log in again successfully."
    : "";

  return (
    <>
      <NavigationContainer>
        <Button rgb="20,100,220" onClick={handleReturnClick}>
          <IoIosArrowBack />
        </Button>
      </NavigationContainer>
      <HeaderTitle mainTitle={mainTitle} headerParagraph={headerParagraph} />
      <main style={{ margin: "2rem 0" }}>
        {!isOnAuthCode ? (
          <ResetPasswordForm
            handleIsOnAuthCode={handleIsOnAuthCode}
            authCode={authCode}
          />
        ) : (
          <AuthCode />
        )}
      </main>
    </>
  );
};

export default ForgotPassword;
