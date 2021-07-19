import {ActionCreator} from './action';
import {AuthorizationStatus, AppRoute, APIRoute, FetchingStatus} from '../const.js';
import {offerAdaptToClient} from './adapter.js';
import {adaptedOffers, adaptedComments} from '../utils.js';

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.HOTELS)
    .then(({data}) => {
      dispatch(ActionCreator.fetchDataStatus(FetchingStatus.FETCHING));
      const adaptOffers = [];
      data.forEach((offer) => {
        adaptOffers.push(offerAdaptToClient(offer));
        dispatch(ActionCreator.loadOffers(adaptOffers));
      });
    })
    .then(() => dispatch(ActionCreator.fetchDataStatus(FetchingStatus.FETCHED)))
    .then(() => dispatch(ActionCreator.fetchDataStatus(FetchingStatus.IDLE)))
);

export const fetchDataForOffer = (hotelId) => (dispatch, _getState, api) => (
  Promise.all([
    api.get(`${APIRoute.HOTELS}/${hotelId}`),
    api.get(`${APIRoute.COMMENTS}/${hotelId}`),
    api.get(`${APIRoute.HOTELS}/${hotelId}${APIRoute.NEARBY}`),
    dispatch(ActionCreator.fetchDataStatus(FetchingStatus.FETCHING)),
  ])
    .then(([offer, comments, nearby]) => {
      const adaptOffer = offerAdaptToClient(offer.data);
      const adaptComments = adaptedComments(comments.data);
      const adaptNearbyOffers = adaptedOffers(nearby.data);
      dispatch(ActionCreator.loadOffer([adaptOffer, adaptComments, adaptNearbyOffers]));
    })
    .then(() => dispatch(ActionCreator.fetchDataStatus(FetchingStatus.FETCHED)))
    .then(() => dispatch(ActionCreator.fetchDataStatus(FetchingStatus.IDLE)))
);

export const postComment = (hotelId, {comment, rating}) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.COMMENTS}/${hotelId}`,
    {comment, rating},
    {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    })
    .then(() => dispatch(ActionCreator.fetchDataStatus(FetchingStatus.FETCHING_PART)))
    .then(() => api.get(`${APIRoute.COMMENTS}/${hotelId}`,
      {
        headers: {
          'x-token': localStorage.getItem('token'),
        },
      })
      .then(({data}) => dispatch(ActionCreator.loadComments(adaptedComments(data))))
      .then(() => dispatch(ActionCreator.fetchDataStatus(FetchingStatus.FETCHING_PART)))
      .then(() => dispatch(ActionCreator.fetchDataStatus(FetchingStatus.FETCHED)))
      .then(() => dispatch(ActionCreator.fetchDataStatus(FetchingStatus.IDLE)))
      .catch(() => {}),
    )
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => localStorage.setItem('token', data.token))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.MAIN)))
    .then(() => localStorage.setItem('email', email))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => localStorage.removeItem('email'))
    .then(() => dispatch(ActionCreator.logout()))
);
