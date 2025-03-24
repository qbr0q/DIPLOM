import {React, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../../../css/VacancyDetailsPage/vacancy.css'
import {BACKEND_URL} from '../../appContans'
import {formatDate, formatSalary} from '../../Utils'
 
const Vacancy = (state) => {

    const [vacancyInfo, setVacancyInfo] = useState(null)
    const [vacancyLoading, setVacancyLoading] = useState(true)

    const { vacancyId } = useParams();

    useEffect(() => {
        fetch(BACKEND_URL + `/vacancy/${vacancyId}`)
        .then(response => response.json())
        .then(data => {setVacancyInfo(data);
              setVacancyLoading(false)})
    }, [vacancyId])

    const [logo, setLogo] = useState(null)

    if (vacancyLoading) {
        return <div>Загрузка...</div>;
    }

    document.title = vacancyInfo.position

  /* useEffect(() => {
    window.scrollTo(0, 0)
  }, []) */

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
            <div className='vacancy_btns'>
                <button className='vacancy_respondBtn'>Откликнуться</button>
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