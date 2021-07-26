import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore, adaptedFakeOffer} from '../../fake.js';
import FavoritesCard from './favorites-card.jsx';

let history = null;
let store = null;

describe('Component: FavoritesCard', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);

    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesCard offer={adaptedFakeOffer}/>
        </Router>,
      </Provider>,
    );

    const title = adaptedFakeOffer.title;
    const price = adaptedFakeOffer.price;
    const type = adaptedFakeOffer.type;

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(`€${price}`)).toBeInTheDocument();
    expect(screen.getByText(type)).toBeInTheDocument();
  });
});
