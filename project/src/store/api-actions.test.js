import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../services/api.js';
import {ActionType} from './action.js';
import {
  checkAuth,
  login,
  logout,
  fetchOffersList,
  fetchFavorites
} from './api-actions.js';
import {APIRoute, AppRoute, AuthorizationStatuses, FetchingStatus} from '../const.js';
import {adaptedOffers} from '../utils.js';
import {fakeOffer} from '../fake.js';

let api = null;

describe('Async operations', () => {
  beforeAll(() => {
    api = createAPI(() => {});
  });

  it('should make a correct API call to GET /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, [{fake: true}]);

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatuses.AUTH,
        });
      });
  });

  it('should make a correct API call to POST /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: 'foma@mail.com', password: '123456'};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, fakeUser);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.TAKE_EMAIL,
          payload: fakeUser.email,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatuses.AUTH,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.MAIN,
        });
      });
  });

  it('should make a correct API call to GET /hotels', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = fetchOffersList();

    apiMock
      .onGet(APIRoute.HOTELS)
      .reply(200, [fakeOffer]);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.FETCHING,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_OFFERS,
          payload: adaptedOffers([fakeOffer]),
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.FETCHED,
        });

        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.IDLE,
        });
      });
  });

  it('should make a correct API call to GET /favorite', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteLoader = fetchFavorites();

    apiMock
      .onGet(APIRoute.FAVORITE)
      .reply(200, [fakeOffer]);

    return favoriteLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.FETCHING,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_FAVORITES,
          payload: adaptedOffers([fakeOffer]),
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.FETCHED,
        });

        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.IDLE,
        });
      });
  });

  it('should make a correct API call to DELETE /logout', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onDelete(APIRoute.LOGOUT)
      .reply(204);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({type: ActionType.LOGOUT});
      });
  });

});
