import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore} from '../../fake.js';
import Property from './property.jsx';

let history = null;
let store = null;

describe('Component: Property', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);
    const title = store.getState().DATA.offer.offer.title;


    render(
      <Provider store={store}>
        <Router history={history}>
          <Property/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByRole('heading', {name: /Reviews/i})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: /Other places in the neighbourhood/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: title})).toBeInTheDocument();
  });
});
