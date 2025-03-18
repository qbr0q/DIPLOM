import {React, useEffect} from 'react';
import Header from '../../Pages/BaseComponents/Header/Header'
import Support from './Support'
import Footer from '../../Pages/BaseComponents/Footer/Footer'

const Help = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  document.title = 'Помощь'
  
  return (
    <>
        <Header/>
        <Support/>
        <Footer/>
    </>
  );
}

export default Help