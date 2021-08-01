import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from './services/api.js';
import {Provider} from 'react-redux';
import {Router as BrowserRouter} from 'react-router-dom';
import App from './components/app/app.jsx';
import rootReducer from './store/root-reducer.js';
import {requireAuthorization, takeEmail, takeAvatar} from './store/action.js';
import {checkAuth, fetchOffersList, fetchDataForOffer, fetchFavorites} from './store/api-actions.js';
import {AuthorizationStatus, AppRoute} from './const.js';
import {redirect} from './store/middlewares/redirect.js';
import browserHistory from './browser-history';

const CURRENT_OFFER = browserHistory.location.pathname.replace(/\/offer[/]/, '');

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)),
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
store.dispatch(takeEmail(localStorage.email));
store.dispatch(takeAvatar(localStorage.avatar));

if (!isNaN(parseInt(CURRENT_OFFER, 10))) {
  store.dispatch(fetchDataForOffer(CURRENT_OFFER))
    .then(() => {
      store.dispatch(fetchOffersList());

    });
} else {
  store.dispatch(fetchOffersList());
}

if (CURRENT_OFFER === AppRoute.FAVORITES) {
  store.dispatch(fetchFavorites());
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
