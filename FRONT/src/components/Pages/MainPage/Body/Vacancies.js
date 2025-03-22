import React  from 'react';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import '../../../../css/MainPage/vacancies.css'
import {BACKEND_URL} from '../../../appContans'

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
                        {data.createDate}
                    </span>
                    <span className="work">
                        <Link to={`/vacancy/${data.id}`}>
                            {data.position}
                        </Link>
                    </span>
                    <span className="salary">
                        {data.salary}
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