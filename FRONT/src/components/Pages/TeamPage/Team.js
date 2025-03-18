import {React, useEffect} from 'react';
import Header from '../BaseComponents/Header/Header'
import Members from './Members'
import Footer from '../BaseComponents/Footer/Footer'

const Team = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  document.title = 'Наша команда'

  return (
    <>
      <Header/>
      <Members/>
      <Footer/>
    </>
  );
}

export default Team