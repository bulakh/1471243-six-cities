import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore} from '../../fake.js';
import FavoritesEmpty from './favorites-empty.jsx';

let history = null;
let store = null;

describe('Component: FavoritesEmpty', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();


    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);

    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesEmpty />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });
});
