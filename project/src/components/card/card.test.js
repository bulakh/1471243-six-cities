import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore, adaptedFakeOffer} from '../../fake.js';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import Card from './card.jsx';
import {ActionType} from '../../store/action.js';

let history = null;
let store = null;

describe('Component: Card', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);
  });

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <Card offer={adaptedFakeOffer}/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(adaptedFakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${adaptedFakeOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(adaptedFakeOffer.type.charAt(0).toUpperCase() + adaptedFakeOffer.type.slice(1))).toBeInTheDocument();
  });

  it('should dispatch point id when user hover on article', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Card offer={adaptedFakeOffer}/>
        </Router>,
      </Provider>,
    );

    userEvent.hover(screen.getByRole('article'));

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      type: ActionType.SELECT_POINT_ID,
      payload: '1',
    });
  });

  it('should fetch data offer when user clicked to link', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Card offer={adaptedFakeOffer}/>
        </Router>,
      </Provider>,
    );

    expect(dispatch).not.toHaveBeenCalled();

    userEvent.click(screen.getByRole('link', {name: adaptedFakeOffer.title}));

    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
