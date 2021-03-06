import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {AppRoute, AuthorizationStatus, FetchingStatus} from '../../const.js';
import {fakeStore} from '../../fake.js';
import {NameSpace} from '../../store/root-reducer.js';
import App from './app';

let history = null;
let store = null;
let fakeApp = null;

describe('Application Routing', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });

  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.MAIN);
    render(fakeApp);
    const countOffers = store.getState().DATA.allOffers.length;
    const currentCity = store.getState().DATA.offer.offer.city.name;

    expect(screen.getByText(`${countOffers} places to stay in ${currentCity}`)).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.SIGN_IN);

    const createFakeStore = configureStore({});
    store = createFakeStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
      [NameSpace.DATA]: {
        fetchDataStatus: FetchingStatus.IDLE,
      },
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

    render(fakeApp);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris/)).toBeInTheDocument();
  });

  it('should render "FavoriteScreen" when user navigate to "/favorites", user authorized', () => {
    history.push(AppRoute.FAVORITES);
    render(fakeApp);

    expect(screen.getByText(/Saved listing/)).toBeInTheDocument();
  });

  it('should render "PropertyScreen" when user navigate to "/offer/:id"', () => {
    history.push(AppRoute.ROOM);
    render(fakeApp);

    const description = store.getState().DATA.offer.offer.description;

    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText(/404. Page not found!/)).toBeInTheDocument();
    expect(screen.getByText(/Back to Main page/)).toBeInTheDocument();
  });


});
