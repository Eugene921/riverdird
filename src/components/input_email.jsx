import * as React from 'react';

export default function InputEmail(props) {
  const { inputEmailValue, saveInputEmailValue, patternOfInputEmail, disabled, required } = props;

  const telRef = React.createRef();

  const changeStylesOfInput = color => {
    telRef.current.style.borderColor = color;
    telRef.current.style.outlineColor = color;
  }

  const validationValue = e => {
    const value = e.target.value;
    
    saveInputEmailValue(value);
    changeStylesOfInput('blue');
  };

  return (
    <label>
      <br/>
      Введіть свою поштову скриньку:
      <br/>
      <input
          onBlur={() => patternOfInputEmail.test(inputEmailValue) ? changeStylesOfInput('green') : changeStylesOfInput('red')}
          title='введіть свою поштову скриньку, в форматі: "youremail@gmail.com"'
          type="email"
          placeholder="Поштова скринька"
          ref={telRef}
          onChange={validationValue}
          value={inputEmailValue}
          required={required}
          disabled={disabled}
          id="form_react_email"
        />
    </label>
  );
}