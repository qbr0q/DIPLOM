import React from 'react';
import authIconYandex from '../../../../media/authIcons/яндекс.png'
import authIconVK from '../../../../media/authIcons/вконтакте.png'
import authIconGoogle from '../../../../media/authIcons/гугл.png'
import authIconHH from '../../../../media/authIcons/хх.png'
import authIconOK from '../../../../media/authIcons/одноклассники.png'

const AuthIcons = () => {
  const iconName = [authIconYandex, authIconVK, authIconGoogle,
    authIconHH, authIconOK
  ]

  return (
    <div className='authIcons'>
      {iconName.map((icon, keyAI) => {
        return <img src={icon} alt='иконка входа' className='authIcon' key={keyAI}/>
      })}
    </div>
  );
}

export default AuthIcons