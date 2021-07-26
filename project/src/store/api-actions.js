import {fetchDataStatus,
  loadOffers,
  loadOffer,
  updateOffer,
  loadComments,
  loadFavorites,
  logout as closeSession,
  requireAuthorization,
  takeEmail,
  redirectToRoute} from './action';
import {AuthorizationStatuses, AppRoute, APIRoute, FetchingStatus} from '../const.js';
import {offerAdaptToClient} from './adapter.js';
import {adaptedOffers, adaptedComments, getHeaders} from '../utils.js';

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.HOTELS)
    .then(({data}) => {
      dispatch(fetchDataStatus(FetchingStatus.FETCHING));
      dispatch(loadOffers(adaptedOffers(data)));
    })
    .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHED)))
    .then(() => dispatch(fetchDataStatus(FetchingStatus.IDLE)))
);

export const fetchDataForOffer = (hotelId) => (dispatch, _getState, api) => (
  Promise.all([
    api.get(`${APIRoute.HOTELS}/${hotelId}`),
    api.get(`${APIRoute.COMMENTS}/${hotelId}`),
    api.get(`${APIRoute.HOTELS}/${hotelId}${APIRoute.NEARBY}`),
    dispatch(fetchDataStatus(FetchingStatus.FETCHING)),
  ])
    .then(([offer, comments, nearby]) => {
      const adaptOffer = offerAdaptToClient(offer.data);
      const adaptComments = adaptedComments(comments.data);
      const adaptNearbyOffers = adaptedOffers(nearby.data);
      dispatch(loadOffer([adaptOffer, adaptComments, adaptNearbyOffers]));
    })
    .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHED)))
    .then(() => dispatch(fetchDataStatus(FetchingStatus.IDLE)))
);

export const postGetComment = (hotelId, {comment, rating}) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.COMMENTS}/${hotelId}`,
    {comment, rating},
    getHeaders(localStorage.getItem('token')))
    .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHING_PART)))
    .then(() => api.get(`${APIRoute.COMMENTS}/${hotelId}`, getHeaders(localStorage.getItem('token')))
      .then(({data}) => dispatch(loadComments(adaptedComments(data))))
      .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHING_PART)))
      .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHED)))
      .then(() => dispatch(fetchDataStatus(FetchingStatus.IDLE)))
      .catch(() => {}),
    )
);


export const fetchFavorites = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVORITE, getHeaders(localStorage.getItem('token')))
    .then(({data}) => {
      dispatch(fetchDataStatus(FetchingStatus.FETCHING));
      dispatch(loadFavorites(adaptedOffers(data)));
    })
    .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHED)))
    .then(() => dispatch(fetchDataStatus(FetchingStatus.IDLE)))
);

export const postGetFavorites = (hotelId, status) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITE}/${hotelId}/${status}`, null ,getHeaders(localStorage.getItem('token')))
    .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHING_PART)))
    .catch(() => dispatch(redirectToRoute(AppRoute.SIGN_IN)))
    .then(() => api.get(`${APIRoute.HOTELS}/${hotelId}`, getHeaders(localStorage.getItem('token')))
      .then(({data}) => dispatch(updateOffer(offerAdaptToClient(data))))
      .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHING_PART)))
      .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHED)))
      .then(() => dispatch(fetchDataStatus(FetchingStatus.IDLE))),
    )
);


export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatuses.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      dispatch(takeEmail(data.email));
    })
    .then(() => dispatch(requireAuthorization(AuthorizationStatuses.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.MAIN)))
    .then(() => localStorage.setItem('email', email))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => localStorage.removeItem('email'))
    .then(() => dispatch(closeSession()))
);
