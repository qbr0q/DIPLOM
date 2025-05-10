import {React, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Header from '../BaseComponents/Header/Header';
import Footer from '../BaseComponents/Footer/Footer';
import '../../../css/VacancyPage/vacancy.css'
import {BACKEND_URL} from '../../appContans'
import {formatSalary, showNotification} from '../../Utils'

 
const Vacancy = (state) => {

    const [vacancyInfo, setVacancyInfo] = useState(null);
    const [isAnswered, setIsAnswered] = useState(null);
    const [refreshFlag, setRefreshFlag] = useState(false);

    const { vacancyId } = useParams();

    // получаем данные о вакансии
    useEffect(() => {
         let fetchVacancyData = async function(){
             const response = await fetch(BACKEND_URL + `/vacancy/${vacancyId}`)
             const data = await response.json()
             setVacancyInfo(data)
         }
         fetchVacancyData()
    }, [vacancyId])

    // получаем данные о статусе отклика
    useEffect(() => {
         let fetchIsAnswered = async function(){
         let url = `${BACKEND_URL}/isResponseAnswered?vacancy_id=${vacancyId}&response_type=1`
             const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
             });
             const data = await response.json()
             setIsAnswered(data)
         }
         if (document.cookie.includes('access_token=')) {
            fetchIsAnswered();
         }
    }, [vacancyId, refreshFlag])

    // функция отрпавляющая отклик в responses
    const sendResponse = async (vacancyId) => {
        let resMess = document.getElementById('resMess').value;
        let data = {'vacancyId': vacancyId, 'resMess': resMess, 'role': 'candidate'}

        const response = await fetch(BACKEND_URL + '/sendResponse', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })

        const jsonData = await response.json();
        if (response.ok) {
            showNotification('Успех!', jsonData.message, 'success');
            setRefreshFlag(prev => !prev);
        } else {
            showNotification('Ошибка!', JSON.stringify(jsonData.detail), 'error');
        }
    }

    const [logo, setLogo] = useState(null)

    if (!vacancyInfo) {
        return <div>Загрузка...</div>;
    }

    // если в базе нет записи с айдишником юзера и вакансией - отлика не было, иначе смотрим на значение в базе
    let responseStatus = null
    if (isAnswered === null) {
        responseStatus = <>
        <textarea className='resMess' id='resMess' placeholder='Сопроводительное письмо'/>
        <div className='vacancy_btns'>
            <button className='vacancy_respondBtn'
                onClick={() => sendResponse(vacancyId)}>Откликнуться</button>
        {vacancyInfo.isCalling === true ?
            <button className='vacancy_callBtn'>Позвонить</button> :
        null}
        </div>
        </>
    } else if (isAnswered === false) {
        responseStatus = <h1 className='responseStatus'>Отклик отправлен. Ожидается ответ от работодателя.</h1>
    } else if (isAnswered === true) {
        responseStatus = <h1 className='responseStatus'>Работодатель ответил на ваш отклик. Проверьте личные сообщения!</h1>
    }

    document.title = vacancyInfo.position

  return (
    <>
        <Header/>
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

            {responseStatus}
        </div>
        <div className='companyInfo'>
            <img src={logo} alt='логотип компании' className='companyLogo'/>
            <div className='companyContainer'>
                <h3 className='companyName'>{vacancyInfo.companyName}</h3>
                <h4 className='companyDescription'>{vacancyInfo.companyDescription}</h4>
                <h5 className='companyAddress'>{vacancyInfo.companyAddress}</h5>
            </div>
        </div>
        <Footer/>
    </>
  );
}

export default Vacancy