import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import LoginScreen from './login-screen.jsx';
import {fakeStore} from '../../fake.js';
import * as Redux from 'react-redux';

let history = null;
let store = null;

describe('Component: LoginScreen', () => {

  beforeEach(() => {
    history = createMemoryHistory();
    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);
  });

  it('should render "AuthScreen" when user navigate to "login" url', () => {
    history.push('/login');

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginScreen />
        </Router>,
      </Provider>,
    );

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'foma@mail.com');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/foma@mail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should dispatch login and password on submit', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginScreen />
        </Router>,
      </Provider>,
    );

    expect(dispatch).not.toHaveBeenCalled();

    userEvent.type(screen.getByTestId('login'), 'foma@mail.com');
    userEvent.type(screen.getByTestId('password'), '123456');
    userEvent.click(screen.getByRole('button'));

    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
