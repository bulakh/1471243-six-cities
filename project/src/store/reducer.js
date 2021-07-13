import {ActionType} from './action';
import {cities, AuthorizationStatus, SortType} from '../const';

const initialState = {
  allOffers: [],
  city: cities[0],
  offers: [],
  sort: SortType.POPULAR,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
  selectedPointId: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
        sort: initialState.sort,
      };
    case ActionType.FILL_OFFERS_LIST:
      return {
        ...state,
        offers: action.payload,
      };
    case ActionType.SORT_OFFERS_LIST:
      return {
        ...state,
        sort: action.payload,
      };
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        allOffers: action.payload,
        isDataLoaded: true,
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    case ActionType.SELECT_POINT_ID:
      return {
        ...state,
        selectedPointId: action.payload,
      };
    default:
      return state;
  }
};


export {reducer};
