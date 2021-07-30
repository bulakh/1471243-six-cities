import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore} from '../../fake.js';
import ReviewForm from './review-form.jsx';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';

let history = null;
let store = null;
let fakeComment = null;
let fakeRatingName = null;

describe('Component: ReviewForm', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);

    fakeComment = 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.';
    fakeRatingName = 'good';
  });

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

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByTestId('reviewForm')).toBeInTheDocument();
  });

  it('should disabled button on submit', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByRole('button')).toBeDisabled();

    userEvent.type(screen.getByRole('textbox'), fakeComment);
    userEvent.click(screen.getByRole('radio', {name: fakeRatingName}));

    expect(screen.getByRole('button')).not.toBeDisabled();

  });

  it('should post comment click on button on submit', async () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);


    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm/>
        </Router>,
      </Provider>,
    );

    await waitFor(() => userEvent.type(screen.getByRole('textbox'), fakeComment));
    await waitFor(() => userEvent.click(screen.getByRole('radio', {name: fakeRatingName})));
    await waitFor(() => userEvent.click(screen.getByRole('button')));
    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());
    await waitFor(() => expect(useDispatch).toHaveBeenCalledTimes(3));
  });
});
