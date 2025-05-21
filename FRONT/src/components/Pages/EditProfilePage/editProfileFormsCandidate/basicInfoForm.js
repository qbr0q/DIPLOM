import { useState, useEffect } from 'react';
import '../../../../css/EditProfile/EditForm.css';
import {BACKEND_URL} from '../../../appContans'

const BasicInfoForm = ({mainData, registerDirtyFields}) => {

    const [dirtyFields, setDirtyFields] = useState({});
    // делаем копию данных из бд для корректной отрисовки данных при их изменении
    const [formData, setFormData] = useState({...mainData});

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
        if (value !== mainData[name]) {
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
      <form className='editForm'>
        <h3 className="editTitle">Основная информация</h3>

        <label class="editLabel">Фамилия</label>
        <input
          type="text"
          name="lastName"
          placeholder="Фамилия"
          className="editInput"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label class="editLabel">Имя</label>
        <input
          type="text"
          name="firstName"
          placeholder="Имя"
          className="editInput"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label class="editLabel">Отчество</label>
        <input
          type="text"
          name="patronymic"
          placeholder="Отчество"
          value={formData.patronymic}
          className="editInput"
          onChange={handleChange}
        />
        <label class="editLabel">Дата рождения</label>
        <input
          type="date"
          name="birth_date"
          placeholder="Дата рождения"
          value={formData.birth_date}
          className="editInput"
          onChange={handleChange}
        />
        <label class="editLabel">Пол</label>
        <select
          name="sex"
          className="editInput"
          defaultValue={formData.sex}
          onChange={handleChange}
        >
          <option value="">Не задано</option>
          <option value="Мужской">Мужской</option>
          <option value="Женский">Женский</option>
        </select>
        <label class=".label">О себе</label>
        <textarea
          name="about"
          placeholder="О себе"
          className="editTextarea"
          value={formData.about}
          onChange={handleChange}
        />
      </form>
    );
};

export default BasicInfoForm;