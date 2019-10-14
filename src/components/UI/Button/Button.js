import React from 'react';
import Styles from './Button.css';

const Button = (props) => (
  <button
    disabled={props.disabled}
    onClick={props.clicked}
    className={[Styles.Button, Styles[props.btnType]].join(' ')}
  > {props.children} </button>
);

export default Button;
