import React from 'react'
import { Link } from 'react-router-dom';
import '../../../../../css/BaseCss/menu.css'

class Menu extends React.Component {
    render() {
        return (
        <div className="menu">
        <input type="checkbox" id="burger-checkbox" className="burger-checkbox"/>
        <label htmlFor="burger-checkbox" className="burger"></label>
        <ul className="menu-list">
            <Link className="menu-item" to={"/"}><p>Главная</p></Link>
            <Link className="menu-item"><p>О нас</p></Link>
            <Link className="menu-item" to={"/team"}><p>Команда</p></Link>
            <Link className="menu-item"><p>Контакты</p></Link>
        </ul>
    </div>
        );
    }
}

export default Menu