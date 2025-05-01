import React, {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import '../../../../css/MainPage/vacancies.css'
import {BACKEND_URL} from '../../../appContans'
import {formatDate, formatSalary} from '../../../Utils'

const Vacancies = () => {

    const [vacancyList, setVacancyList] = useState([])

    useEffect(() => {
        let fetchData = async function(){
            const response = await fetch(BACKEND_URL + '/allVacancy')
            const data = await response.json()
            setVacancyList(data)
         }
         fetchData()
    }, [])

    if (!vacancyList) {
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
                        {formatSalary(data.salary,
                                      data.currencySymbol,
                                      data.duration)}
                    </span>
                    <span className="company">
                        {data.name}
                    </span>
                    <span className="city">
                        {data.region}
                    </span>

                    <div className='btns'>
                        <button className='respondBtn'
                            onClick={() => window.location.href = `/vacancy/${data.id}`}>Откликнуться</button>
                        {data.isCalling ?
                        <button className='callBtn'>Позвонить</button> : null}
                    </div>
                </div>
                )
            )
        }
      </div>
    );
  };

export default Vacancies