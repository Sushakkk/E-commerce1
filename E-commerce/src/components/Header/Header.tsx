import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Text from '../Text/Text';
import Basket from '../Basket/Basket';
import User from '../User/User';


const Header = () => {
  return (
    <header className="header">
      <div className="header__container _container">
        <div className="header__logo">
          <Logo />
        </div>
      
        <nav className="header__menu menu">
          <ul className="menu__list">
            <li className="menu__item">
              <Text tag="p" view="p-18">Product</Text>
            </li>
            <li className="menu__item">
              <Text tag="p" view="p-18">Categories</Text>
            </li>
            <li className="menu__item">
              <Text tag="p" view="p-18">About us</Text>
            </li>
          </ul>
        </nav>
        
        <div className="header__icons">
          <Basket />
          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;

