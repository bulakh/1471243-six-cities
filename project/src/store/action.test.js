import {
  changeCity,
  selectPointId,
  redirectToRoute,
  sortOffersList,
  logout,
  requireAuthorization,
  takeEmail,
  loadOffer,
  loadOffers,
  loadComments,
  loadFavorites,
  updateOffer,
  fetchDataStatus,
  ActionType
} from './action.js';

describe('Actions', () => {
  it('action creator for change city return name of city', () => {
    const expectedAction = {
      type: ActionType.CHANGE_CITY,
      payload: 'Paris',
    };

    expect(changeCity('Paris')).toEqual(expectedAction);
  });

  it('action creator for select point id in store return number of id', () => {
    const expectedAction = {
      type: ActionType.SELECT_POINT_ID,
      payload: '1',
    };

    expect(selectPointId('1')).toEqual(expectedAction);
  });

  it('action creator for redirect to route return url of route', () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: 'url',
    };

    expect(redirectToRoute('url')).toEqual(expectedAction);
  });

  it('action creator for sort of offers return variant of sort', () => {
    const expectedAction = {
      type: ActionType.SORT_OFFERS_LIST,
      payload: 'Popular',
    };

    expect(sortOffersList('Popular')).toEqual(expectedAction);
  });

  it('action creator for logout account of user', () => {
    const expectedAction = {
      type: ActionType.LOGOUT,
    };

    expect(logout()).toEqual(expectedAction);
  });

  it('action creator for check of authorization user return status', () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: 'AUTH',
    };

    expect(requireAuthorization('AUTH')).toEqual(expectedAction);
  });

  it('action creator for get email of user return email', () => {
    const expectedAction = {
      type: ActionType.TAKE_EMAIL,
      payload: 'foma@mail.com',
    };

    expect(takeEmail('foma@mail.com')).toEqual(expectedAction);
  });

  it('action creator for fetch data of offer return object', () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFER,
      payload: {},
    };

    expect(loadOffer({})).toEqual(expectedAction);
  });

  it('action creator for fetch offers list return array', () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: [],
    };

    expect(loadOffers([])).toEqual(expectedAction);
  });

  it('action creator for fetch comments list return array', () => {
    const expectedAction = {
      type: ActionType.LOAD_COMMENTS,
      payload: [],
    };

    expect(loadComments([])).toEqual(expectedAction);
  });

  it('action creator for fetch favorite offers list return array', () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITES,
      payload: [],
    };

    expect(loadFavorites([])).toEqual(expectedAction);
  });

  it('action creator for update offer return object', () => {
    const expectedAction = {
      type: ActionType.UPDATE_OFFER,
      payload: {},
    };

    expect(updateOffer({})).toEqual(expectedAction);
  });

  it('action creator for fetch data status return status of fetching', () => {
    const expectedAction = {
      type: ActionType.FETCH_DATA_STATUS,
      payload: 'IDLE',
    };

    expect(fetchDataStatus('IDLE')).toEqual(expectedAction);
  });
});
