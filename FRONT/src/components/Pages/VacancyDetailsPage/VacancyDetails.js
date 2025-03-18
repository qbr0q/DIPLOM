import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../BaseComponents/Header/Header';
import Vacancy from './Vacancy'
import Footer from '../BaseComponents/Footer/Footer';

const VacancyDetails = () => {
  const location = useLocation()
  const vacancy = location.state.vacancyInfo

  return (
    <>
        <Header/>
        <Vacancy vacancy={vacancy}/>
        <Footer/>
    </>
  );
}

export default VacancyDetails