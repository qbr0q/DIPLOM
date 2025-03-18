import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../css/BaseCss/helpAuthBtns.css'
import helpIcon from '../../../../media/helpIcon.svg'
import authIcon from '../../../../media/authIcon.svg'

class HelpAuthBtns extends React.Component {
    render() {
      return (
        <div className='HelpAuthBtns'>
          <Link className='HelpBtn' to={"/help"}>
            <img src={helpIcon} id='helpIcon' alt='иконка помощи'/>
            <label htmlFor='helpIcon'>Помощь</label>
          </Link>
          <Link className='AuthBtn' to={"/account/auth"}>
            <img src={authIcon} id='authIcon' alt='иконка авторизации'/>
            <label htmlFor='authIcon'>Войти</label>
          </Link>
        </div>
      );
    }
  }

export default HelpAuthBtns