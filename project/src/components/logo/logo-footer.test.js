import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import LogoFooter from './logo-footer.jsx';
import userEvent from '@testing-library/user-event';

let history = null;

describe('Component: LogoFooter', () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });


  it('should render correctly', () => {
    history = createMemoryHistory();
    render(
      <Router history={history}>
        <LogoFooter />
      </Router>,
    );

    const logoFooter = screen.getByTestId('logoFooter');

    expect(logoFooter).toBeInTheDocument();
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
            <LogoFooter/>
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
