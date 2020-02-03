import * as constants from '../constants/';

export const getCitiesFromServer = (inputCityValue) => ({ type: constants.GET_CITIES_FROM_SERVER, inputCityValue });
export const setListCitiesFoServer = (listCities) => ({ type: constants.SET_LIST_CITIES_OF_SERVER, listCities });

export const loadingOn = () => ({ type: constants.LOADING_ON });
export const loadingOff = () => ({ type: constants.LOADING_OFF });

export const changeInputCityValue = (value) => ({type: constants.CHANGE_INPUT_CITY_VALUE, value});
export const changeInputWarehouseValue = (value) => ({type: constants.CHANGE_INPUT_WAREHOUSE_VALUE, value});

export const getWarehousesFromServer = () => ({ type: constants.GET_WAREHOUSES_FROM_SERVER });
export const setListWarehousesFoServer = (listWarehousesInCity) => ({ type: constants.SET_LIST_WAREHOUSES_OF_SERVER, listWarehousesInCity });
export const setFilterListWarehouses = () => ({type: constants.SET_FILTER_LIST_WAREHOUSES});
