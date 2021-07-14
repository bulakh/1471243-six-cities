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
import {checkAuth, fetchOffersList} from './store/api-actions.js';
import {AuthorizationStatus} from './const.js';
import {redirect} from './store/middlewares/redirect';

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

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
