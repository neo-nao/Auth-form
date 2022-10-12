import styled from "styled-components";
import ProfileImage from "../common/ProfileImage/ProfileImage";
import { BiImageAdd } from "react-icons/bi";

const ProfileSelectContainer = styled.section`
  height: 19rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const FileSelectContainer = styled.div`
  width: 50px;
  height: 70px;
  position: relative;
  overflow: hidden;

  :hover svg {
    color: var(--main-blue-dark) !important;
  }

  .add-image-icon {
    transition: color 0.25s ease;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 2.5px;
    top: -15px;
    pointer-events: none;
    z-index: 2;
    color: var(--main-blue);
  }

  > .file-button-text {
    position: absolute;
    bottom: 0;
    left: 50%;
    font-size: 85%;
    font-weight: 700;
    transform: translateX(-50%);
    pointer-events: none;
  }
`;

const FileSelectButton = styled.input.attrs((props) => ({
  type: "file",
  accept: ".jpg,.png",
}))`
  width: 100%;
  height: 200%;
  position: absolute;
  left: 0;
  top: -2rem;
  cursor: pointer;
`;

const ImageSelectSection = ({
  imageSrc,
  handleAddImage,
  handleRemoveImage,
}) => {
  return (
    <ProfileSelectContainer>
      <ProfileImage src={imageSrc} editMode={{ handleRemoveImage }} />
      <FileSelectContainer>
        <BiImageAdd className="add-image-icon" />
        <FileSelectButton onChange={handleAddImage} title="" />
        <span className="file-button-text">Gallery</span>
      </FileSelectContainer>
    </ProfileSelectContainer>
  );
};

export default ImageSelectSection;
