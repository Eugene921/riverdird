import * as React from 'react';

import DataList from './data_list';

export default function InputWarehouse(props) {
  const { inputWarehouseValue,
    changeInputWarehouseValue,
    disabled,
    listWarehouses,
    patternOfInputWarehouse,
    getWarehousesFromServer,
    required } = props;

  const warehouseRef = React.createRef();

  const changeStylesOfInput = color => {
    warehouseRef.current.style.borderColor = color;
    warehouseRef.current.style.outlineColor = color;
  }

  const validationValue = event => {
    const value = event.target.value;
    const regexp = /№\d{0,3}/;

    let regexpValue = false;
    value.replace(regexp, match => {
      regexpValue = match.slice(1,);
    })
    if(value === inputWarehouseValue || regexpValue === inputWarehouseValue) return;
    
    if(!isNaN(value) || value.length === 0){
      changeInputWarehouseValue(value);
      changeStylesOfInput('blue');

      if(value.length >= 1) {
        getWarehousesFromServer();
        changeStylesOfInput('green');
      }
    } else {
      changeStylesOfInput('red');

      if(regexpValue) {
        changeInputWarehouseValue(regexpValue);
        getWarehousesFromServer();
        changeStylesOfInput('green');
      }
    }
  };
  
  return (
    <label>
      Введіть номер складу
      <br/>
      <input
        title='Введіть відділення Нової Пошти в якому ви заберете посилку. Потрібно вписати номер відділення в форматі: "26" . Для уникнення вода невірнії адреси скористайтеся списком підказок.'
        type="text"
        placeholder="Номер складу"
        ref={warehouseRef}
        style={listWarehouses.length === 1 ? {borderColor: 'green' , outlineColor: 'green'} : null}
        onChange={validationValue}
        value={inputWarehouseValue}
        pattern={patternOfInputWarehouse}
        list="dataListOfinputWarehouse"
        disabled={disabled}
        required={required}
      />
      <DataList
        listItem={listWarehouses}
        id="dataListOfinputWarehouse"
      />
      {listWarehouses.length === 1 && inputWarehouseValue ? <p id="form_react_warehouse">{ listWarehouses[0].value }</p> : null}
    </label>
  );
}