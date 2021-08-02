import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore} from '../../fake.js';
import LoadingScreen from './loading-screen.jsx';

let history = null;
let store = null;


describe('Component: LoadingScreen', () => {
  const createFakeStore = configureStore({});
  store = createFakeStore(fakeStore);

  it('should render correctly', () => {
    history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <LoadingScreen/>
        </Router>,
      </Provider>,
    );

    const textElement = screen.getByText(/Loading.../i);

    expect(textElement).toBeInTheDocument();
  });
});
