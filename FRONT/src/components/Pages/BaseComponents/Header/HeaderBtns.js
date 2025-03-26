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
              <Link className='AuthBtn' to={"/account/auth"}>
                <img src={authIcon} id='authIcon' alt='иконка личного кабинета'/>
                <label htmlFor='authIcon'>Личный кабинет</label>
              </Link>

              <div className="DropdownMenu">
                <Link to="/account/profile">Профиль</Link>
                <Link to="/account/settings">Настройки</Link>
                <Link to="/account/logout">Выйти</Link>
              </div>
            </div>
        </div>
      );
    }
  }

export default HeaderBtns