import React, {useState, useEffect}  from 'react';
import Header from '../BaseComponents/Header/Header';
import Footer from '../BaseComponents/Footer/Footer';
import {BACKEND_URL} from '../../appContans'
import companyProfile from './companyProfile';
import candidateProfile from './candidateProfile';

const Profile = () => {
    document.title = 'Личный кабинет'

    const [role, setRole] = useState(null)

    useEffect(() => {
        if (document.cookie.includes('access_token=')) {
            fetch(BACKEND_URL + '/getRole', {credentials: 'include'})
            .then(response => response.json())
            .then(data => setRole(data))
        }
    }, [])

    return (
      <>
        {console.log(role)}
        <Header/>
        {role === 'company'
        ? <companyProfile/>
        : <candidateProfile/>}
        <Footer/>
      </>
    );
  };

export default Profile