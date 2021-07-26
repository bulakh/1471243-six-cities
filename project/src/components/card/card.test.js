import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore, adaptedFakeOffer} from '../../fake.js';
import Card from './card.jsx';

let history = null;
let store = null;

describe('Component: Card', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Card offer={adaptedFakeOffer}/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(adaptedFakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${adaptedFakeOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(adaptedFakeOffer.type)).toBeInTheDocument();
  });
});
