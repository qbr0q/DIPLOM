import React from 'react';
import vk from '../../../../media/socialMedia/vkIcon.svg'
import tg from '../../../../media/socialMedia/tgIcon.svg'
import inst from '../../../../media/socialMedia/instIcon.svg'

const SocialMedia = () => {
  return (
    <div className='socialMedia'>
        <img src={vk} className='vkIcon' alt='vkicon'/>
        <img src={tg} className='tgIcon' alt='thIcon'/>
        <img src={inst} className='instIcon' alt='instIcon'/>
    </div>
  );
}

export default SocialMedia