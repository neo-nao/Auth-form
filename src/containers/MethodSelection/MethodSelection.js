import { memo } from "react";
import {
  MethodSlider,
  MethodButton,
  SlideToggler,
} from "../../styles/StyledElements/MethodSelection.styled";

const MethodSelection = ({ method, methodHandler }) => {
  console.log("render method select");
  return (
    <section style={{ height: "var(--button-height)" }}>
      <MethodSlider>
        <MethodButton
          onClick={() => methodHandler("email")}
          isOnLeft={true}
          type="button"
        >
          Email
        </MethodButton>
        <MethodButton
          onClick={() => methodHandler("number")}
          isOnLeft={false}
          type="button"
        >
          Phone number
        </MethodButton>
        <SlideToggler method={method} />
      </MethodSlider>
    </section>
  );
};

export default MethodSelection;
