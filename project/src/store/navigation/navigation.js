import {createReducer} from '@reduxjs/toolkit';
import {changeCity, selectPointId, sortOffersList} from '../action.js';
import {SortType, cities} from '../../const.js';

const initialState = {
  city: cities[0],
  selectedPointId: '',
  sort: SortType.POPULAR,
};

const navigation = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.sort = initialState.sort;
    })
    .addCase(selectPointId, (state, action) => {
      state.selectedPointId = action.payload;
    })
    .addCase(sortOffersList, (state, action) => {
      state.sort = action.payload;
    });
});

export {navigation};
