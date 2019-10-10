import React from 'react';
import styles from './NavigationItem.css';
import { NavLink } from 'react-router-dom';


const NavigationItem = (props) => (
  <li className={styles.NavigationItem}>
    <NavLink to={props.link} activeClassName={styles.active} exact>
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;
