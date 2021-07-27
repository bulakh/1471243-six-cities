import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import LogoFooter from './logo-footer.jsx';

describe('Component: LogoFooter', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <LogoFooter />
      </Router>,
    );

    const logoFooter = screen.getByTestId('logoFooter');

    expect(logoFooter).toBeInTheDocument();
  });
});
