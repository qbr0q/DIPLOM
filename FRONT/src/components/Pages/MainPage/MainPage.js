import React, {useState, useEffect} from "react";
import Header from "../BaseComponents/Header/Header"
import UnderHeader from "./Body/UnderHeader";
import Vacancies from "./Body/Vacancies";
import Candidates from "./Body/Candidates";
import Footer from "../BaseComponents/Footer/Footer";
import {BACKEND_URL} from '../../appContans'

const MainPage = () => {
    document.title = 'SuperJob'

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