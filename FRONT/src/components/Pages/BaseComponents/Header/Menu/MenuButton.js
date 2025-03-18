import React from 'react';
import '../css/menuBtn.css'

class MenuButton extends React.Component {
    render() {
      return (
            <div class="menu">
    <input type="checkbox" id="burger-checkbox" class="burger-checkbox"/>
    <label for="burger-checkbox" class="burger"></label>
        </div>
      );
    }
  }

export default MenuButton