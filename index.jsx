import * as React from 'react';
import ReactDOM from 'react-dom';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import listMiddleware from './src/middleware/';
import rootReducers from './src/reducers/';
import Form from './src/components/';

const store = createStore(
  rootReducers,
  composeWithDevTools(
    applyMiddleware(listMiddleware)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Form />
  </Provider>,
  document.getElementById('wraper_for_user_data'),
);
