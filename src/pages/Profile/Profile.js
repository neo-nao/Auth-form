import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tokenCookie, checkUserCookie } from "../../services/cookieServices";
import { getAccounts } from "../../services/accountServices";
import { ProfileSection, ImageContainer } from "./ProfileStyles.styled";
import ProfileImage from "../../components/common/ProfileImage/ProfileImage";
import ProfileDetail from "./ProfileDetail";
import NotFound from "../../components/NotFound/NotFound";

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

    tokenCookie.cookieEnabled &&
      !checkUserCookie().doesTokenExist &&
      token &&
      tokenCookie.createTokenCookie({ cookiePassedValue: token });
  }, []);

  return token ? (
    <>
      <ProfileSection>
        <ImageContainer>
          <ProfileImage src={userAccount.profileImage} size="125px" openable />
        </ImageContainer>
      </ProfileSection>
      <ProfileDetail userAccount={userAccount} />
    </>
  ) : (
    <NotFound />
  );
};

export default Profile;
