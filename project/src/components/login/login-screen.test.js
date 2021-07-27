import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import LoginScreen from './login-screen.jsx';

const mockStore = configureStore({});

describe('Component: LoginScreen', () => {

  it('should render "AuthScreen" when user navigate to "login" url', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <LoginScreen />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'foma@mail.com');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue('foma@mail.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123456')).toBeInTheDocument();
  });
});
