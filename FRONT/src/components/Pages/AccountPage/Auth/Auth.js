import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import AuthIcons from './AuthIcons';
import '../../../../css/AccountPage/auth.css'
import hideEye from '../../../../media/hideEye.svg'
import openEye from '../../../../media/openEye.svg'

const Auth = () => {
  const [isClose, setIsClose] = useState(true)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  document.title = 'Войти в аккаунт'

  const handleSubmit = (event) => {
    event.preventDefault();
    if (login.length >= 6 && login.length <= 20 && password.length >= 8) {
      alert('Вы были авторизованы')
      setLogin('')
      setPassword('')
      document.getElementById('GHPagesRouter').click()
    } else {
      alert('Пожалуйста, заполните все поля формы корректно')
    }
  }

  return (
    <form className='formAuth' onSubmit={handleSubmit}>
        <h1 className='h1Auth'>Вход</h1>
        <AuthIcons/>
        <div className='inputAuth'>
          <input placeholder='Телефон или почта' type='text' className='login'
          onChange={(event) => setLogin(event.target.value)} value={login}
          maxLength={20} minLength={6} required></input>
          <div className='passContainer'>
            <input placeholder='Пароль' type={isClose ? 'password' : 'text'} className='password'
            onChange={(event) => setPassword(event.target.value)} value={password}
            minLength={8} required></input>
            <img src={isClose ? hideEye : openEye} onClick={() => setIsClose(!isClose)}
            alt='глазик' className='eyePsw'/>
          </div>
        </div>
        <div className='btnsAuth'>
          <button className='authBtn'
          type='submit' onSubmit={handleSubmit}>Войти</button>
          <button className='regBtn' type='button'>Зарегистрироваться</button>
          <button className='restoreAccessBtn'
          type='button'>Восстановить доступ</button>
        </div>
        <Link style={{display: 'none'}} id='GHPagesRouter'
        to={'/account'}></Link>
    </form>
  );
}

export default Auth