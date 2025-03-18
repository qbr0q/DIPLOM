import React from "react";
import Header from "../BaseComponents/Header/Header"
import UnderHeader from "./Body/UnderHeader";
import Switcher from "./Body/Switcher";
// import Vacancies from "./Body/Vacancies";
import Footer from "../BaseComponents/Footer/Footer";

  const MainPage = () => {
    document.title = 'SuperJob'

    return (
      <div>
        <Header/>
        <UnderHeader/>
        <Switcher/>
        {/* <Vacancies/> теперь вакансии в свитчере*/} 
        <Footer/>
      </div>
    );
  }

export default MainPage