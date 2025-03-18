import {React, useEffect} from 'react';
import Header from '../../Pages/BaseComponents/Header/Header'
import ErrorMes from './ErrorMes'
import Footer from '../../Pages/BaseComponents/Footer/Footer'

const ErrorPath = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  document.title = 'Ошибка 404'
  
  return (
    <>
        <Header/>
        <ErrorMes/>
        <Footer/>
    </>
  );
}

export default ErrorPath