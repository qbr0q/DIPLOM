import {React, useState} from 'react';
import Header from '../BaseComponents/Header/Header';
import Footer from '../BaseComponents/Footer/Footer';
import '../../../css/Account/signup.css'
import {BACKEND_URL} from '../../appContans'

const SignUp = () => {
    const [activeForm, setActiveForm] = useState("formCandidate");

    function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        const role = activeForm === "formCandidate" ? "candidate" : "company"

         fetch(BACKEND_URL + '/account/signUp', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-User-Role": role
            },
            body: JSON.stringify(data)
         })
    }

  return (<>
  <Header/>
    <div className="form-container">
      <div className="switcher">
        <button
          className={`switch-btn ${activeForm === 'formCandidate' ? 'active' : ''}`}
          onClick={() => setActiveForm('formCandidate')}
        >
          Ищу работу
        </button>
        <button
          className={`switch-btn ${activeForm === 'formVacancy' ? 'active' : ''}`}
          onClick={() => setActiveForm('formVacancy')}
        >
          Ищу работников
        </button>
      </div>

      <div className="forms-wrapper">
        <form className={`form ${activeForm === 'formCandidate' ? 'active-form' : 'inactive-form'}`}
         onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя</label>
            <input type="text" name="firstName" disabled={activeForm !== 'formCandidate'} />
          </div>
          <div className="form-group">
            <label>Фамилия</label>
            <input type="text" name="lastName" disabled={activeForm !== 'formCandidate'} />
          </div>
          <div className="form-group">
            <label>Отчество</label>
            <input type="text" name="patronymic" disabled={activeForm !== 'formCandidate'} />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input type="password" name="password" disabled={activeForm !== 'formCandidate'} />
          </div>
          <div className="form-group">
            <label>Номер телефона</label>
            <input type="text" name="phone" disabled={activeForm !== 'formCandidate'} />
          </div>
          <div className="form-group">
            <label>Почта</label>
            <input type="text" name="phone" disabled={activeForm !== 'formCandidate'} />
          </div>
          <div className="form-group">
            <label>Профессия</label>
            <input type="text" name="job" disabled={activeForm !== 'formCandidate'} />
          </div>
          <div className="form-group">
            <label>Опыт работы</label>
            <input type="text" name="workExperience" disabled={activeForm !== 'formCandidate'} />
          </div>

          <button className="signUpBtn" type="sumbit">Регистрация</button>
        </form>

        <div className="divider"></div>

        <form className={`form ${activeForm === 'formVacancy' ? 'active-form' : 'inactive-form'}`}
         onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название компании</label>
            <input type="text" name='name' disabled={activeForm !== 'formVacancy'} />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input type="password" name='password' disabled={activeForm !== 'formVacancy'} />
          </div>
          <div className="form-group">
            <label>Номер телефона</label>
            <input type="text" name="phone" disabled={activeForm !== 'formCandidate'} />
          </div>
          <div className="form-group">
            <label>Почта</label>
            <input type="text" name='mail' disabled={activeForm !== 'formVacancy'} />
          </div>
          <div className="form-group">
            <label>Сфера деятельности</label>
            <input type="text" disabled={activeForm !== 'formVacancy'} />
          </div>
          <div className="form-group">
            <label>Регион</label>
            <input name='region' type="text" disabled={activeForm !== 'formVacancy'} />
          </div>
          <div className="form-group">
            <label>Юр. Адрес</label>
            <input name='address' type="text" disabled={activeForm !== 'formVacancy'} />
          </div>
          <div className="form-group">
            <label>Описание компании</label>
            <textarea name='description' disabled={activeForm !== 'formVacancy'} />
          </div>

          <button className="signUpBtn" type="sumbit">Регистрация</button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default SignUp