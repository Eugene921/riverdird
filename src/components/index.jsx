import * as React from 'react';
import { connect } from 'react-redux';
import { LoopCircleLoading } from 'react-loadingg';

import * as actionsList from '../actions/';

import InputCity from './input_city';
import InputWarehouse from './input_warehouse';
import InputTel from './input_tel';
import InputName from './input_name';
import InputEmail from './input_email';
  
  class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        inputTelValue: '',
        inputEmailValue: '',
        inputNameValue: '',
      };

      this.saveInputTelValue = this.saveInputTelValue.bind(this);
      this.saveInputNameValue = this.saveInputNameValue.bind(this);
      this.saveInputEmailValue = this.saveInputEmailValue.bind(this);
    }

    saveInputTelValue(inputTelValue) {
      this.setState({
        inputTelValue,
      });
    }

    saveInputEmailValue(inputEmailValue) {
      this.setState({
        inputEmailValue,
      });
    }

    saveInputNameValue(inputNameValue) {
      this.setState({
        inputNameValue,
      });
    }

    onFormatInputTel(value) {
      const valueWithGap = value + '__________'
      return `+38 (${valueWithGap.slice(0,3)}) ${valueWithGap.slice(3,6)}-${valueWithGap.slice(6,8)}-${valueWithGap.slice(8,10)}`
    }

    activateOnSubmit(event) {
      event.preventDefault();
      console.log('activateOnSubmit');
    };

  render() {
    const { inputTelValue, inputNameValue, inputEmailValue} = this.state;
    const { reduxState, changeInputCityValue, getCitiesFromServer, changeInputWarehouseValue, getWarehousesFromServer } = this.props;

    const formatInputTelValue = this.onFormatInputTel(inputTelValue);
    
    return (
      <React.Fragment>
        {reduxState.loading ? <LoopCircleLoading /> : null}
        <InputCity
          inputCityValue={reduxState.inputCityValue}
          changeInputCityValue={changeInputCityValue}
          getCitiesFromServer={getCitiesFromServer}
          patternOfInputCity={reduxState.patternOfInputCity}
          listCities={reduxState.listCities}
          disabled={false}
          required={false}
        />
        <InputWarehouse
          inputWarehouseValue={reduxState.inputWarehouseValue}
          changeInputWarehouseValue = {changeInputWarehouseValue}
          patternOfInputWarehouse = {reduxState.patternOfInputWarehouse}
          getWarehousesFromServer = {getWarehousesFromServer}
          disabled={reduxState.listCities.length !== 1}
          listWarehouses={reduxState.listWarehouses}
          required={false}
        />

        <InputTel 
          inputTelValue={inputTelValue}
          saveInputTelValue = {this.saveInputTelValue}
          patternOfInputTel = {reduxState.patternOfInputTel}
          formatInputTelValue = {formatInputTelValue}
          disabled={false}
          required={true}
        />
        <InputName
          inputNameValue={inputNameValue}
          saveInputNameValue={this.saveInputNameValue}
          patternOfInputName={reduxState.patternOfInputName}
          disabled={false}
          required={true}
        />
        <InputEmail
          inputEmailValue={inputEmailValue}
          saveInputEmailValue={this.saveInputEmailValue}
          patternOfInputEmail={reduxState.patternOfInputEmail}
          disabled={false}
          required={true}
        />
      </React.Fragment>
  );
  }
}


const mapStateToProps = (state) => ({
  reduxState: state,
});

const mapDispatchToProps = (dispatch) => ({
  changeInputCityValue: value => dispatch(actionsList.changeInputCityValue(value)),
  changeInputWarehouseValue: value => dispatch(actionsList.changeInputWarehouseValue(value)),
  getCitiesFromServer: inputCityValue => dispatch(actionsList.getCitiesFromServer(inputCityValue)),
  getWarehousesFromServer: () => dispatch(actionsList.getWarehousesFromServer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
