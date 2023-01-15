import styled from "styled-components";
import { flexbox } from "../../styles/ExtendableStyles/ExtendableStyles";

const ProfileSection = styled.section`
  height: 20%;
  position: absolute;
  top: 0;
  left: 0;
  margin-bottom: calc(62.5px + 0.5rem);
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

const ProfileDetailSection = styled.section`
  height: 50%;
  ${flexbox({ direction: "column", justify: "flex-start" })}
  margin-top: 12.5rem;

  > table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    border: 2.25px solid transparent;
    td {
      min-width: 8rem;
      height: fit-content;
      position: relative;
      border: 2.25px dashed #b1b1b1;
      padding: 0 10px;

      .cell-caption {
        font-size: 13px;
        position: absolute;
        top: 10px;
        left: 10px;
        color: var(--main-gray);
      }

      > p {
        width: 85%;
        position: absolute;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  > .name-container {
    ${flexbox()}
  }

  > div {
    padding: 0.5rem 0;
  }

  @media (min-width: 450px) {
    margin-top: calc(25% + 90px + 0.5rem);
  }
`;

export { ProfileSection, ImageContainer, ProfileDetailSection };
