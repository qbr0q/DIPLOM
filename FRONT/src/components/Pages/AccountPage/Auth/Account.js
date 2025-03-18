import {React, useEffect} from 'react';
import Header from '../../BaseComponents/Header/Header'
import Auth from './Auth'
import Footer from '../../BaseComponents/Footer/Footer'

const Account = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header/>
      <Auth/>
      <Footer/>
    </>
  );
}

export default Account