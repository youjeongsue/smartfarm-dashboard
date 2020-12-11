import React, { Component } from 'react';

import './Header.css';
import menu from '../shared/images/menu.png';

class Header extends Component {
    render() {
        return (
            <div className="header-wrapper">
                <img className='header-menu' src={menu} alt="menu" />
            </div>
        )
    }
}

export default Header;