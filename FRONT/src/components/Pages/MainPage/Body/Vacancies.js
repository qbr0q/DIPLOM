import React  from 'react';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import '../../../../css/MainPage/vacancies.css'
import {BACKEND_URL} from '../../../appContans'

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const now = new Date();

    const isToday = (date) => {
        return date.toDateString() === now.toDateString();
    };

    const isYesterday = (date) => {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        return date.toDateString() === yesterday.toDateString();
    };

    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const formatDateText = (date) => {
        const months = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ];
        const day = date.getDate();
        const month = months[date.getMonth()];
        return `${day} ${month}`;
    };

    if (isToday(date)) {
        return `сегодня в ${formatTime(date)}`;
    } else if (isYesterday(date)) {
        return `вчера в ${formatTime(date)}`;
    } else {
        return formatDateText(date);
    }
}

function formatSalary(salary, currencySymbol, duration){
    return `${salary}${currencySymbol} в ${duration}`
}

const Vacancies = () => {

    const [vacancyList, setVacancyList] = useState([])
    const [vacancyListLoading, setVacancyListLoading] = useState(true)

    useEffect(() => {
        fetch(BACKEND_URL + '/allVacancy')
        .then(response => response.json())
        .then(data => {setVacancyList(data);
              setVacancyListLoading(false)})
    }, [])

    if (vacancyListLoading) {
        return <div>Загрузка...</div>;
    }

    return (
      <div className='vacancies'>
        {
            Object.values(vacancyList).map((data, index) => (
                <div className='vacancyContainer' key={index}>
                    <span className="time">
                        {formatDate(data.createDate)}
                    </span>
                    <span className="work">
                        <Link to={`/vacancy/${data.id}`}>
                            {data.position}
                        </Link>
                    </span>
                    <span className="salary">
                        {formatSalary(
                            data.salary,
                            data.currencySymbol,
                            data.duration
                          )
                        }
                    </span>
                    <span className="company">
                        {data.name}
                    </span>
                    <span className="city">
                        {data.region}
                    </span>

                <div className='btns'>
                    <button className='respondBtn'>Откликнуться</button>
                    {data.isCalling ?
                    <button className='callBtn'>Позвонить</button> : null}
                </div>
                </div>
            ))
        }
      </div>
    );
  };

export default Vacancies