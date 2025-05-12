import { useState, useEffect } from 'react';
import '../../../../css/EditProfile/EditForm.css';
import {BACKEND_URL} from '../../../appContans'

const EducationForm = ({candidateData, registerDirtyFields}) => {

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

    return (
      <form className='editForm'>
        <h3 className="editTitle">Информация об образовании</h3>

        <label class="editLabel">Учебного заведения</label>
        <input
          type="text"
          name="institution"
          placeholder="Учебная организация"
          className="editInput"
          value={formData.institution}
          onChange={handleChange}
        />
        <label class="editLabel">Специализация</label>
        <input
          type="text"
          name="specialization"
          placeholder="Специализация"
          className="editInput"
          value={formData.specialization}
          onChange={handleChange}
        />
        <label class="editLabel">Дата поступления</label>
        <input
          type="date"
          name="education_start_date"
          placeholder="Дата поступления"
          value={formData.education_start_date}
          className="editInput"
          onChange={handleChange}
        />
        <label class="editLabel">Дата выпуска</label>
        <input
          type="date"
          name="education_end_date"
          placeholder="Дата выпуска"
          value={formData.education_end_date}
          className="editInput"
          onChange={handleChange}
        />
      </form>
    );
};

export default EducationForm