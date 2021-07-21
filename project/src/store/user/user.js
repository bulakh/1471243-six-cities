import {createReducer} from '@reduxjs/toolkit';
import {requireAuthorization, logout, takeEmail} from '../action.js';
import {AuthorizationStatuses} from '../../const.js';

const initialState = {
  authorizationStatus: AuthorizationStatuses.UNKNOWN,
  email: '',
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(logout, (state) => {
      state.authorizationStatus = AuthorizationStatuses.NO_AUTH;
      state.email = initialState.email;
    })
    .addCase(takeEmail, (state, action) => {
      state.email = action.payload;
    });
});

export {user};
