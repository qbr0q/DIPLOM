import React  from 'react';
import { Link } from 'react-router-dom';
import '../../../../css/MainPage/vacancies.css'

const Vacancies = (filtredVacancyList) => {

  const filter = localStorage.getItem('vacancyFilter')
  const vacancyList = require('../../../appContans').vacancyList
  let sortedVacancyList = filter ? filter === 'Все вакансии' ? shuffle(vacancyList) : filtredVacancyList['vacancyList']
  : shuffle(vacancyList)

  function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

    return (
      <div className='vacancies'>
        {sortedVacancyList.map((list, listIndex) => (
          <div key={listIndex} className='vacancyContainer'>
            {Object.entries(list['vacancyInformation']).map(([key, value], entryIndex) => (
              <span key={entryIndex} className={key}>
                {key === 'work' ?
                <Link to={`/vacancy/${list.config.id}`}
                state={{vacancyInfo: list}}>{value}</Link> :
                value}
              </span>
            ))}
            <div className='btns'>
              <button className='respondBtn'>Откликнуться</button>
              {(list['config']['is_calling']) ? 
              <button className='callBtn'>Позвонить</button> : null}
           </div>
          </div>  
        ))}
      </div>
    );
  };

export default Vacancies