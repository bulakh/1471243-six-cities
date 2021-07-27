import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import AccountNotLogged from './account-not-logged.jsx';

describe('Component: AccountNotLogged', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const {getByText} = render(
      <Router history={history}>
        <AccountNotLogged />
      </Router>,
    );

    const linkElement = getByText('Sign in');

    expect(linkElement).toBeInTheDocument();
  });
});
