import {createReducer} from '@reduxjs/toolkit';
import {loadOffer, loadOffers, loadComments, fetchDataStatus} from '../action.js';
import {FetchingStatus} from '../../const.js';

const initialState = {
  offer: {},
  allOffers: [],
  fetchDataStatus: FetchingStatus.IDLE,
};

const data = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffer, (state, action) => {
      state.offer.offer = action.payload[0];
      state.offer.comments = action.payload[1];
      state.offer.nearby = action.payload[2];
    })
    .addCase(loadOffers, (state, action) => {
      state.allOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.offer.comments = action.payload;
    })
    .addCase(fetchDataStatus, (state, action) => {
      state.fetchDataStatus = action.payload;
    });
});

export {data};
