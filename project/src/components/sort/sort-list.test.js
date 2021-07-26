import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {fakeStore} from '../../fake.js';
import {sortVariants} from '../../const.js';
import SortList from './sort-list.jsx';

let history = null;
let store = null;

describe('Component: SortList', () => {
  it('should render correctly', () => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore(fakeStore);
    const fakeActive = true;

    render(
      <Provider store={store}>
        <Router history={history}>
          <SortList active={fakeActive}/>
        </Router>,
      </Provider>,
    );


    sortVariants.forEach((variant) => expect(screen.getByText(variant)).toBeInTheDocument());
  });
});
