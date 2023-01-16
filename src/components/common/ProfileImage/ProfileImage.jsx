import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { flexbox } from "../../../styles/ExtendableStyles/ExtendableStyles";
import { showLargeImage } from "../../../utils/utils";

const ProfileImageStyled = styled.div`
  --main-border-radius: 50%;
  width: ${(props) => props.size ?? "190px"};
  height: ${(props) => props.size ?? "190px"};
  border-radius: var(--main-border-radius);
  border: 3.5px solid var(--main-blue);
  padding: 3px;
  ${flexbox()}
  position: relative;

  > .user-icon {
    color: skyblue;
    width: 100%;
    height: 100%;
    transform: scale(1.225);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--main-border-radius);
  user-select: none;
  ${(props) => (props.openable ? "cursor: pointer;" : "")}
`;

const RemoveImageButton = styled.div`
  width: 30%;
  height: 30%;
  border-radius: var(--main-border-radius);
  background-color: var(--light-blue);
  position: absolute;
  top: 74%;
  left: 64%;
  ${flexbox()}
  cursor: pointer;
`;

const ProfileImage = ({ src, editMode, size, openable }) => {
  const handleImageOpen = ({ target }) => {
    const { top, left } = target.getBoundingClientRect();

    showLargeImage({
      x: left,
      y: top,
      src: target.src,
    });
  };

  return (
    <ProfileImageStyled size={size}>
      {src ? (
        <Image
          src={src}
          alt="Image preview"
          draggable="false"
          openable={openable}
          onClick={(e) => openable && handleImageOpen(e)}
        />
      ) : (
        <IoPersonCircleOutline className="user-icon" />
      )}
      {editMode && (
        <RemoveImageButton onClick={editMode.handleRemoveImage}>
          <BiTrash color="var(--main-blue)" size={"55%"} />
        </RemoveImageButton>
      )}
    </ProfileImageStyled>
  );
};

export default ProfileImage;
