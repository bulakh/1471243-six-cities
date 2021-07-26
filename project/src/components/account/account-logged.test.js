import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {fakeStore} from '../../fake.js';
import AccountLogged from './account-logged.jsx';


let history = null;
let store = null;

describe('Component: AccountLogged', () => {
  history = createMemoryHistory();

  it('should render correctly', () => {
    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);

    const {getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <AccountLogged />
        </Router>,
      </Provider>,
    );

    const linkElement = getByText('Sign out');
    const emailSpan = screen.getByTestId('email');

    expect(linkElement).toBeInTheDocument();
    expect(emailSpan).toHaveTextContent('foma@mail.com');
  });
});
