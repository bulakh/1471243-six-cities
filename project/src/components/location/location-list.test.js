import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {cities} from '../../const.js';
import {fakeStore} from '../../fake.js';
import LocationList from './location-list.jsx';

let history = null;
let store = null;

describe('Component: LocationList', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <LocationList cities={cities} />
        </Router>,
      </Provider>,
    );

    cities.map((city) => expect(screen.getByText(city)).toBeInTheDocument());
  });
});
