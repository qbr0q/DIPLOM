import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../css/BaseCss/headerBtns.css'
import helpIcon from '../../../../media/helpIcon.svg'
import authIcon from '../../../../media/authIcon.svg'

class HeaderBtns extends React.Component {
    render() {
      return (
        <div className='HeaderBtns'>
          <Link className='HelpBtn' to={"/help"}>
            <img src={helpIcon} id='helpIcon' alt='иконка помощи'/>
            <label htmlFor='helpIcon'>Помощь</label>
          </Link>
            <div className='AuthDropdown'>
              <Link className='AccountBtn' to={"/account/auth"}>
                <img src={authIcon} id='accountIcon' alt='иконка личного кабинета'/>
                <label htmlFor='accountIcon'>Личный кабинет</label>
              </Link>

              <div className="DropdownMenu">
                <Link to="/account/profile">Войти</Link>
                <Link to="/account/settings">Зарегистрироваться</Link>
              </div>
            </div>
        </div>
      );
    }
  }

export default HeaderBtns