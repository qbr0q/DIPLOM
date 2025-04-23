import {React, useState} from 'react';
import Header from '../BaseComponents/Header/Header';
import Footer from '../BaseComponents/Footer/Footer';
import '../../../css/Account/signup.css'
import {BACKEND_URL} from '../../appContans'
import {validationSignUpCandidateForm,
        validationSignUpCompanyForm} from '../../Utils'

const SignUp = () => {
    const [activeForm, setActiveForm] = useState("formCandidate");
    let errors = []

    function validationForm(formData, role) {
        if (role === 'candidate') {
            errors = validationSignUpCandidateForm(formData)
        } else if (role === 'company') {
            errors = validationSignUpCompanyForm(formData)
        }

        return errors.length === 0
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        const role = activeForm === "formCandidate" ? "candidate" : "company";

        if (validationForm(data, role)) {
            const response = await fetch(BACKEND_URL + '/account/signUp', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-User-Role": role
            },
            body: JSON.stringify(data)
        })
        const jsonData = await response.json();
        if (response.ok) {
            alert(jsonData.message);
            window.location.href = "/";
        } else {
            alert(jsonData.detail);
        }
        } else {
            alert(errors.join('\n'))
            errors = []
        }
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
            <input type="text" name="firstName" disabled={activeForm !== 'formCandidate'}
            maxLength="20"
            onInput={(e) => {e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '')}} />
          </div>
          <div className="form-group">
            <label>Фамилия</label>
            <input type="text" name="lastName" disabled={activeForm !== 'formCandidate'}
            maxLength="20"
            onInput={(e) => {e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '')}} />
          </div>
          <div className="form-group">
            <label>Отчество</label>
            <input type="text" name="patronymic" disabled={activeForm !== 'formCandidate'}
            maxLength="20"
            onInput={(e) => {e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '')}} />
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
            <input type="text" name="mail" disabled={activeForm !== 'formCandidate'} />
          </div>
          <div className="form-group">
            <label>Профессия</label>
            <input type="text" name="job" disabled={activeForm !== 'formCandidate'} />
          </div>
          <div className="form-group">
            <label>Опыт работы</label>
            <select id="test" name="workExperience" disabled={activeForm !== 'formCandidate'}>
                <option value="Нет опыта">Нет опыта</option>
                <option value="1-3 года">1-3 года</option>
                <option value="3-6 года">3-6 года</option>
                <option value="Больше 6 лет">Больше 6 лет</option>
            </select>
          </div>

          <button className="signUpBtn" type="sumbit">Регистрация</button>
        </form>

        <div className="divider"></div>

        <form className={`form ${activeForm === 'formVacancy' ? 'active-form' : 'inactive-form'}`}
         onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название компании</label>
            <input type="text" name='name' disabled={activeForm !== 'formVacancy'}
            maxLength="20"
            onInput={(e) => {e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '')}} />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input type="password" name='password' disabled={activeForm !== 'formVacancy'} />
          </div>
          <div className="form-group">
            <label>Номер телефона</label>
            <input type="phone" name="phone" disabled={activeForm !== 'formVacancy'} />
          </div>
          <div className="form-group">
            <label>Почта</label>
            <input type="mail" name='mail' disabled={activeForm !== 'formVacancy'} />
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
            <textarea name='description' disabled={activeForm !== 'formVacancy'}
            maxLength="400"
            onInput={(e) => {e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ0-9\s.,!?()\-]/g, '')}} />
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