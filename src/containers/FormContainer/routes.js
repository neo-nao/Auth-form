import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";
import Profile from "../../pages/Profile/Profile";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import NotFound from "../../components/NotFound/NotFound";

const routes = [
  {
    id: 1,
    exact: true,
    path: ["", "/login"],
    Component: Login,
  },
  { id: 3, path: "/signup", component: Signup },
  { id: 2, path: "/profile", component: Profile },
  { id: 4, path: "/forgot-password", component: ForgotPassword },
  { id: 5, path: "*", component: NotFound },
];

export default routes;
