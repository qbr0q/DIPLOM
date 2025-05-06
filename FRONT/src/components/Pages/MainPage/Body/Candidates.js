import React, {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import '../../../../css/MainPage/candidates.css'
import {BACKEND_URL} from '../../../appContans'

const Candidates = () => {

    const [candidatesList, setCandidatesList] = useState([])

    useEffect(() => {
         let fetchData = async function(){
             const response = await fetch(BACKEND_URL + '/allCandidates')
             const data = await response.json()
             setCandidatesList(data)
         }
         fetchData()
    }, [])

    if (!candidatesList) {
        return <div>Загрузка...</div>;
    }

    return (
      <div className='candidates'>
        {
            Object.values(candidatesList).map((data, index) => (
                <div className='candidateContainer' key={index}>
                    <Link to={`/candidate/${data.id}`} className='name'>
                        {data.lastName} {data.firstName} {data.patronymic ? data.patronymic : ''}
                    </Link>
                    <h3 className='job'>{data.job}</h3>
                    <h4 className='workExperience'>{data.workExperience}</h4>
                    <button className='candidateRespondBtn'
                        onClick={() => window.location.href = `/candidate/${data.id}`}>
                        Связаться с кандидатом</button>
                </div>
                )
            )
        }
      </div>
    );
  };

export default Candidates