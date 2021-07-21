import {createReducer} from '@reduxjs/toolkit';
import {loadOffer, loadOffers, loadComments, loadFavorites, fetchDataStatus, updateOffer} from '../action.js';
import {FetchingStatus} from '../../const.js';

const initialState = {
  offer: {},
  allOffers: [],
  favorites: [],
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
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(fetchDataStatus, (state, action) => {
      state.fetchDataStatus = action.payload;
    })
    .addCase(updateOffer, (state, action) => {
      state.offer.offer = action.payload;
      state.allOffers = state.allOffers.map((offer) => {
        if (offer.id === action.payload.id) {
          return action.payload;
        }
        return offer;
      });
    });
});

export {data};
