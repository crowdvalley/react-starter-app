import Restricted from "../components/HOC/restricted.jsx";
import LoginPage from "../containers/Login";
import RegisterPage from "../containers/Signup";
import HomePage from "../containers/Home";

const pagesRoutes = [
  {
    path: "/register",
    name: "Register Page",
    short: "Register",
    component: RegisterPage,
    hidden: true
  },
  {
    path: "/login",
    name: "Login Page",
    short: "Login",
    component: LoginPage,
    hidden: true
  },
  {
      path: "/home",
      name: "Home Page",
      short: "Home",
      component: Restricted(HomePage),
      hidden: true
  },
  {
    redirect: true,
    path: "/",
    pathTo: "/home",
    name: "Home Page",
    hidden: true
  },
];

export default pagesRoutes;
