import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(classes.Invalid);
  }

  switch(props.elementType) {
    case('input'):
      inputElement = <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          />;
      break;
    case('textarea'):
      inputElement = <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          />;
      break;
    case('select'):
      inputElement = (
          <select
            className={inputClasses.join(' ')}
            value={props.value}
            onChange={props.changed}>
            {props.elementConfig.options.map(opt => (
              <option key={opt.value} value={opt.value} >
                {opt.displayValue}
              </option>
            ))}
          </select>
        );
      break;
    case('email'):
      inputElement = <email
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          />;
      break;
    default:
     inputElement = <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}/>;
  }

  let validationError = null;
  if (props.invalid && props.touched) {
      validationError = (<p className={classes.ValidationError}>
                        Please enter a valid value!</p>);
  } 

  return (
    <div className={classes.Input}>
    <label className={classes.Label} >{props.label}</label>
    {inputElement}
    {validationError}
  </div>);
}

export default input;
