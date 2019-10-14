import React from 'react';
import styles from './Input.css';

const Input = (props) => {
  const { label, elementType, value } = props;
  const { InputElement, Input, Label, Invalid, Valid, InvalidMessage } = styles;
  let inputElement = null;
  let inputError = null;
  const inputClasses = [InputElement];
  if (props.shouldValidate && props.touch) {
    const inputStyle = (props.invalid) ? Invalid : Valid;
    inputClasses.push(inputStyle);
    inputError =  (props.invalid) ? <div className={InvalidMessage}>Please enter a valid value! </div> : null;
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
      {inputError}
    </div>
  );
}

export default Input;
