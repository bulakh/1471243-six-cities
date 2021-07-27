import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Logo from './logo.jsx';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Logo />
      </Router>,
    );

    const logo = screen.getByTestId('logo');

    expect(logo).toBeInTheDocument();
  });
});
