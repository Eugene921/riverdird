import * as React from 'react';

export default function InputName(props) {
  const { inputNameValue, saveInputNameValue, patternOfInputName, disabled, required } = props;

  const telRef = React.createRef();

  const changeStylesOfInput = color => {
    telRef.current.style.borderColor = color;
    telRef.current.style.outlineColor = color;
  }

  const validationValue = e => {
    const value = e.target.value;
    
    if(patternOfInputName.test(value) || value.length === 0) {
      saveInputNameValue(value);
      changeStylesOfInput('blue');
    } else {
      changeStylesOfInput('red');
    }
  };

  return (
    <label>
      <br/>
      Введіть ваше Прізвище та ім`я:
      <br/>
      <input
          onBlur={() => inputNameValue.length > 1 ? changeStylesOfInput('green') : changeStylesOfInput('red')}
          title='Введіть ваше Прізвище та ім`я, форматі: "Макаренко Евгений"'
          type="text"
          pattern={patternOfInputName.toString().slice(1, -1)}
          placeholder="Прізвище та ім`я"
          ref={telRef}
          onChange={validationValue}
          value={inputNameValue}
          required={required}
          disabled={disabled}
          id="form_react_name"
        />
    </label>
  );
}