import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../services/api.js';
import {ActionType} from './action.js';
import {
  checkAuth,
  login,
  logout,
  fetchOffersList,
  fetchFavorites,
  postGetComment,
  postGetFavorites,
  fetchDataForOffer
} from './api-actions.js';
import {APIRoute, AppRoute, AuthorizationStatus, FetchingStatus} from '../const.js';
import {fakeOffer, adaptedFakeOffer, fakeComment, SortedAdaptedFakeComments} from '../fake.js';

let api = null;
let fakeID = null;

describe('Async operations', () => {
  beforeEach(() => {
    api = createAPI(() => {});
    fakeID = 1;
  });

  it('should make a correct API call to GET pack for offer - offer, comments, near offers', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const dataForOfferLoader = fetchDataForOffer(fakeID);

    apiMock
      .onGet(`${APIRoute.HOTELS}/${fakeID}`)
      .reply(200, fakeOffer);

    apiMock
      .onGet(`${APIRoute.COMMENTS}/${fakeID}`)
      .reply(200, [fakeComment]);

    apiMock
      .onGet(`${APIRoute.HOTELS}/${fakeID}${APIRoute.NEARBY}`)
      .reply(200, [fakeOffer]);

    return dataForOfferLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.FETCHING,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_OFFER,
          payload: [adaptedFakeOffer, SortedAdaptedFakeComments, [adaptedFakeOffer]],
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

  it('should make ERROR pack of offer', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const dataForOfferLoader = fetchDataForOffer(fakeID);

    apiMock
      .onGet(`${APIRoute.HOTELS}/${fakeID}`)
      .reply(200, undefined);

    apiMock
      .onGet(`${APIRoute.COMMENTS}/${fakeID}`)
      .reply(200, undefined);

    apiMock
      .onGet(`${APIRoute.HOTELS}/${fakeID}${APIRoute.NEARBY}`)
      .reply(200, undefined);

    return dataForOfferLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.FETCHING,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.PUSH_ERROR,
          payload: 'Server give up! Pls later',
        });
      });
  });

  it('should make a correct API call to Post one comment and Get all comments', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const fakePostComment = {
      comment: 'Beautiful space',
      rating: '4.5',
    };

    const postGetCommentLoader = postGetComment(fakeID, fakePostComment);

    apiMock
      .onPost(`${APIRoute.COMMENTS}/${fakeID}`)
      .reply(200, [fakeComment]);

    apiMock
      .onGet(`${APIRoute.COMMENTS}/${fakeID}`)
      .reply(200, [fakeComment]);

    return postGetCommentLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.FETCHING_PART,
        });
      })
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_COMMENTS,
          payload: SortedAdaptedFakeComments,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.FETCHING_PART,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.FETCHED,
        });
        expect(dispatch).toHaveBeenNthCalledWith(5, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.IDLE,
        });
      });
  });

  it('should make a correct API call to Update offer', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const STATUS = 1;

    const postGetFavoritesLoader = postGetFavorites(fakeID, STATUS);


    apiMock
      .onPost(`${APIRoute.FAVORITE}/${fakeID}/${STATUS}`)
      .reply(200, fakeOffer);

    apiMock
      .onGet(`${APIRoute.HOTELS}/${fakeID}`)
      .reply(200, fakeOffer);

    return postGetFavoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.FETCHING_PART,
        });
      })
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.UPDATE_OFFER,
          payload: adaptedFakeOffer,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.FETCHING_PART,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.FETCHED,
        });
        expect(dispatch).toHaveBeenNthCalledWith(5, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.IDLE,
        });
      });
  });

  it('should make ERROR post and get favorites', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const STATUS = 1;

    const postGetFavoritesLoader = postGetFavorites(fakeID, STATUS);


    apiMock
      .onPost(`${APIRoute.FAVORITE}/${fakeID}/${STATUS}`)
      .reply(200, undefined);

    apiMock
      .onGet(`${APIRoute.HOTELS}/${fakeID}`)
      .reply(200, undefined);

    return postGetFavoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.FETCHING_PART,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.PUSH_ERROR,
          payload: 'Server give up! Pls later',
        });
      });
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
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it('should make a correct API call to POST /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {
      email: 'foma@mail.com',
      password: '123456',
    };

    const getFakeUser = {
      email: 'foma@mail.com',
      password: '123456',
      'avatar_url': 'https://7.react.pages.academy/static/avatar/2.jpg',
    };

    const loginLoader = login(fakeUser);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, getFakeUser);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.TAKE_EMAIL,
          payload: getFakeUser.email,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.TAKE_AVATAR,
          payload: getFakeUser.avatar_url,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });

        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.MAIN,
        });
      });
  });

  it('should make ERROR login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {
      email: 'foma@mail.com',
      password: '123456',
    };

    const loginLoader = login(fakeUser);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, undefined);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.PUSH_ERROR,
          payload: 'ERROR! Enter correct data pls',
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
          payload: [adaptedFakeOffer],
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

  it('should make ERROR get hotels', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = fetchOffersList();

    apiMock
      .onGet(APIRoute.HOTELS)
      .reply(200, undefined);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.FETCH_DATA_STATUS,
          payload: FetchingStatus.FETCHING,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.PUSH_ERROR,
          payload: 'Server give up! Pls later',
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
          payload: [adaptedFakeOffer],
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

  it('should make ERROR get favorites', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteLoader = fetchFavorites();

    apiMock
      .onGet(APIRoute.FAVORITE)
      .reply(400, undefined);

    return favoriteLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.PUSH_ERROR,
          payload: 'Server give up! Pls later',
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

  it('should make ERROR logout', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onDelete(APIRoute.LOGOUT)
      .reply(400);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.PUSH_ERROR,
          payload: 'Something wrong! Pls later!',
        });
      });
  });
});
