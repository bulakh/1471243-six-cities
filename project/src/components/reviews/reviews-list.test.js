import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore} from '../../fake.js';
import ReviewsList from './reviews-list.jsx';

let history = null;
let store = null;

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewsList/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByTestId('reviewList')).toBeInTheDocument();
  });
});
