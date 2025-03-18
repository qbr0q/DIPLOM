import React from 'react';

const TableLinks = () => {
  return (
    <table className='tableLinks'>
        <thead>
            <tr>
                <th>Соискателям</th>
                <th>Работодателям</th>
                <th>Партнерам</th>
                <th>SuperJob</th>
                <th>Документы</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Создать резюме</td>
                <td>Разместить вакансию</td>
                <td>Реклама на сайте</td>
                <td>О компании</td>
                <td>База данных SuperJob</td>
            </tr>
            <tr>
                <td>Работа для студентов</td>
                <td>Найти стажера</td>
                <td>Интеграционные сервисы</td>
                <td>Новости сервиса</td>
                <td>Агрегатор образовательных курсов</td>
            </tr>
            <tr>
                <td>Советы</td>
                <td>Тарифы</td>
                <td>Логотип SuperJob</td>
                <td>Работа в SuperJob</td>
                <td>Иные документы</td>
            </tr>
            <tr>
                <td>Каталог профессий</td>
                <td>Советы для работодателей</td>
                <td>Исследования</td>
            </tr>
            <tr>
                <td>Конструктор резюме</td>
                <td>Каталог резюме</td>
                <td>Зарплатомер</td>
            </tr>
        </tbody>
    </table>
  );
}

export default TableLinks