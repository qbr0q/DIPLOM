import {React, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../../../css/VacancyDetailsPage/vacancy.css'
import {BACKEND_URL} from '../../appContans'
import {formatDate, formatSalary} from '../../Utils'

const sendCandidateResponse = async (vacancyId) => {
    let resMess = document.getElementById('resMess').value;
    let data = {'vacancyId': vacancyId, 'resMess': resMess}

    const response = await fetch(BACKEND_URL + '/sendCandidateResponse', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })

    const jsonData = await response.json();
    console.log(response)
}
 
const Vacancy = (state) => {

    const [vacancyInfo, setVacancyInfo] = useState(null)

    const { vacancyId } = useParams();

    useEffect(() => {
         let fetchData = async function(){
             const response = await fetch(BACKEND_URL + `/vacancy/${vacancyId}`)
             const data = await response.json()
             setVacancyInfo(data)
         }
         fetchData()
    }, [])

    const [logo, setLogo] = useState(null)

    if (!vacancyInfo) {
        return <div>Загрузка...</div>;
    }

    document.title = vacancyInfo.position

  return (
    <>
        <div className='vacancyInfo'>
            <h1 className='vacancyWork'>{vacancyInfo.position}</h1>
            <h2 className='vacancySalary'>{formatSalary(vacancyInfo.salary,
                                      vacancyInfo.currencySymbol,
                                      vacancyInfo.duration)}</h2>
            <h3 className='jobDescription'>{vacancyInfo.jobDescription}</h3>
            <div className='workingConditions'>
                <h3>Рабочие условия: </h3>
                <ul>
                {vacancyInfo.jobDuties.map((workingCondition, keyWC) => {
                    return <li><h3 className='workingCondition' key={keyWC}>{workingCondition}</h3></li>
                })}
                </ul>
            </div>
            <div className='requirementsOfTheCandidate'>
                <h3>Требования к кандидату: </h3>
                <ul>
                {vacancyInfo.candidateRequirements.map((requirementOfTheCandidate, keyRO) => {
                    return <li><h3 className='requirementOfTheCandidate' key={keyRO}>{requirementOfTheCandidate}</h3></li>
                })}
                </ul>
            </div>
            <textarea className='resMess' id='resMess' placeholder='Сопроводительное письмо'
            onInput={(e) => {e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ0-9\s.,!?()\-]/g, '')}} />
            <div className='vacancy_btns'>
                <button className='vacancy_respondBtn'
                    onClick={() => sendCandidateResponse(vacancyId)}>Откликнуться</button>
            {vacancyInfo.isCalling === true ?
                <button className='vacancy_callBtn'>Позвонить</button> :
            null}
            </div>
        </div>
        <div className='companyInfo'>
            <img src={logo} alt='логотип компании' className='companyLogo'/>
            <div className='companyContainer'>
                <h3 className='companyName'>{vacancyInfo.companyName}</h3>
                <h4 className='companyDescription'>{vacancyInfo.companyDescription}</h4>
                <h5 className='companyAddress'>{vacancyInfo.companyAddress}</h5>
            </div>
        </div>
    </>
  );
}

export default Vacancy