import React, {useState, useEffect}  from 'react';
import Header from '../BaseComponents/Header/Header';
import Footer from '../BaseComponents/Footer/Footer';
import {BACKEND_URL} from '../../appContans'
import CompanyProfile from './companyProfile';
import CandidateProfile from './candidateProfile';
import {fetchData} from '../../Utils'

const Profile = () => {
    document.title = 'Личный кабинет'

    const [role, setRole] = useState(null)
    const [companyProfileInfo, setCompanyProfileInfo] = useState(null)
    const [candidateProfileInfo, setCandidateProfileInfo] = useState(null)

    useEffect(() => {
        fetchData('/getRole', setRole)
    }, [])

    if (!role) {
        return <div>Загрузка...</div>;
    }

    return (
      <>
        <Header/>
        {role == 'company'
        ? <CompanyProfile/>
        : <CandidateProfile/>}
        <Footer/>
      </>
    );
  };

export default Profile