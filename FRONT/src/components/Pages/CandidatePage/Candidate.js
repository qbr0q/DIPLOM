import {React, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../../../css/CandidatePage/candidate.css'
import Header from '../BaseComponents/Header/Header';
import Footer from '../BaseComponents/Footer/Footer';
import {BACKEND_URL} from '../../appContans'
import {showNotification} from '../../Utils'

const Candidate = (state) => {

    const [candidateInfo, setCandidateInfo] = useState(null);
    const [isAnswered, setIsAnswered] = useState(null);
    const [refreshFlag, setRefreshFlag] = useState(false);

    const { candidateId } = useParams();

    // получаем данные о кандидате
    useEffect(() => {
         let fetchCandidateData = async function(){
             const response = await fetch(BACKEND_URL + `/candidate/${candidateId}`)
             const data = await response.json()
             setCandidateInfo(data)
         }
         fetchCandidateData()
    }, [candidateId])

    // получаем данные о статусе ответа на приглашение
    useEffect(() => {
         let fetchIsAnswered = async function(){
             let url = `${BACKEND_URL}/isResponseAnswered?candidate_id=${candidateId}&response_type=2`
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
    }, [candidateId, refreshFlag])

    if (!candidateInfo) {
        return <div>Загрузка...</div>;
    }

    // отправляет приглашение в Responses
    const sendCompanyResponse = async (candidateId) => {
        let resMess = document.getElementById('resMess').value;
        let data = {'candidateId': candidateId, 'resMess': resMess}

        const response = await fetch(BACKEND_URL + '/sendCompanyResponse', {
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
            showNotification('Ошибка!', jsonData.detail, 'error');
        }
    }

    // если в базе нет записи с айдишником юзера и кандидатом - приглашения не было, иначе смотрим на значение в базе
    let responseStatus = null
    if (isAnswered === null) {
        responseStatus = <>
                <textarea className='resMess' id='resMess' placeholder='Письмо с предложением'/>
        <button className='candidate_respondBtn'
                onClick={() => sendCompanyResponse(candidateId)}>Связаться с кандидатом</button>
        </>
    } else if (isAnswered === false) {
        responseStatus = <h1 className='responseStatus'>Приглашение отправлено. Ожидается ответ от кандидата.</h1>
    } else if (isAnswered === true) {
        responseStatus = <h1 className='responseStatus'>Кандидат ответил на ваше приглашение. Проверьте личные сообщения!</h1>
    }

    document.title = candidateInfo.firstName

    return (
    <>
    <Header/>
    <div className='candidateInfo'>
        {responseStatus}
    </div>
    <Footer/>
    </>
    );
}

export default Candidate