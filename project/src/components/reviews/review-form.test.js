import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore} from '../../fake.js';
import ReviewForm from './review-form.jsx';

let history = null;
let store = null;

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByTestId('reviewForm')).toBeInTheDocument();
  });
});
