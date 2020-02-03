import * as React from 'react';
import DataList from './data_list'

export default function InputCity(props) {
  const { inputCityValue, changeInputCityValue, patternOfInputCity, listCities, disabled, getCitiesFromServer, required } = props;

  const cityRef = React.createRef();

  const changeStylesOfInput = color => {
    cityRef.current.style.borderColor = color;
    cityRef.current.style.outlineColor = color;
  }

  const validationValue = event => {
    const value = event.target.value;
    changeInputCityValue(value);

    if(patternOfInputCity.test(value) || value.length === 0){
      changeStylesOfInput('blue');
      if(value.length >= 2) getCitiesFromServer(value);
      if(listCities.length === 1) changeStylesOfInput('green');
    } else {
      changeStylesOfInput('red');
    }
  };

  return (
    <label>
      Введіть своє місто
      <br/>
      <input
        title='Введіть своє місто в якому ви хочете отримати посилку, в форматі: "Полтава" . Для уникнення вода невірнії адреси скористайтеся списком підказок.'
        disabled={disabled}
        type="text"
        placeholder="Місто"
        ref={cityRef}
        style={listCities.length === 1 ? {borderColor: 'green', outlineColor: 'green'} : null}
        onChange={validationValue}
        value={inputCityValue}
        list="dataListOfinputCities"
        required={required}
      />
      <DataList
        listItem={listCities}
        id="dataListOfinputCities"
      />
      {listCities.length === 1 ? <p id="form_react_city" >{ listCities[0].value }</p> : null}
      <br/>

    </label>
  );
}