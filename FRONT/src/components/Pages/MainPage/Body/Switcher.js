import React, { useState, useEffect } from 'react';
import Vacancies from './Vacancies';
import '../../../../css/MainPage/switcher.css'

const Switcher = () => {
    const [filter, setFilter] = useState('Все вакансии');
    const [filtredVacancyList, setFiltredVacancyList] = useState([])

    const vacancyList = require('../../../appContans').vacancyList
    const vacanciesDetails = require('../../../appContans').vacanciesDetailsList

    const handleFilterChange = (event) => {
        setFilter(event.target.innerText);
        localStorage.setItem('vacancyFilter', event.target.innerText);
    };

    useEffect(() => {
    const savedFilter = localStorage.getItem('vacancyFilter');
    if (savedFilter) {
        setFilter(savedFilter);
    }
    }, []);

    useEffect(() => {
        let sortedVacancyList = []
        vacancyList.map((vacancy) => {
            let vacancyId = vacancy.config.id
            let vacancyTypeOfEmployment = vacanciesDetails[vacancyId]['typeOfEmployment']
            if (vacancyTypeOfEmployment.includes(filter)){
                sortedVacancyList.push(vacancy)
            }
            return null
        })
        setFiltredVacancyList(sortedVacancyList)
    }, [filter, vacanciesDetails, vacancyList])

    const vacancyFilterList = ['Новые вакансии', 'Работа из дома',
                         'Подработка', 'Работа без опыта',
                         'Старт карьеры']

    return (
        <>
        <div className='switcher'>
            <ul className='jobCategories'>
                {vacancyFilterList.map((vacancyFilter, keyVFL) => {
                    return <li key={keyVFL} style={
                        vacancyFilter === 'Новые вакансии' ?
                        {borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'} :
                        null} onClick={handleFilterChange}
                        className={filter === vacancyFilter ? 'activeFilter' : ''}
                        >{vacancyFilter}</li>
                })}
            </ul>
            <h4 id='allVacancy'
            onClick={handleFilterChange}
            className={filter === 'Все вакансии' ? 'activeFilter' : ''}
            >
                Все вакансии
            </h4>
        </div>
        <Vacancies vacancyList={filtredVacancyList}/>
        </>
    );
}
    

export default Switcher