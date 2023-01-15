import { useState } from "react";
import styled from "styled-components";
import MethodSelection from "../MethodSelection/MethodSelection";
import LoginForm from "../LoginForm/LoginForm";
import AuthMethodSelection from "../../components/AuthMethodSelection/AuthMethodSelection";

const MainForm = () => {
  const [method, setMethod] = useState("email");

  const methodHandler = (method) => {
    setMethod(method);
  };

  return (
    <main style={{ margin: "2rem 0" }}>
      <MethodSelection method={method} methodHandler={methodHandler} />
      <LoginForm method={method} />
      <AuthMethodSelection
        authText="Don't have an account?"
        authRedirect={{ redirectLink: "/signup", redirectText: "Sign up" }}
      />
    </main>
  );
};

export default MainForm;
