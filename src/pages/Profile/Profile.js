import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tokenCookie, checkUserCookie } from "../../services/cookieServices";
import MainButton from "../../components/StyledButton/MainButton";
import { ProfileSection, ImageContainer } from "./ProfileStyles.styled";
import ProfileImage from "../../components/common/ProfileImage/ProfileImage";
import ProfileDetail from "./ProfileDetail";
import NotFound from "../NotFound/NotFound";
import { userAccount } from "../../services/userServices";

const Profile = ({ location }) => {
  const [userAccountState, setUserAccountState] = useState({});

  const token = location.state ? location.state.token : null;

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
