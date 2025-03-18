import {React, useState, useEffect} from 'react';
import '../../../css/VacancyDetailsPage/vacancy.css'
 
const Vacancy = (vacancy) => {
  const vacanciesDetailsList = require('../../appContans').vacanciesDetailsList
  const companiesInfo = require('../../appContans').companiesInfo 

  const vacancyConfig = vacancy['vacancy']['config']
  const vacancyDetails = vacanciesDetailsList[vacancyConfig['id']]
  const vacancyInfo = vacancy['vacancy']['vacancyInformation']

  const companyName = vacancyInfo['company']
  const companyInfo = companiesInfo[companyName]

  const [logo, setLogo] = useState(null)
  useEffect(() => {
    const companyLogo = import(`../../../media/companysLogo/${companyName}.svg`)
    companyLogo.then((module) => {
      setLogo(module.default)
    })
  }, [companyInfo, companyName])

  document.title = vacancyInfo.work

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className='vacancyInfo'>
        <h1 className='vacancyWork'>{vacancyInfo.work}</h1>
        <h2 className='vacancySalary'>{vacancyInfo.salary}</h2>
        <h3 className='jobDescription'>{vacancyDetails.jobDescription}</h3>
        <div className='workingConditions'> 
          <h3 className='a'>Рабочие условия: </h3>
            <ul>
              {vacancyDetails.workingConditions.map((workingCondition, keyWC) => {
                  return <li><h3 className='workingCondition' key={keyWC}>{workingCondition}</h3></li>
              })}
             </ul>
        </div>
        <div className='requirementsOfTheCandidate'> 
          <h3>Требования к кандидату: </h3>
            <ul>
              {vacancyDetails.requirementsOfTheCandidate.map((requirementOfTheCandidate, keyRO) => {
                    return <li><h3 className='requirementOfTheCandidate' key={keyRO}>{requirementOfTheCandidate}</h3></li>
                })}
            </ul>
        </div>
        <div className='vacancy_btns'>
        <button className='vacancy_respondBtn'>Откликнуться</button>
          {vacancyConfig.is_calling ?
          <button className='vacancy_callBtn'>Позвонить</button> :
          null}
        </div>
      </div>
      <div className='companyInfo'>
        <img src={logo} alt='логотип компании' className='companyLogo'/>
        <div className='companyContainer'>
          <h3 className='companyName'>{companyName}</h3>
          <h4 className='companyDescription'>{companyInfo.companyDescription}</h4>
          <h5 className='companyAddress'>{companyInfo.companyAddress}</h5>
        </div>
      </div>
    </>
  );
}

export default Vacancy