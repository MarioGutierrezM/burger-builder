import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import Styles from './Logo.css';

const Logo = () => (
  <div className={Styles.Logo}>
    <img src={burgerLogo} alt="MyBurger"></img>
  </div>
);

export default Logo;
