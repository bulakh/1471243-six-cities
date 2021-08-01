import {createReducer} from '@reduxjs/toolkit';
import {requireAuthorization, logout, takeEmail, pushError, takeAvatar} from '../action.js';
import {AuthorizationStatus} from '../../const.js';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  email: '',
  avatar: '',
  error: '',
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(logout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.email = initialState.email;
      state.avatar = initialState.avatar;
    })
    .addCase(takeEmail, (state, action) => {
      state.email = action.payload;
    })
    .addCase(takeAvatar, (state, action) => {
      state.avatar = action.payload;
    })
    .addCase(pushError, (state, action) => {
      state.error = action.payload;
    });
});

export {user};
