import React from 'react';
import '../../../css/ErrorPage/ErrorMes.css'
import png404 from '../../../media/404.png'

const ErrorMes = () => {
  return (
    <div className='ErrorMes'>
        <p className='errorMessage'>Похоже, такая страница не существует</p>
        <img src={png404} alt='404 картинка' className='errorPng'/>
    </div>
  );
}

export default ErrorMes