import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_CITY: 'navigation/changeCity',
  SELECT_POINT_ID: 'navigation/selectPointId',
  REDIRECT_TO_ROUTE: 'navigation/redirectToRoute',
  SORT_OFFERS_LIST: 'navigation/sortOffersList',

  LOGOUT: 'user/logout',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  TAKE_EMAIL: 'user/takeEmail',

  LOAD_OFFER: 'data/loadOffer',
  LOAD_OFFERS: 'data/loadOffers',
  LOAD_COMMENTS: 'data/loadComments',
  LOAD_FAVORITES: 'data/loadFavorites',
  UPDATE_OFFER: 'data/updateOffer',
  FETCH_DATA_STATUS: 'data/fetchDataStatus',
};


export const changeCity = createAction(ActionType.CHANGE_CITY, (name) => ({
  payload: name,
}));

export const selectPointId = createAction(ActionType.SELECT_POINT_ID, (id) => ({
  payload: id,
}));

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => ({
  payload: url,
}));

export const sortOffersList = createAction(ActionType.SORT_OFFERS_LIST, (variant) => ({
  payload: variant,
}));

export const logout = createAction(ActionType.LOGOUT);

export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION,(status) => ({
  payload: status,
}));

export const takeEmail = createAction(ActionType.TAKE_EMAIL, (email) => ({
  payload: email,
}));

export const loadOffer = createAction(ActionType.LOAD_OFFER, (offer) => ({
  payload: offer,
}));

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (offers) => ({
  payload: offers,
}));

export const loadComments = createAction(ActionType.LOAD_COMMENTS, (comments) => ({
  payload: comments,
}));

export const loadFavorites = createAction(ActionType.LOAD_FAVORITES, (favorites) => ({
  payload: favorites,
}));

export const updateOffer = createAction(ActionType.UPDATE_OFFER, (offer) => ({
  payload: offer,
}));

export const fetchDataStatus = createAction(ActionType.FETCH_DATA_STATUS, (status) => ({
  payload: status,
}));


