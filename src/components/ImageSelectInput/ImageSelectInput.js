import styled from "styled-components";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BiImageAdd } from "react-icons/bi";

const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  background-color: red;
  
`;

const FileSelectContainer = styled.div`
  width: 45px;
  height: 45px;
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
    top: 1px;
    pointer-events: none;
    color: var(--main-blue);
    z-index: 2;
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

const ImageSelectInput = () => {
  const handleFileSelect = (e) => {
    console.log(e);
  };

  return (
    <>
      <ProfileImage />
      <IoPersonCircleOutline />
      <FileSelectContainer>
        <BiImageAdd className="add-image-icon" />
        <FileSelectButton onChange={handleFileSelect} title="" />
      </FileSelectContainer>
    </>
  );
};

export default ImageSelectInput;
