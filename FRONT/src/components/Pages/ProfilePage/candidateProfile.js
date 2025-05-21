import React, {useState, useEffect}  from 'react';
import {fetchData} from '../../Utils'
import '../../../css/ProfilePage/CandidatePage.css'

const CandidateProfile = () => {

    const [candidateData, setCandidateData] = useState(null);
    const [candidateId, setCandidateId] = useState(null);

    useEffect(() => {
        fetchData('/getUserId', setCandidateId);
    }, []);

    useEffect(() => {
        if (candidateId) {
            fetchData(`/candidate/${candidateId}`, setCandidateData);
        }
    }, [candidateId]);

    if (!candidateData) {
        return <div>Загрузка...</div>
    }

    return (
      <>
    <div className="profile-container">
      <div className="profile-header">
          <div className="avatar-name-container">
            <div className="profile-avatar">
              {candidateData.main_data.image_base64 ? (
                <img
                  src={`data:image/jpeg;base64,${candidateData.main_data.image_base64}`}
                  alt={`${candidateData.main_data.firstName} ${candidateData.main_data.lastName}`}
                />
              ) : (
                <div className="no-image">Нет фото</div>
              )}
            </div>
            <div className="profile-name">
              <h1>{`${candidateData.main_data.lastName} ${candidateData.main_data.firstName} ${candidateData.main_data.patronymic || ''}`}</h1>
            </div>
        </div>
        <button onClick={() => window.location.href = '/account/editProfile'} className='btnEditProfile'>
            Редактировать профиль
        </button>
      </div>


      <div className="profile-section">
        <h2>О себе</h2>
        <p>{candidateData.main_data.about || "Информация не указана"}</p>
      </div>

      <div className="profile-info-grid">
        <div className="info-item">
          <strong>Пол:</strong> {candidateData.main_data.sex || "Не указан"}
        </div>
        <div className="info-item">
          <strong>Дата рождения:</strong> {candidateData.main_data.birth_date || "Не указана"}
        </div>
        <div className="info-item">
          <strong>Телефон:</strong> {candidateData.main_data.phone || "Не указан"}
        </div>
        <div className="info-item">
          <strong>Email:</strong> {candidateData.main_data.mail || "Не указан"}
        </div>
      </div>

      <div className="profile-section">
        <h2>Образование</h2>
        {candidateData.education && candidateData.education.institution && candidateData.education.education_start_date ? (
          <div className="education-block">
            <p><strong>Учебное заведение:</strong> {candidateData.education.institution}</p>
            <p><strong>Специализация:</strong> {candidateData.education.specialization}</p>
            <p><strong>Период обучения:</strong> {candidateData.education.education_start_date} – {candidateData.education.education_end_date}</p>
          </div>
        ) : (
          <p>Образование не указано</p>
        )}
      </div>

      <div className="profile-section">
        <h2>Опыт работы</h2>
        {candidateData.experience && candidateData.experience.length > 0 ? (
          <ul className="experience-list">
            {candidateData.experience.map((exp) => (
              <li key={exp.id} className="experience-item">
                <strong>{exp.company_name} — {exp.position}</strong>
                <p>Стаж: {exp.experience} лет</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Опыт работы не указан</p>
        )}
      </div>

      <div className="profile-section">
        <h2>Навыки</h2>
        {candidateData.skills && candidateData.skills.length > 0 ? (
          <ul className="skills-list">
            {candidateData.skills.map((skill) => (
              <li key={skill.id} className="skill-item">
                <span>{skill.skill_name}</span>
                <div className="skill-bar">
                  <div className="skill-level" style={{ width: `${skill.level * 20}%` }}></div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Навыки не указаны</p>
        )}
      </div>
    </div>
      </>
    );
  };

export default CandidateProfile