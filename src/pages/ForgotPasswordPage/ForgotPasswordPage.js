import { useState } from "react";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import Button from "../../components/common/Button/Button";
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";
import ResetPasswordForm from "../../containers/ForgotPassword/ForgotPassword";
import { useAuthCode } from "../../providers/AuthCodeProvider";
import AuthCode from "../../containers/AuthCode/AuthCode";
import NotFound from "../NotFound/NotFound";
import ResetPassword from "../../containers/ResetPassword/ResetPassword";
import { toast } from "react-hot-toast";
import { userAccount } from "../../services/userServices";

const NavigationContainer = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
`;

const ForgotPasswordPage = ({ history }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [account, setAccount] = useState(null);

  const authCode = useAuthCode();

  const push2Login = () => history.push("/login");

  const handlePageSections = (value) => {
    setPageIndex(value);
  };

  const handleReturnClick = () =>
    pageIndex ? handlePageSections(pageIndex - 1) : push2Login();

  const mainTitle =
    pageIndex === 0 ? (
      <>Forgot password? &#129300;</>
    ) : pageIndex === 1 ? (
      "Authentication 🔐"
    ) : (
      "Reset Your Password 🔑"
    );
  const headerParagraph =
    pageIndex === 0
      ? "Here, you can pass your pre-signed up email or number to reset your password and Log in again successfully."
      : pageIndex === 1
      ? "We've just sent you an authentication code get it and pass it inside inputs"
      : "Now it's time to give a new password for your account and change to it";

  let authCodeToastId = null;

  const checkAccount = async (method, formValues) => {
    const promiseToast = toast.loading("Loading...");
    const { getUserAccount } = userAccount();
    const response =
      method === "email"
        ? getUserAccount().email.toLowerCase() ===
            formValues.email.toLowerCase() && getUserAccount()
        : getUserAccount().number === formValues.number && getUserAccount();

    const {
      data: [account],
    } = response;

    toast.dismiss(promiseToast);

    if (account) {
      handlePageSections(1);
      authCode.generateCode();

      authCodeToastId = toast(
        <>
          Your code :{" "}
          <h4 style={{ marginLeft: ".5ch" }}>{authCode.getCode()}</h4>
        </>,
        { icon: "📧", duration: 1000 * 60 }
      );

      setAccount(account);
    } else {
      toast.error("Account is not found!");
    }
  };

  const renderSections = () => {
    if (pageIndex === 0)
      return <ResetPasswordForm checkAccount={checkAccount} />;
    if (pageIndex === 1)
      return (
        <AuthCode
          handlePageSections={handlePageSections}
          authCodeToastId={authCodeToastId}
        />
      );
    if (pageIndex === 2)
      return <ResetPassword account={account} push2Login={push2Login} />;

    return <NotFound />;
  };

  return (
    <>
      <NavigationContainer>
        <Button rgb="20,100,220" onClick={handleReturnClick}>
          <IoIosArrowBack />
        </Button>
      </NavigationContainer>
      <HeaderTitle mainTitle={mainTitle} headerParagraph={headerParagraph} />
      <main style={{ margin: "2rem 0" }}>{renderSections()}</main>
    </>
  );
};

export default ForgotPasswordPage;
