import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore} from '../../fake.js';
import ReviewsItem from './reviews-item.jsx';

let history = null;
let store = null;

describe('Component: ReviewsItem', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);
    const comment = store.getState().DATA.offer.comments[0];

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewsItem review={comment}/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(comment.comment)).toBeInTheDocument();
    expect(screen.getByText(comment.user.name)).toBeInTheDocument();
  });
});
