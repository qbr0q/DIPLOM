import {React, useState} from 'react';
import Header from '../BaseComponents/Header/Header'
import Footer from '../BaseComponents/Footer/Footer'
import '../../../css/Account/login.css'
import {BACKEND_URL} from '../../appContans'
import {showNotification} from '../../Utils'

const Login = () => {
  const [isClose, setIsClose] = useState(true)

  document.title = 'Войти в аккаунт'

  async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        const response = await fetch(BACKEND_URL + '/account/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        })
        const jsonData = await response.json();
        if (response.ok) {
            window.location.href = "/";
            showNotification('Успешной вход!', jsonData.message, 'success')
        } else {
            showNotification('Ошибка входа', jsonData.detail, 'error')
        }
    }

  return (
    <>
    <Header/>
    <form className='formAuth' onSubmit={handleSubmit}>
        <h1 className='h1Auth'>Вход</h1>
        <div className='inputAuth'>
          <input placeholder='Телефон или почта' type='text' className='login' name="login"/>
          <div className='passContainer'>
            <input placeholder='Пароль' type={isClose ? 'password' : 'text'} className='password' name="pass"/>

          </div>
        </div>
        <div className='btnsAuth'>
          <button className='authBtn'
          type='submit'>Войти</button>
          <button className='regBtn'
          onClick={() => {window.location.href = '/account/signup'}}>Зарегистрироваться</button>
          <button className='restoreAccessBtn'
          type='button'>Восстановить доступ</button>
        </div>
    </form>
    <Footer/>
    </>
  );
}

export default Login