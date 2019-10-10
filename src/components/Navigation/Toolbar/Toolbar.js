import React from 'react';
import Styles from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => {
  return (
    <header className={Styles.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleCliked}/>
      <div className={Styles.Logo}>
        <Logo />
      </div>
      <nav className={Styles.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  )
}

export default Toolbar;
