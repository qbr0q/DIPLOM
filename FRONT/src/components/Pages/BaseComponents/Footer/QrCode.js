import React from 'react';
import qr from '../../../../media/qrCode.svg'

const QrCode = () => {
  return (
    <div>
        <img src={qr} className='qrcode' alt='qrcode'/>
    </div>
  );
}

export default QrCode