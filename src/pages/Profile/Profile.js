import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfileImage from "../../components/common/ProfileImage/ProfileImage";
import NotFound from "../../components/NotFound/NotFound";
import { getAccounts } from "../../services/accountServices";
import { tokenCookie, checkUserCookie } from "../../services/cookieServices";

const ProfileSection = styled.section`
  height: 25%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 2rem 2rem 0 0;
  background-color: dodgerblue;

  @media (max-width: 450px) {
    border-radius: 0;
  }
`;

const ImageContainer = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 0.5rem;
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 50%;
`;

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
    </>
  ) : (
    <NotFound />
  );
};

export default Profile;
