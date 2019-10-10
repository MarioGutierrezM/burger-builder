import React from 'react'
import Styles from './BuildControl.css';

const BuildControl = (props) => {
  const { BuildControl, Label, Less, More } = Styles;
  return (
    <div className={BuildControl}>
      <div className={Label}> { props.label } </div>
      
      <button
        className={Less}
        onClick={props.removed}
        disabled={props.disabled}
      > Less </button>
      
      <button
        className={More}
        onClick={props.added}
      > More </button>
    </div>
  )
}

export default BuildControl
