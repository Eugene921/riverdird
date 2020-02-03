import { 
  SET_LIST_CITIES_OF_SERVER,
  LOADING_ON,
  LOADING_OFF,
  CHANGE_INPUT_CITY_VALUE,
  SET_FILTER_LIST_WAREHOUSES,
  CHANGE_INPUT_WAREHOUSE_VALUE,
  SET_LIST_WAREHOUSES_OF_SERVER } from '../constants/';

const initState = {
  listCities: [],
  listWarehouses: [],
  listWarehousesInCity: [],
  inputCityValue: '',
  inputWarehouseValue: '',
  patternOfInputTel: /\+38\s\(0\d{2}\)\s\d{3}-\d{2}-\d{2}/,
  patternOfInputCity: /^[а-яіїё\'\,\.\-\s]+$/i,
  patternOfInputWarehouse: '[0-9]{0,3}',
  patternOfInputName: /^[а-яА-ЯёїіЇІЁ\s`,.\-']+$/,
  patternOfInputEmail: /.+\@.+\..+/i,
}

const list = (state = initState, action)  => {

  switch (action.type) {
    case SET_LIST_CITIES_OF_SERVER: {
      return {
        ...state,
        listCities: action.listCities,
      };
    }
    
    case SET_FILTER_LIST_WAREHOUSES: {
      if(!state.listWarehousesInCity.length) {
        return {
          ...state,
          listWarehouses: [],
        };
      }

      const listWarehouses = state.listWarehousesInCity.filter(warehouse => {
        return warehouse.index === state.inputWarehouseValue;
      })

      return {
        ...state,
        listWarehouses: listWarehouses,
      };
    }

    case SET_LIST_WAREHOUSES_OF_SERVER: {

      return {
        ...state,
        listWarehousesInCity: action.listWarehousesInCity,
      };
    }
    
    case CHANGE_INPUT_CITY_VALUE: {
      return {
        ...state,
        inputCityValue: action.value,
      };
    }

    case CHANGE_INPUT_WAREHOUSE_VALUE: {
      return {
        ...state,
        inputWarehouseValue: action.value,
      };
    }

    case LOADING_ON: {
      return {
        ...state,
        loading: true,
      };
    }

    case LOADING_OFF: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default list;