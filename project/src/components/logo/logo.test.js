import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Logo from './logo.jsx';
import userEvent from '@testing-library/user-event';

let history = null;

describe('Component: Logo', () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    history = createMemoryHistory();
    render(
      <Router history={history}>
        <Logo />
      </Router>,
    );

    const logo = screen.getByTestId('logo');

    expect(logo).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <Logo/>
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
