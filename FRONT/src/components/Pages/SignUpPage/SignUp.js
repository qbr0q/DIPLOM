import {React, useState} from 'react';
import Header from '../BaseComponents/Header/Header';
import Footer from '../BaseComponents/Footer/Footer';
import '../../../css/Account/signup.css'
import {BACKEND_URL} from '../../appContans'
import {validationSignUpCandidateLogin,
        validationSignUpCompanyLogin} from '../../Utils'
import {showNotification} from '../../Utils'
import SignUpCandidate from './signUpCandidate'
import SignUpCompany from './signUpCompany'

const SignUp = () => {
    document.title = 'Зарегистрироваться'

    const [activeForm, setActiveForm] = useState("formCandidate");
    const [formTitle, setFormTitle] = useState("Зарегистрироваться как кандидат");
    const [role, setRole] = useState(null);
    const [login, setLogin] = useState(null);
    let errors = []

    function validationForm(formData, role) {
        if (role === 'candidate') {
            errors = validationSignUpCandidateLogin(formData)
        } else if (role === 'company') {
            errors = validationSignUpCompanyLogin(formData)
        }

        return errors.length === 0
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        const role = activeForm === "formCandidate" ? "candidate" : "company";

        if (validationForm(data, role)) {
            const response = await fetch(BACKEND_URL + `/account/canSignUp?login=${data.login}`)
            const jsonData = await response.json();
            if (response.ok) {
                setLogin(data.login);
                setRole(role);
            } else {
                showNotification('Ошибка регистрации!', jsonData.detail, 'error')
            }
        } else {
            showNotification('Ошибка регистрации!', errors.join('\n'), 'error')
            errors = []
        }
    }

    let signUpForm = null
    if (!role) {
        signUpForm = <div className="form-container">
        <h1 className='formTitle'>{formTitle}</h1>
      <div className="switcher">
        <button
          className={`switch-btn ${activeForm === 'formCandidate' ? 'active' : ''}`}
          onClick={() => {setActiveForm('formCandidate');
                          setFormTitle('Зарегистрироваться как кандидат')}}
        >
          Ищу работу
        </button>
        <button
          className={`switch-btn ${activeForm === 'formVacancy' ? 'active' : ''}`}
          onClick={() => {setActiveForm('formVacancy');
                          setFormTitle('Зарегистрироваться как работодатель')}}
        >
          Ищу работников
        </button>
      </div>

      <div className="forms-wrapper">
        <form className={`form ${activeForm === 'formCandidate' ? 'active-form' : 'inactive-form'}`}
         onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Номер телефона или почта</label>
            <input type="text" name="login" disabled={activeForm !== 'formCandidate'} />
          </div>

          <button className="nextBtn" type="sumbit">Далее</button>
        </form>

        <div className="divider"></div>

        <form className={`form ${activeForm === 'formVacancy' ? 'active-form' : 'inactive-form'}`}
         onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Почта</label>
            <input type="text" name='login' disabled={activeForm !== 'formVacancy'} />
          </div>

          <button className="nextBtn" type="sumbit">Далее</button>
        </form>
      </div>
    </div>
    } else if (role === 'company') {signUpForm = <SignUpCompany context={{ role, login }}/>}
    else if (role === 'candidate') {signUpForm = <SignUpCandidate context={{ role, login }}/>}

  return (<>
  <Header/>
  {signUpForm}
  <Footer/>
    </>
  );
}

export default SignUp