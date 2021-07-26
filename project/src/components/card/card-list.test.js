import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore} from '../../fake.js';
import CardList from './card-list.jsx';

let history = null;
let store = null;

describe('Component: CardList', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);
    const allOffers = store.getState().DATA.allOffers;

    render(
      <Provider store={store}>
        <Router history={history}>
          <CardList offers={allOffers}/>
        </Router>,
      </Provider>,
    );


    allOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
      expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    });
  });
});
