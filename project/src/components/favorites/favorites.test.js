import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore} from '../../fake.js';
import Favorites from './favorites.jsx';

let history = null;
let store = null;

describe('Component: Favorites', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();


    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites/>
        </Router>,
      </Provider>,
    );

    const title = store.getState().DATA.favorites[0].title;

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
