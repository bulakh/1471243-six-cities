import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore, adaptedFakeOffer} from '../../fake.js';
import FavoritesCard from './favorites-card.jsx';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';

let history = null;
let store = null;

describe('Component: FavoritesCard', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);
  });

  it('should render correctly', () => {
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
    expect(screen.getByText(type.charAt(0).toUpperCase() + type.slice(1))).toBeInTheDocument();
  });

  it('should remove favorite offer from favorite list on click button', async () => {
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const dispatch = jest.fn(() => Promise.resolve([]));
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesCard offer={adaptedFakeOffer}/>
        </Router>,
      </Provider>,
    );

    await waitFor(() => expect(dispatch).not.toBeCalled());

    await waitFor(() => userEvent.click(screen.getByRole('button', {name: /In bookmarks/i})));

    await waitFor(() => expect(dispatch).toBeCalledTimes(2));
  });
});
