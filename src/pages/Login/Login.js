import { useEffect } from "react";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import MainForm from "../../containers/MainForm/MainForm";
import { checkUserCookie } from "../../services/cookieServices";

const Login = ({ authenticationMethodHandler, history }) => {
  const handleAutoLogin = (token) => {
    token &&
      history.push({
        pathname: `/profile`,
        state: { token },
      });
  };

  useEffect(() => {
    const userToken = checkUserCookie();
    userToken.doesTokenExist && handleAutoLogin(userToken.token);
  }, []);

  return (
    <>
      <HeaderTitle
        mainTitle="welcome back &#128075;"
        headerParagraph="We're happy to see you again. To use your account, you should log in
        first."
      />
      <MainForm authenticationMethodHandler={authenticationMethodHandler} />
    </>
  );
};

export default Login;
