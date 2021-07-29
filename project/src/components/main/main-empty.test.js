import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore} from '../../fake.js';
import {cities} from '../../const.js';
import MainEmpty from './main-empty.jsx';

let history = null;
let store = null;

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);
    const city = store.getState().NAVIGATION.city;

    render(
      <Provider store={store}>
        <Router history={history}>
          <MainEmpty city={city}/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${city}`)).toBeInTheDocument();
    cities.map((oneCity) => expect(screen.getByText(oneCity)).toBeInTheDocument());
  });
});
