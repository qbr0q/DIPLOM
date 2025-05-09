import { useState, useEffect } from 'react';
import '../../../../css/EditProfile/editProfileFormsCandidate/BasicInfoForm.css';
import {BACKEND_URL} from '../../../appContans'

const BasicInfoForm = ({candidateData}) => {

    return (
      <form className='BaseInfoForm'>
        <h3 className="title">Основная информация</h3>

        <label class="BaseInfoLabel">Фамилия</label>
        <input
          type="text"
          name="lastName"
          placeholder="Фамилия"
          className="BaseInfoInput"
          value={candidateData.lastName}
          required
        />
        <label class="BaseInfoLabel">Имя</label>
        <input
          type="text"
          name="firstName"
          placeholder="Имя"
          className="BaseInfoInput"
          value={candidateData.firstName}
          required
        />
        <label class="BaseInfoLabel">Отчество</label>
        <input
          type="text"
          name="patronymic"
          placeholder="Отчество"
          value={candidateData.patronymic}
          className="BaseInfoInput"
        />
        <label class="BaseInfoLabel">Дата рождения</label>
        <input
          type="date"
          name="birth_date"
          placeholder="Дата рождения"
          value={candidateData.birth_date || 'Пол'}
          className="BaseInfoInput"
        />
        <label class="BaseInfoLabel">Пол</label>
        <select
          name="sex"
          className="BaseInfoInput"
          defaultValue={candidateData.sex}
        >
          <option value="">Не задано</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
        <label class="BaseInfoLabel">О себе</label>
        <textarea
          name="about"
          placeholder="О себе"
          className="textarea"
          value={candidateData.about}
        />
      </form>
    );
};

export default BasicInfoForm;