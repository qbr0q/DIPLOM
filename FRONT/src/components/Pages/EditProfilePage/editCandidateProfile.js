import React, {useState, useEffect, useRef}  from 'react';
import {BACKEND_URL} from '../../appContans'
import {fetchData} from '../../Utils'
import '../../../css/EditProfile/editCandidateProfile.css'
import BasicInfoForm from './editProfileFormsCandidate/BasicInfoForm'

const EditCandidateProfile = () => {

    const [candidateData, setCandidateData] = useState(null);
    const [candidateId, setCandidateId] = useState(null);
    const [activeTab, setActiveTab] = useState('basic');

    // инициализируем хранение объектов с грязными полями
    const baseInfoRef = useRef({});

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
      { key: 'skills', label: 'Навыки' },
      { key: 'portfolio', label: 'Портфолио' },
    ];

    function saveChanges() {
        const baseInfo = getDirtyData(baseInfoRef.current);

        const dataToSave = {
            'Candidate': baseInfo.Candidate,
            'CandidateInfo': baseInfo.CandidateInfo
        };

        fetch(BACKEND_URL + '/account/candidate/updateProfile', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(dataToSave),
        });
    }

    const getDirtyData = (dirtyFields) => {
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
            {activeTab === 'basic' && <BasicInfoForm candidateData={candidateData}
                                                     registerDirtyFields={baseInfoRef}/>}
            {activeTab === 'education' && <div>Вкладка образования</div>}
            {activeTab === 'experience' && <div>Вкладка опыта работы</div>}
            {activeTab === 'skills' && <div>Вкладка навыков</div>}
            {activeTab === 'portfolio' && <div>Вкладка портфолио</div>}
          </div>

          <button onClick={() => saveChanges()}>Сохранить</button>
     </div>
    );
  };

export default EditCandidateProfile