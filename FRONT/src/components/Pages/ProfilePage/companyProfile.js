import React, {useState, useEffect}  from 'react';

const CompanyProfile = () => {


    return (
      <>
        <p>профиль компании</p>
        <button onClick={() => window.location.href = '/account/editProfile'} className='btnEditProfile'>
            Редактировать профиль
        </button>
      </>
    );
  };

export default CompanyProfile