import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../../css/BaseCss/headerBtns.css'
import helpIcon from '../../../../media/helpIcon.svg'
import authIcon from '../../../../media/authIcon.svg'
import {showNotification} from '../../../Utils'

const HeaderBtns = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const isLoggedIn = document.cookie.includes('access_token=');
      setIsAuthenticated(isLoggedIn);
    }, [document.cookie]);

    const logout = () => {
        document.cookie='access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        window.location.href='/'
        showNotification('Выход', 'Вы успешно вышли из аккаунта', 'info')
    }

    const ProfileOrError = () => {
        if (isAuthenticated){
            window.location.href='/account/profile'
        } else {
            showNotification('Нет доступа', 'Необходимо войти в аккаунт', 'info')
        }
    }

      return (
        <div className='HeaderBtns'>
          <Link className='HelpBtn' to={"/help"}>
            <img src={helpIcon} id='helpIcon' alt='иконка помощи'/>
            <label htmlFor='helpIcon'>Помощь</label>
          </Link>
            <div className='AuthDropdown'>
              <span className='AccountBtn' onClick={ProfileOrError}>
                <img src={authIcon} id='accountIcon' alt='иконка личного кабинета'/>
                <label htmlFor='accountIcon'>Личный кабинет</label>
              </span>

              <div className="DropdownMenu">
                {isAuthenticated ? (
                <><Link to="/account/messages">Сообщения</Link>
                <span onClick={logout}>Выйти</span></>
                ) : (
                <><Link to="/account/login">Войти</Link>
                <Link to="/account/signup">Зарегистрироваться</Link></>)}
              </div>
            </div>
        </div>
      );
  }

export default HeaderBtns