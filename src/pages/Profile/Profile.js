import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NotFound from "../../components/NotFound/NotFound";
import { getAccounts } from "../../services/accountServices";
import { tokenCookie, checkUserCookie } from "../../services/cookieServices";

const Profile = ({ location }) => {
  const [userAccount, setUserAccount] = useState({});

  const token = location.state ? location.state.token : null;

  const getUserAccount = async (token) => {
    const response = await getAccounts(`?userToken=${token}`);

    setUserAccount(response.data[0] || {});
  };

  const handleLogout = () => {
    tokenCookie.cookieEnabled = false;
    tokenCookie.deleteCookie();
  };

  useEffect(() => {
    token && getUserAccount(token);

    tokenCookie.isCookieEnabled &&
      !checkUserCookie().doesTokenExist &&
      token &&
      tokenCookie.createTokenCookie({ cookiePassedValue: token });
  }, []);

  return token ? (
    <section>
      <ul>
        {Object.keys(userAccount).map((uak, idx) => (
          <li key={idx} style={{ margin: "1rem" }}>
            {uak} : {userAccount[uak] || "empty"}
          </li>
        ))}
      </ul>
      <Link to="/login" onClick={handleLogout} style={{ padding: "10px 15px" }}>
        Log out
      </Link>
    </section>
  ) : (
    <NotFound />
  );
};

export default Profile;
