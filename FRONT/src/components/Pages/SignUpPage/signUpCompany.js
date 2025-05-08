import React, {useState, useEffect}  from 'react';
import '../../../css/Account/signUpRole.css'
import {validationSignUpCompanyForm,
        showNotification,
        loginUser} from '../../Utils'
import {BACKEND_URL} from '../../appContans'

const SignUpCompany = ({context}) => {
    let {role, login} = context;
    let errors = [];

    function validationForm(formData) {
        errors = validationSignUpCompanyForm(formData);
        return errors.length === 0;
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        if (validationForm(data)) {
            data.login = login
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
                showNotification('Успешная регистрация!', jsonData.message, 'success');

                let loginData = {'login': login, 'pass': data.companyPass};
                await loginUser(loginData);
                window.location.href = "/";
            } else {
                showNotification('Ошибка регистрации!', jsonData.detail, 'error')
            }
        } else {
            showNotification('Ошибка регистрации!', errors.join('\n'), 'error')
            errors = []
        }
    }

    return (
    <div className="form-container">
        <form className="forms-wrapper-role" onSubmit={handleSubmit}>
            <div className="form-group-role">
                <label>Название компании</label>
                <input type="text" name="companyName"/>
            </div>
            <div className="form-group-role">
                <label>Пароль</label>
                <input type="password" name="companyPass"/>
            </div>
            <button className="SignUpBtn" type="sumbit">Зарегистрироваться</button>
        </form>
    </div>
    );
  };

export default SignUpCompany