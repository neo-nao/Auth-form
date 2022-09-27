import styled from "styled-components";
import { flexbox } from "../../styles/ExtendableStyles/ExtendableStyles";

const SeperatorContainer = styled.div`
  width: 100%;
  height: 10px;
  ${flexbox()}
  position:relative;
  user-select: none;
`;

const SeperatorLine = styled.hr`
  width: 100%;
  height: 2px;
  background-color: var(--main-gray);
  position: absolute;
`;

const SeperatorTitle = styled.span`
  color: var(--main-gray);
  padding: 0 10px;
  background-color: #fff;
  font-size: 13px;
  z-index: 1;
`;

const SectionSeperator = ({ title, ...rest }) => {
  return (
    <SeperatorContainer {...rest}>
      <SeperatorLine />
      <SeperatorTitle>{title}</SeperatorTitle>
    </SeperatorContainer>
  );
};

export default SectionSeperator;
