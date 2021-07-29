import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {fakeStore} from '../../fake.js';
import AccountLogged from './account-logged.jsx';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';


let history = null;
let store = null;

describe('Component: AccountLogged', () => {

  beforeEach(() => {
    history = createMemoryHistory();
    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);
  });

  it('should render correctly', () => {

    const {getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <AccountLogged />
        </Router>,
      </Provider>,
    );

    const linkElement = getByText(/Sign out/i);
    const emailSpan = screen.getByTestId(/email/i);

    expect(linkElement).toBeInTheDocument();
    expect(emailSpan).toHaveTextContent(/foma@mail.com/i);
  });

  it('should fetch offers when user clicked to link', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <AccountLogged />,
        </Router>,
      </Provider>,
    );

    expect(dispatch).not.toHaveBeenCalled();

    userEvent.click(screen.getByRole('link'));

    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('should logout when user clicked to button', async () => {
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const dispatch = jest.fn(() => Promise.resolve([]));
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <AccountLogged />,
        </Router>,
      </Provider>,
    );

    await waitFor(() => expect(dispatch).not.toBeCalled());

    await waitFor(() => userEvent.click(screen.getByRole('button', {name: /Sign out/i})));

    await waitFor(() => expect(dispatch).toBeCalledTimes(2));
  });
});
