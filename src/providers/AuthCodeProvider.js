import { createContext, useContext } from "react";
import { authCodeGenerator } from "../utils/utils";

const AuthGeneratorContext = createContext();
const useAuthCode = () => useContext(AuthGeneratorContext);

const AuthCodeProvider = ({ children }) => {
  const authCode = new authCodeGenerator();

  return (
    <AuthGeneratorContext.Provider value={authCode}>
      {children}
    </AuthGeneratorContext.Provider>
  );
};

export { useAuthCode };
export default AuthCodeProvider;
