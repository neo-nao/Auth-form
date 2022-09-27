import styled from "styled-components";

const HeaderHeading = styled.h2`
  color: var(--main-blue);
  margin-bottom: 15px;
  text-transform: capitalize;
`;

const HeaderParagraph = styled.p`
  color: var(--main-gray);
  font-weight: 500;
  line-height: 2.5ch;
  font-size: 13px;
`;

const HeaderTitle = ({ mainTitle, headerParagraph }) => {
  return (
    <header>
      <HeaderHeading>{mainTitle}</HeaderHeading>
      <HeaderParagraph>{headerParagraph}</HeaderParagraph>
    </header>
  );
};

export default HeaderTitle;
