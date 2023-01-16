import styled from "styled-components";
import { flexbox } from "../../../styles/ExtendableStyles/ExtendableStyles";

const Button = styled.button`
  transition: box-shadow 0.15s ease, border 0.25s ease,
    background 0.5s cubic-bezier(0, 1, 1, 0.99);
  width: ${(props) => props.width ?? "50px"};
  height: ${(props) => props.height ?? "50px"};
  ${flexbox()}
  border-radius: 15px;
  font-size: 1.75rem;
  background-color: #fff;
  border: 2px solid ${(props) => `rgba(${props.rgb},.15)` ?? "lightblue"};
  color: ${(props) => props.color ?? "var(--main-blue)"};
  cursor: pointer;

  :focus {
    box-shadow: 0 0 0 3px rgba(${(props) => props.rgb ?? "0,0,200"}, 0.35);
    border: 2px solid ${(props) => `rgba(${props.rgb},.7)` ?? "lightblue"};
  }

  :active {
    background-color: rgba(${(props) => props.rgb ?? "50,220,200"}, 0.125);
  }
`;

export default Button;
