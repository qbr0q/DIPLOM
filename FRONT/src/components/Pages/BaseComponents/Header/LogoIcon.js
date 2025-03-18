import React from 'react';
import logo from '../../../../media/logo.png'
import { Link } from 'react-router-dom';

class LogoIcon extends React.Component {
    render() {
      return (
          <Link to="/" className='logo_img'><img src={logo} alt='logo'/></Link>
      );
    }
  }

export default LogoIcon