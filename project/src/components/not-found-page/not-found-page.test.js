import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore} from '../../fake.js';
import NotFoundPage from './not-found-page.jsx';

let history = null;
let store = null;

describe('Component: NotFoundScreen', () => {
  const createFakeStore = configureStore({});
  store = createFakeStore(fakeStore);
  it('should render correctly', () => {
    history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <NotFoundPage/>
        </Router>,
      </Provider>,
    );

    const headerElement = screen.getByText(/404. Page not found!/i);
    const linkElement = screen.getByText(/Back to Main page/i);

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
