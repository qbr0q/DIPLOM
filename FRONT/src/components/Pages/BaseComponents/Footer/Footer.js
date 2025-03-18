import React from 'react';
import '../../../../css/BaseCss/footer.css'
import QrCode from './QrCode'
import SocialMedia from './SocialMedia';
import TableLinks from './TableLinks';

const Footer = () => {
  return (
    <footer>
        <QrCode/>
        <TableLinks/>
        <SocialMedia/>
    </footer>
  );
}

export default Footer