import {navigation} from './navigation.js';
import {ActionType} from '../action.js';
import {SortType} from '../../const.js';

describe('Reducer: navigation', () => {
  const state = {
    city: 'Paris',
    selectedPointId: '1',
    sort: SortType.POPULAR,
  };

  it('without additional parameters should return initial state', () => {
    expect(navigation(undefined, {}))
      .toEqual({
        city: 'Paris',
        selectedPointId: '',
        sort: SortType.POPULAR,
      });
  });

  it('should change city and reset sort', () => {
    const changeCityAction = {
      type: ActionType.CHANGE_CITY,
      payload: 'Hamburg',
    };

    expect(navigation(state, changeCityAction))
      .toEqual({
        city: 'Hamburg',
        selectedPointId: '1',
        sort: SortType.POPULAR,
      });
  });

  it('should change selected point id of offer card', () => {
    const selectPointIdAction = {
      type: ActionType.SELECT_POINT_ID,
      payload: '3',
    };

    expect(navigation(state, selectPointIdAction))
      .toEqual({
        city: 'Paris',
        selectedPointId: '3',
        sort: SortType.POPULAR,
      });
  });

  it('should sort offer list', () => {
    const sortOffersListAction = {
      type: ActionType.SORT_OFFERS_LIST,
      payload: SortType.TOP_RATED,
    };

    expect(navigation(state, sortOffersListAction))
      .toEqual({
        city: 'Paris',
        selectedPointId: '1',
        sort: SortType.TOP_RATED,
      });
  });


});
