import {ActionType} from './action';
import {cities, AuthorizationStatus, SortType, FetchingStatus} from '../const';

const initialState = {
  allOffers: [],
  city: cities[0],
  offers: [],
  sort: SortType.POPULAR,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  fetchDataStatus: FetchingStatus.IDLE,
  selectedPointId: '',
  email: '',
  offer: {},
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
        email: '',
      };
    case ActionType.SELECT_POINT_ID:
      return {
        ...state,
        selectedPointId: action.payload,
      };
    case ActionType.TAKE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case ActionType.LOAD_OFFER:
      return {
        ...state,
        offer: {
          offer: action.payload[0],
          comments: action.payload[1],
          nearby: action.payload[2],
        },
      };
    case ActionType.LOAD_COMMENTS:
      return {
        ...state,
        offer: {
          ...state.offer,
          comments: action.payload,
        },
      };
    case ActionType.FETCH_DATA_STATUS:
      return {
        ...state,
        fetchDataStatus: action.payload,
      };
    default:
      return state;
  }
};


export {reducer};
