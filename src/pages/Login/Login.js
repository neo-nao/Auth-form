import { useEffect } from "react";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import MainForm from "../../containers/MainForm/MainForm";
import { checkUserCookie } from "../../services/cookieServices";

export const isPushed = { isPushed: false };

const Login = ({ history }) => {
  const handleAutoLogin = (token) => {
    if (token) {
      history.push({
        pathname: `/profile`,
        state: { token },
      });
    }
  };

  useEffect(() => {
    const userToken = checkUserCookie();
    userToken.doesTokenExist &&
      !isPushed.isPushed &&
      handleAutoLogin(userToken.token);
  }, []);

  return (
    <>
      <HeaderTitle
        mainTitle="welcome back &#128075;"
        headerParagraph="We're happy to see you again. To use your account, you should log in
        first."
      />
      <MainForm />
    </>
  );
};

export default Login;
