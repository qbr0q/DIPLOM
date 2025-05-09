import React, {useState, useEffect}  from 'react';
import {BACKEND_URL} from '../../appContans'

const CandidateProfile = () => {


    return (
      <>
        <p>профиль кандидата</p>
        <button onClick={() => window.location.href = '/account/editProfile'}>
            Редактировать профиль
        </button>
      </>
    );
  };

export default CandidateProfile