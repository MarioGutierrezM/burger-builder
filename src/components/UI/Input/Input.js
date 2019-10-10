import React from 'react';
import styles from './Input.css';

const Input = (props) => {
  const { label, elementType, value } = props;
  const { InputElement, Input, Label, Invalid } = styles;
  let inputElement = null;
  const inputClasses = [InputElement];
  if (props.invalid && props.shouldValidate && props.touch) {
    inputClasses.push(Invalid)
  }

  switch (elementType) {
    case ('input'):
      inputElement = (
        <input className={inputClasses.join(' ')} {...props.elementConfig} value={value} onChange={props.changed}/>
      );
      break;
    case ('textarea'):
      inputElement = (
        <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={value} onChange={props.changed}/>
      );
      break;
    case ('select'):
      inputElement = (
        <select className={inputClasses.join(' ')} value={value} onChange={props.changed}>
          {
            props.elementConfig.options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.display}
              </option>
            ))
          }
        </select>
      );
      break;
    default:
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={value} onChange={props.changed}/>;
      break;
  };

  return (
    <div className={Input}>
      <label className={Label}>{label}</label>
      {inputElement}
    </div>
  );
}

export default Input;
