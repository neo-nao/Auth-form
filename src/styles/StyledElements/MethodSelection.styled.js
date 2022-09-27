import styled from "styled-components";

const MethodSlider = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--light-blue);
  border-radius: var(--secondary-border-radius);
  padding: 0.4rem;
  position: relative;
  overflow: hidden;
`;

const MethodButton = styled.button`
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  ${({ isOnLeft }) => (isOnLeft ? `left:0;` : `right:0;`)}
  cursor: pointer;
  padding: 0 20px;
  background-color: transparent;
  z-index: 2;
`;

const SlideToggler = styled.div`
  transition: transform 0.15s ease;
  width: 50%;
  height: 100%;
  background-color: #fff;
  border-radius: 1rem;
  transform: translate(${({ method }) => (method === "email" ? 0 : "100%")}, 0);
`;

export { MethodSlider, MethodButton, SlideToggler };
