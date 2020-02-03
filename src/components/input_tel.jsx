import * as React from 'react';

export default function InputTel(props) {
  const { inputTelValue, saveInputTelValue, patternOfInputTel, disabled, required, formatInputTelValue } = props;

  const telRef = React.createRef();

  const changeStylesOfInput = color => {
    telRef.current.style.borderColor = color;
    telRef.current.style.outlineColor = color;
  }

  const validationValue = e => {
    const key = e.nativeEvent.data;
    
    if(/\d/.test(key) || key === null) {
      if(key === null) {
        saveInputTelValue(inputTelValue.slice(0, -1));
        changeStylesOfInput('blue');
      } else {
        if(inputTelValue.length <= 9) {
          saveInputTelValue(inputTelValue + key); 
          changeStylesOfInput('blue');
        }
      }

    } else {
      changeStylesOfInput('red');
    }
  };
  
  return (
    <label>
      <br/>
      Введіть свій номер телефону:
      <br/>
      <input
          title='Введіть свій номер телефону в форматі: "+38 (099) 099-99-09"'
          type="tel"
          pattern={patternOfInputTel.toString().slice(1, -1)}
          placeholder="+38 (012) 345-67-89"
          ref={telRef}
          style={patternOfInputTel.test(formatInputTelValue) ? {borderColor: 'green', outlineColor: 'green',} : null}
          onChange={validationValue}
          value={formatInputTelValue}
          required={required}
          disabled={disabled}
          id="form_react_tel"
        />
    </label>
  );
}