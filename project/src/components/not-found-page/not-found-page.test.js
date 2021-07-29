import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import NotFoundPage from './not-found-page.jsx';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const {getByText} = render(
      <Router history={history}>
        <NotFoundPage />
      </Router>,
    );

    const headerElement = getByText(/404. Page not found!/i);
    const linkElement = getByText(/Back to Main page/i);

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
