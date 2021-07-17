import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createAPI} from './services/api.js';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app.jsx';
import {reducer} from './store/reducer.js';
import {ActionCreator} from './store/action.js';
import {checkAuth, fetchOffersList, fetchDataForOffer} from './store/api-actions.js';
import {AuthorizationStatus} from './const.js';
import {redirect} from './store/middlewares/redirect';

const CURRENT_OFFER = window.location.pathname.replace(/\/offer[/]/, '');

const api = createAPI(
  () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);


store.dispatch(checkAuth());
store.dispatch(fetchOffersList());
store.dispatch(ActionCreator.takeEmail(localStorage.email));

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
