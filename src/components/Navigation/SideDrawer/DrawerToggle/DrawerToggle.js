import React from 'react';
import style from './DrawerToggle.css';

const DrawerToggle = (props) => (
  <div onClick={props.clicked} className={style.DrawerToggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default DrawerToggle;
