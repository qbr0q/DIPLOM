import React, {useState, useEffect}  from 'react';
import {BACKEND_URL} from '../../appContans'
import {fetchData} from '../../Utils'
import '../../../css/EditProfile/editCandidateProfile.css'
import BasicInfoForm from './editProfileFormsCandidate/BasicInfoForm'

function saveChanges() {
    console.log(BasicInfoForm.getElementById())
}

const EditCandidateProfile = () => {

    const [candidateData, setCandidateData] = useState(null);
    const [candidateId, setCandidateId] = useState(null);
    const [activeTab, setActiveTab] = useState('basic');

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
            {activeTab === 'basic' && <BasicInfoForm candidateData={candidateData}/>}
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