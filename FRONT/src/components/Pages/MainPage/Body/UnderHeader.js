import React from 'react';
import '../../../../css/MainPage/underHeader.css'

class UnderHeader extends React.Component {
    render() {
      return (
        <div className='underHeader'>
            <div className='post_resume'>
                <h2>Работа</h2>
                <h5>SuperJob — это лучшие предложения<br/>высокооплачиваемой 
                    работы от российских и<br/>зарубежных компаний.</h5>
                <span>
                    <button>Разместить резюме</button>
                </span>
            </div>
            <div className='post_vacancy'>
            <h2>Сотрудники</h2>
                <h5>SuperJob — самая большая<br/>и качественная база 
                    резюме<br/>лучших специалистов в России.</h5>
                <span>
                    <button>Разместить вакансию</button>
                </span>
            </div>
        </div>
      );
    }
  }

export default UnderHeader