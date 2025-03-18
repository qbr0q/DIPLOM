import {React, useEffect} from 'react';
import Header from '../../BaseComponents/Header/Header'
import ProfileContent from './profileContentn';
import Footer from '../../BaseComponents/Footer/Footer'

const Account = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  document.title = 'Мой аккаунт'

  return (
    <>
      <Header/>
      <ProfileContent/>
      <Footer/>
    </>
  );
}

export default Account