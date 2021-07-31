import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore} from '../../fake.js';
import {cities} from '../../const.js';
import Main from './main.jsx';

let history = null;
let store = null;

describe('Component: Main', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);


    render(
      <Provider store={store}>
        <Router history={history}>
          <Main/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByRole('heading', {name: /Cities/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: /Places/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: /Beautiful & luxurious studio at great location/i})).toBeInTheDocument();
    cities.map((oneCity) => expect(screen.getByRole('link', {name: oneCity})).toBeInTheDocument());
  });
});
