import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore} from '../../fake.js';
import Location from './location.jsx';

let history = null;
let store = null;

describe('Component: Location', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();
    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);
    const name = store.getState().DATA.offer.offer.city.name;

    render(
      <Provider store={store}>
        <Router history={history}>
          <Location name={name} />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
