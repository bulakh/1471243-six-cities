import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from './services/api.js';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
import rootReducer from './store/root-reducer.js';
import {requireAuthorization, takeEmail} from './store/action.js';
import {checkAuth, fetchOffersList, fetchDataForOffer} from './store/api-actions.js';
import {AuthorizationStatuses} from './const.js';
import {redirect} from './store/middlewares/redirect';

const CURRENT_OFFER = window.location.pathname.replace(/\/offer[/]/, '');

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatuses.NO_AUTH)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});


store.dispatch(checkAuth());
store.dispatch(fetchOffersList());
store.dispatch(takeEmail(localStorage.email));

if (CURRENT_OFFER !== '/') {
  store.dispatch(fetchDataForOffer(CURRENT_OFFER));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
