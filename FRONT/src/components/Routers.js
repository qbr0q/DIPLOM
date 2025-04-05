import { createBrowserRouter } from "react-router-dom";
import MainPage from './Pages/MainPage/MainPage'
import VacancyDetails from './Pages/VacancyDetailsPage/VacancyDetails'
import Team from "./Pages/TeamPage/Team";
import Help from './Pages/HelpPage/Help'
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