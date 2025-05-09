import React, {useState, useEffect} from "react";
import Header from "../BaseComponents/Header/Header"
import UnderHeader from "./Body/UnderHeader";
import Vacancies from "./Body/Vacancies";
import Candidates from "./Body/Candidates";
import Footer from "../BaseComponents/Footer/Footer";
import {BACKEND_URL} from '../../appContans'
import {fetchData} from '../../Utils'

const MainPage = () => {
    document.title = 'SuperJob'

    const [role, setRole] = useState('candidate')

    useEffect(() => {
        if (document.cookie.includes('access_token=')) {
            fetchData('/getRole', setRole)
        }
    }, [])

    if (!role) {
        return <div>Загрузка..</div>
    }

    return (
      <>
        <Header/>
        <UnderHeader/>
        {role === 'company'
        ? <Candidates/>
        : <Vacancies/>}
        <Footer/>
      </>
    );
}

export default MainPage