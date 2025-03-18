import React, { useEffect, useState } from 'react';
import '../../../../css/BaseCss/header.css'
import Menu from './Menu/Menu';
import LogoIcon from './LogoIcon';
import Search from './Search/Search';
import HelpAuthBtns from './HelpAuthBtns';

const Header = () => {
  const [headerColor, setHeaderColor] = useState('linear-gradient(90deg, rgba(77,120,191,1) 0%, rgba(3,168,137,1) 100%, rgba(241,241,241,1) 100%, rgba(241,241,241,1) 100%)');

  useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 70) {
          setHeaderColor('rgb(4,172,132)');
        } else {
          setHeaderColor('linear-gradient(90deg, rgba(77,120,191,1) 0%, rgba(3,168,137,1) 100%, rgba(241,241,241,1) 100%, rgba(241,241,241,1) 100%)');
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [headerColor]);

  return (
    <header style={{ background: headerColor}}>
        <Menu/>
        <LogoIcon/>
        <Search/>
        <HelpAuthBtns/>
    </header>
  );
};

export default Header;