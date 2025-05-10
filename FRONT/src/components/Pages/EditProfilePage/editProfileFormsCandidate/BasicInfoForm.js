import { useState, useEffect } from 'react';
import '../../../../css/EditProfile/editProfileFormsCandidate/BasicInfoForm.css';
import {BACKEND_URL} from '../../../appContans'

const BasicInfoForm = ({candidateData, registerDirtyFields}) => {

    const [dirtyFields, setDirtyFields] = useState({});
    // делаем копию данных из бд для корректной отрисовки данных при их изменении
    const [formData, setFormData] = useState({...candidateData});

    useEffect(() => {
        // при каждом изменении списка грязных полей - устанавливаем объект с ними для всей вкладки
        registerDirtyFields.current = dirtyFields;
    }, [dirtyFields]);

    const handleChange = (e) => {
        // при каждом изменении поля получаем имя и значение
        let { name, value } = e.target;
        value = value === '' ? null : value
        formData[name] = value

        // проверяем соотвествует ли значение изначальному из бд
        if (value !== candidateData[name]) {
            // если нет, то добавляем поле как грязное
            setDirtyFields(prev => ({ ...prev, [name]: value }));
        } else {
            // если значение соотвествует, то удаляем поле из списка грязных
            setDirtyFields(prev => {
                const updated = { ...prev };
                delete updated[name];
                return updated;
            });
        }
    };

    const getDirtyData = () => {
        const candidateFields = ['firstName', 'lastName', 'patronymic'];
        const infoFields = ['birth_date', 'sex', 'about'];

        const byTable = {
            Candidate: {},
            CandidateInfo: {}
        };

        for (let key in dirtyFields) {
            if (candidateFields.includes(key)) byTable.Candidate[key] = dirtyFields[key];
            if (infoFields.includes(key)) byTable.CandidateInfo[key] = dirtyFields[key];
        }

        return byTable;
    }

    return (
      <form className='BaseInfoForm' id="BaseInfoForm">
        <h3 className="title">Основная информация</h3>

        <label class="BaseInfoLabel">Фамилия</label>
        <input
          type="text"
          name="lastName"
          placeholder="Фамилия"
          className="BaseInfoInput"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label class="BaseInfoLabel">Имя</label>
        <input
          type="text"
          name="firstName"
          placeholder="Имя"
          className="BaseInfoInput"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label class="BaseInfoLabel">Отчество</label>
        <input
          type="text"
          name="patronymic"
          placeholder="Отчество"
          value={formData.patronymic}
          className="BaseInfoInput"
          onChange={handleChange}
        />
        <label class="BaseInfoLabel">Дата рождения</label>
        <input
          type="date"
          name="birth_date"
          placeholder="Дата рождения"
          value={formData.birth_date}
          className="BaseInfoInput"
          onChange={handleChange}
        />
        <label class="BaseInfoLabel">Пол</label>
        <select
          name="sex"
          className="BaseInfoInput"
          defaultValue={formData.sex}
          onChange={handleChange}
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
          value={formData.about}
          onChange={handleChange}
        />
      </form>
    );
};

export default BasicInfoForm;