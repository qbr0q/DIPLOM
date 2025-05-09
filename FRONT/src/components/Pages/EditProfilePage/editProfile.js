import React, {useState, useEffect}  from 'react';
import Header from '../BaseComponents/Header/Header';
import Footer from '../BaseComponents/Footer/Footer';
import EditCompanyProfile from './editCompanyProfile';
import EditCandidateProfile from './editCandidateProfile';
import {BACKEND_URL} from '../../appContans'
import {fetchData} from '../../Utils'

const EditProfile = () => {

    document.title = 'Редактирование профиля'

    const [role, setRole] = useState(null);

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
        ? <EditCompanyProfile/>
        : <EditCandidateProfile/>}
        <Footer/>
      </>
    );
  };

export default EditProfile