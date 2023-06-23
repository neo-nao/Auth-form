import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tokenCookie, checkUserCookie } from "../../services/cookieServices";
import MainButton from "../../components/StyledButton/MainButton";
import { ProfileSection, ImageContainer } from "./ProfileStyles.styled";
import ProfileImage from "../../components/common/ProfileImage/ProfileImage";
import ProfileDetail from "./ProfileDetail";
import NotFound from "../NotFound/NotFound";
import { userAccount } from "../../services/userServices";
import { isPushed } from "../Login/Login";

const Profile = () => {
  const [userAccountState, setUserAccountState] = useState({});

  const getUserAccount = (token) => {
    const { getUserAccount } = userAccount();
    const userAcc = getUserAccount();
    const checkAcc = userAcc.userToken === token && userAcc;

    setUserAccountState(checkAcc || {});
  };

  const handleLogout = () => {
    tokenCookie.cookieEnabled = false;
    tokenCookie.deleteCookie();
  };

  useEffect(() => {
    const cookie = checkUserCookie();
    cookie.doesTokenExist && getUserAccount(cookie.token);
    isPushed.isPushed = true;
  }, []);

  return tokenCookie.cookieEnabled ? (
    <>
      <ProfileSection>
        <ImageContainer>
          <ProfileImage
            src={userAccountState.profileImage}
            size="125px"
            openable
          />
        </ImageContainer>
      </ProfileSection>
      <ProfileDetail userAccount={userAccountState} />
      <Link to="/">
        <MainButton style={{ marginTop: "3rem" }} onClick={handleLogout}>
          Log out
        </MainButton>
      </Link>
    </>
  ) : (
    <NotFound />
  );
};

export default Profile;
