import React, {useState, useEffect, useRef}  from 'react';
import {BACKEND_URL} from '../../appContans'
import {fetchData, showNotification} from '../../Utils'
import '../../../css/EditProfile/EditCandidateProfile.css'
import BasicInfoForm from './editProfileFormsCandidate/basicInfoForm'
import EducationForm from './editProfileFormsCandidate/educationForm'
import ExperienceForm from './editProfileFormsCandidate/workExperienceForm'
import SkillsForm from './editProfileFormsCandidate/skillsForm'

const EditCandidateProfile = () => {

    const [candidateData, setCandidateData] = useState(null);
    const [candidateId, setCandidateId] = useState(null);
    const [activeTab, setActiveTab] = useState('basic');

    // инициализируем хранение объектов с грязными полями
    const baseInfoRef = useRef({});
    const educationRef = useRef({});
    const workExperienceRef = useRef({});
    const skillsRef = useRef({});

    useEffect(() => {
        fetchData('/getUserId', setCandidateId);
    }, []);

    useEffect(() => {
        if (candidateId) {
            fetchData(`/candidate/${candidateId}`, setCandidateData);
        }
    }, [candidateId]);

    if (!candidateId || !candidateData) {
        return <p>Загрузка...</p>;
    }

    const tabs = [
      { key: 'basic', label: 'Основная информация' },
      { key: 'education', label: 'Образование' },
      { key: 'experience', label: 'Опыт работы' },
      { key: 'skills', label: 'Навыки' }
    ];

    // фильтруем пустые объекты грязных полей или объекты, где только айди
    function isEmptyExceptId(obj) {
        const keys = Object.keys(obj);
        return keys.length === 0 || (keys.length === 1 && keys[0] === 'id');
    }

    async function saveChanges() {
        const baseInfo = getDirtyData(baseInfoRef.current);
        educationRef.current.id = candidateData.education.id

        const entries = Object.entries({
            'Candidate': baseInfo.Candidate,
            'CandidateInfo': baseInfo.CandidateInfo,
            'CandidateEducation': educationRef.current,
            'CandidateWorkExperience': workExperienceRef.current,
            'CandidateSkills': skillsRef.current
        });
        // отправляем на бек только объекты с изменениями
        const dataToSave = Object.fromEntries(
            entries.filter(([_, value]) => !isEmptyExceptId(value))
        );
        if (Object.keys(dataToSave).length === 0) {
            showNotification('Внимание!', 'Внесите изменения', 'warning')
            return null
        }

        const response = await fetch(BACKEND_URL + '/account/updateProfile', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(dataToSave),
        })
        const jsonData = await response.json();
        if (response.ok) {
            showNotification('Успех', jsonData.message, 'success')
        } else {
            showNotification('Ошибка!', jsonData.detail, 'error')
        }
    }

    const getDirtyData = (dirtyFields) => {
        const candidateFields = ['firstName', 'lastName', 'patronymic'];
        const infoFields = ['birth_date', 'sex', 'about'];

        const byTable = {
            Candidate: {'id': Number(candidateId)},
            CandidateInfo: {'id': Number(candidateData.main_data.candidateInfoId)},
        };

        for (let key in dirtyFields) {
            if (candidateFields.includes(key)) byTable.Candidate[key] = dirtyFields[key];
            if (infoFields.includes(key)) byTable.CandidateInfo[key] = dirtyFields[key];
        }

        return byTable;
    }

    return (
      <div className="tabs-container">
          <div className="tabs-buttons">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'basic' && <BasicInfoForm mainData={candidateData.main_data}
                                                     registerDirtyFields={baseInfoRef}/>}
            {activeTab === 'education' && <EducationForm educationData={candidateData.education}
                                                     registerDirtyFields={educationRef}/>}
            {activeTab === 'experience' && <ExperienceForm experienceData={candidateData.experience}
                                                     registerDirtyFields={workExperienceRef}/>}
            {activeTab === 'skills' && <SkillsForm skillsData={candidateData.skills}
                                                     registerDirtyFields={skillsRef}/>}
          </div>

          <button className="btnSaveChanges" onClick={() => saveChanges()}>Сохранить</button>
     </div>
    );
  };

export default EditCandidateProfile