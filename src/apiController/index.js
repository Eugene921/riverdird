export function getCitiesFromNP(apiNPKey, cityValue) {
  const data = {
    "apiKey": apiNPKey,
    "modelName": "Address",
    "calledMethod": "searchSettlements",
    "methodProperties": {
        "CityName": cityValue,
        "Limit": 20,
    }
  };
  
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  };

  return fetch('https://api.novaposhta.ua/v2.0/json/', requestOptions)
    .then(response => response.json())
    .then(result => result.data)
    .then(data => data[0].Addresses)
    .then(cities => cities.filter(city => city.Warehouses))
}

export function getWarehousesFromNP(apiNPKey, DeliveryCity) {
  const data = {
    "apiKey": apiNPKey,
    "modelName": "Address",
    "calledMethod": "getWarehouses",
    "methodProperties": {
        "CityRef": DeliveryCity,
    }
  };
  
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };

  return fetch('http://testapi.novaposhta.ua/v2.0/json/Address/searchSettlements/', requestOptions)
    .then(response => response.json())
    .then(result => result.data)
}