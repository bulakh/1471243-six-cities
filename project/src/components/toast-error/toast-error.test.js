import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
// import userEvent from '@testing-library/user-event';
import {fakeStore} from '../../fake.js';
import * as Redux from 'react-redux';
import ToastError from './toast-error.jsx';

let history = null;
let store = null;
let error = null;

describe('Component: ToastError', () => {

  beforeEach(() => {
    history = createMemoryHistory();
    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);
    error = store.getState().USER.error;
  });

  it('should render correct', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <ToastError />
        </Router>,
      </Provider>,
    );


    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('should remove toast error', async () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <ToastError />
        </Router>,
      </Provider>,
    );

    await waitFor(() => expect(useDispatch).toHaveBeenCalledTimes(1));
  });
});
