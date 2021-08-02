import {fetchDataStatus,
  loadOffers,
  loadOffer,
  updateOffer,
  loadComments,
  loadFavorites,
  logout as closeSession,
  requireAuthorization,
  takeEmail,
  pushError,
  redirectToRoute,
  takeAvatar} from './action';
import {AuthorizationStatus, AppRoute, APIRoute, FetchingStatus, HttpStatus} from '../const.js';
import {offerAdaptToClient} from './adapter.js';
import {adaptOffers, adaptComments, getHeaders, getSortedComments} from '../utils.js';

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.HOTELS)
    .then(({data}) => {
      dispatch(fetchDataStatus(FetchingStatus.FETCHING));
      dispatch(loadOffers(adaptOffers(data)));
    })
    .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHED)))
    .then(() => dispatch(fetchDataStatus(FetchingStatus.IDLE)))
    .catch(() => dispatch(pushError('Error of load! Pls try later')))
);

export const fetchDataForOffer = (hotelId) => (dispatch, _getState, api) => (
  Promise.all([
    api.get(`${APIRoute.HOTELS}/${hotelId}`, getHeaders(localStorage.getItem('token'))),
    api.get(`${APIRoute.COMMENTS}/${hotelId}`),
    api.get(`${APIRoute.HOTELS}/${hotelId}${APIRoute.NEARBY}`),
    dispatch(fetchDataStatus(FetchingStatus.FETCHING)),
  ])
    .then(([offer, comments, nearby]) => {
      const adaptedOffer = offerAdaptToClient(offer.data);
      const adaptedComments = getSortedComments(adaptComments(comments.data));
      const adaptedNearbyOffers = adaptOffers(nearby.data);
      dispatch(loadOffer([adaptedOffer, adaptedComments, adaptedNearbyOffers]));
    })
    .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHED)))
    .then(() => dispatch(fetchDataStatus(FetchingStatus.IDLE)))
    .catch((error) => {
      dispatch(pushError('Error of load! Pls try later'));

      if (error.response.status === HttpStatus.NOT_FOUND) {
        dispatch(pushError('Hotel with this id is not exist!'));
      }
    })
);

export const postGetComment = (hotelId, {comment, rating}) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.COMMENTS}/${hotelId}`,
    {comment, rating},
    getHeaders(localStorage.getItem('token')))
    .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHING_PART)))
    .catch(() => dispatch(pushError('Your comment will remain with you')))
    .then(() => api.get(`${APIRoute.COMMENTS}/${hotelId}`, getHeaders(localStorage.getItem('token')))
      .then(({data}) => dispatch(loadComments(getSortedComments(adaptComments(data)))))
      .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHING_PART)))
      .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHED)))
      .then(() => dispatch(fetchDataStatus(FetchingStatus.IDLE))),
    )
);


export const fetchFavorites = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVORITE, getHeaders(localStorage.getItem('token')))
    .then(({data}) => {
      dispatch(fetchDataStatus(FetchingStatus.FETCHING));
      dispatch(loadFavorites(adaptOffers(data)));
    })
    .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHED)))
    .then(() => dispatch(fetchDataStatus(FetchingStatus.IDLE)))
    .catch((error) => {
      dispatch(pushError('Error of load! Pls try later'));

      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        dispatch(pushError('You are not athorizated. Sign in pls!'));
      }
    })
);

export const postGetFavorites = (hotelId, status) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITE}/${hotelId}/${status}`, null ,getHeaders(localStorage.getItem('token')))
    .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHING_PART)))
    .catch(() => {
      dispatch(redirectToRoute(AppRoute.SIGN_IN));
      dispatch(pushError('You are not athorizated. Sign in pls!'));
    })
    .then(() => api.get(`${APIRoute.HOTELS}/${hotelId}`, getHeaders(localStorage.getItem('token')))
      .then(({data}) => dispatch(updateOffer(offerAdaptToClient(data))))
      .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHING_PART)))
      .then(() => dispatch(fetchDataStatus(FetchingStatus.FETCHED)))
      .then(() => dispatch(fetchDataStatus(FetchingStatus.IDLE)))
      .catch(() => dispatch(pushError('You can not add/remove in Favorites! Pls try later'))),
    )
);


export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('avatar', data.avatar_url);
      dispatch(takeEmail(data.email));
      dispatch(takeAvatar(data.avatar_url));
    })
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.MAIN)))
    .catch((error) => {
      dispatch(pushError('Something wrong! Pls try later!'));

      if (error.response.status === HttpStatus.BAD_REQUEST) {
        dispatch(pushError('ERROR! Enter correct data pls'));
      }
    })
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => localStorage.removeItem('email'))
    .then(() => dispatch(closeSession()))
    .catch(() => dispatch(pushError('Something wrong! Pls try later!')))
);
