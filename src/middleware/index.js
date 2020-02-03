import { 
  GET_CITIES_FROM_SERVER,
  CHANGE_INPUT_CITY_VALUE,
  GET_WAREHOUSES_FROM_SERVER,
  SET_FILTER_LIST_WAREHOUSES,
 } from '../constants/';
import * as actions from '../actions/';

import * as apiController from '../apiController/';

const apiNPKey = '1d7ec500b0973069fd5bcead06126c5f'

const listMiddleware = store => (next) => (action) => {
  switch (action.type) {
    case GET_CITIES_FROM_SERVER: {
      next(actions.loadingOn());
      if (apiNPKey) {
        apiController.getCitiesFromNP(apiNPKey, action.inputCityValue)
        .then(listSitiesofNP => {
          return listSitiesofNP.map(item => {
            return {
              DeliveryCity: item.DeliveryCity,
              value: item.Present,
            }
          })
        })
        .then(listCities => listCities.filter(city => city.value.toLowerCase().indexOf(action.inputCityValue.toLowerCase()) !== -1))
        .then(listSities => next(actions.setListCitiesFoServer(listSities)))
        .catch(error => {
          alert(`Что-то пошло не так в при получении данных с сервера: getCitiesFromNP => ${error}`);
          next(actions.setListCitiesFoServer([{DeliveryCity: action.inputCityValue, Present: action.inputCityValue}]));
        })
        .finally(() => next(actions.loadingOff()));
      }
    }
      break;

    case GET_WAREHOUSES_FROM_SERVER: {
      const state = store.getState();

      if(state.listCities.length === 1) {
        if(state.listWarehousesInCity.length === 0) {

          next(actions.loadingOn());
          const DeliveryCity = state.listCities[0].DeliveryCity;

          apiController.getWarehousesFromNP(apiNPKey, DeliveryCity)
            .then(date => {
              return date.map(item => {
                return {
                  index: item.Number,
                  value: item.Description,
                }})
            })
            .then(listWarehousesInCity => {
              next(actions.setListWarehousesFoServer(listWarehousesInCity));
              next(actions.setFilterListWarehouses());
            })
            .catch(error => {
              alert(`Что-то пошло не так в при получении данных с сервера: getWarehousesFromNP => ${error}`);
              next(actions.setListWarehousesFoServer([]));
            })
            .finally(() => next(actions.loadingOff()));

        } else {
          next(actions.setFilterListWarehouses());
        }
      } else {
        return next(action);
      }
    }
      break;

    case CHANGE_INPUT_CITY_VALUE: {
      if(action.value < 2) next(actions.setListCitiesFoServer([]));

      next(actions.changeInputWarehouseValue(''));
      next(actions.setListWarehousesFoServer([]));
      next(actions.setFilterListWarehouses());

      next(action);
    }
    break;

    default:
      return next(action);
  }
};

export default listMiddleware;