import { createBrowserRouter } from "react-router-dom";
import MainPage from './Pages/MainPage/MainPage'
import VacancyDetails from './Pages/VacancyDetailsPage/VacancyDetails'
import Team from "./Pages/TeamPage/Team";
import Account from './Pages/AccountPage/Auth/Account';
import Help from './Pages/HelpPage/Help'
import Profile from './Pages/AccountPage/Profile/Profile'
import ErrorPath from "./Pages/ErrorPage/ErrorPath";
import SignUp from "./Pages/SignUpPage/SignUp";
import Login from "./Pages/Login/Login";

const Routers = createBrowserRouter([
    {
      path: "/",
      element: <MainPage/>
    },
    {
      path: "/vacancy/:vacancyId",
      element: <VacancyDetails/>
    },
    {
      path: '/team',
      element: <Team/>
    },
    {
      path: '/account/auth',
      element: <Account/>
    },
    {
      path: '/account',
      element: <Profile/>
    },
    {
      path: '/help',
      element: <Help/>
    },
    {
      path: '/account/signup',
      element: <SignUp/>
    },
    {
      path: '/account/login',
      element: <Login/>
    },
    {
      path: '*',
      element: <ErrorPath/>
    }
  ]);

export default Routers