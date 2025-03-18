import React from 'react';
import ava from '../../../../media/ava.png'
import tg from '../../../../media/socialMedia/tgIcon.svg'
import gh from '../../../../media/socialMedia/gh.png'
import '../../../../css/AccountPage/profile.css'

const ProfileContent = () => {
  return (
    <div className='profile'>
        <div className='bioContainer'>
            <img src={ava} alt='ава' className='ava'/>
            <div className='mobileBioContainer'>
                <div className='personalInfo'>
                    <h2>Алексей Поднебесный</h2>
                    <h3>Возраст — 46</h3>
                    <h4 className='city'>Город проживания — Нижегородск</h4>
                    <h4>Тел.: +7(911)704-53-67</h4>
                    <h4>Почта: AlekseyPod@sex.ru</h4>
                </div>
                <div className='socLinks'>
                    <img className='socLink' src={tg} alt='ссылка на соц сеть'/>
                    <img className='socLink' src={gh} alt='ссылка на соц сеть'/>
                </div>
            </div>   
        </div>
        <h1 className='position'>Программист-инженер</h1>
        <h3 className='workExperience' title='полового'>Нет опыта</h3>
        <div className='education'>
            <h3>Образование</h3>
            <p>— Университет им. Н.И. Лобачевского, Нижний Новгород</p>
            <p>Факультет компьютерных наук, Специализация: Программирование</p>
            <p>Год окончания: 2000</p>
        </div>
        <div className='skills'>
            <h3>Навыки</h3>
                <ul>
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>Node.js</li>
                    <li>SQL</li>
                    <li>Английский язык (средний уровень)</li>
                </ul>
        </div>
    <div className='projects'>
    <h3>Проекты</h3>
        <div className='project'>
            <h4>Сайт-визитка для компании "IT Solutions"</h4>
            <p>Разработка и реализация дизайна сайта с использованием HTML, CSS и JavaScript.</p>
        </div>
        <div className='project'>
            <h4>Интернет-магазин одежды "Fashion World"</h4>
            <p>Разработка и реализация функционала интернет-магазина с использованием React и Node.js.</p>
        </div>
    </div>

    </div>
  );
}

export default ProfileContent