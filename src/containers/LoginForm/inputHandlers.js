import { IoMailOutline } from "react-icons/io5";
import { FiLock, FiPhone } from "react-icons/fi";

export default function inputHandlers() {
  const checkInputType = (inputType) => {
    switch (inputType.toLowerCase()) {
      case "email":
        return <IoMailOutline />;
      case "password":
        return <FiLock />;
      case "tel":
        return <FiPhone />;
      default:
    }
  };

  return { checkInputType };
}
