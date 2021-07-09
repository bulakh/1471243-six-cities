import {ActionType} from './action';
import {cities, SortType} from '../const';

const initialState = {
  city: cities[0],
  offers: '',
  sort: SortType.POPULAR,
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
    default:
      return state;
  }
};


export {reducer};
