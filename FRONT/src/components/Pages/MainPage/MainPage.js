import React from "react";
import Header from "../BaseComponents/Header/Header"
import UnderHeader from "./Body/UnderHeader";
import Vacancies from "./Body/Vacancies";
import Footer from "../BaseComponents/Footer/Footer";

  const MainPage = () => {
    document.title = 'SuperJob'

    return (
      <>
        <Header/>
        <UnderHeader/>
        <Vacancies/>
        <Footer/>
      </>
    );
  }

export default MainPage