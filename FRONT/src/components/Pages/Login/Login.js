import {React, useState} from 'react';
import Header from '../BaseComponents/Header/Header'
import Footer from '../BaseComponents/Footer/Footer'
import '../../../css/AccountPage/auth.css'

const Login = () => {
  const [isClose, setIsClose] = useState(true)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  document.title = 'Войти в аккаунт'

  return (
    <>
    <Header/>
    <form className='formAuth'>
        <h1 className='h1Auth'>Вход</h1>
        <div className='inputAuth'>
          <input placeholder='Телефон или почта' type='text' className='login'/>
          <div className='passContainer'>
            <input placeholder='Пароль' type={isClose ? 'password' : 'text'} className='password'/>

          </div>
        </div>
        <div className='btnsAuth'>
          <button className='authBtn'
          type='submit'>Войти</button>
          <button className='regBtn' type='button'>Зарегистрироваться</button>
          <button className='restoreAccessBtn'
          type='button'>Восстановить доступ</button>
        </div>
    </form>
    <Footer/>
    </>
  );
}

export default Login