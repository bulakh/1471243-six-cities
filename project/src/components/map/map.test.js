import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore} from '../../fake.js';
import Map from './map.jsx';

let history = null;
let store = null;

describe('Component: Map', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);

    const city = store.getState().DATA.offer.offer.city;
    const offers = store.getState().DATA.allOffers;
    const changedPin = true;

    render(
      <Provider store={store}>
        <Router history={history}>
          <Map
            city={city}
            points={offers}
            changedPin={changedPin}
          />
        </Router>,
      </Provider>,
    );

    expect(screen.getByTestId(/map/i)).toBeInTheDocument();
  });
});
