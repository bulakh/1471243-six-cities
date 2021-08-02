import {createSelector} from 'reselect';
import {NameSpace} from '../root-reducer';
import {SortType} from '../../const';
import {getCity, getSort} from '../navigation/selectors.js';


export const getOffer = (state) => state[NameSpace.DATA].offer;
export const getAllOffers = (state) => state[NameSpace.DATA].allOffers;
export const getFavorites = (state) => state[NameSpace.DATA].favorites;
export const getUpdateOffer = (state) => state[NameSpace.DATA].updateOffer;
export const getFetchDataStatus = (state) => state[NameSpace.DATA].fetchDataStatus;

export const getOffersOfOneCity = createSelector(getCity, getAllOffers, (currentCity, offers) =>
  offers.filter(({city}) => city.name === currentCity),
);

export const getSortedOffersOfOneCity = createSelector(getOffersOfOneCity, getSort, (offers, sort) => {
  const currentOffers = offers.slice();

  switch (sort) {
    case SortType.LOW_TO_HIGH:
      return currentOffers.sort((a, b) => a.price - b.price);

    case SortType.HIGH_TO_LOW:
      return currentOffers.sort((a, b) => b.price - a.price);

    case SortType.TOP_RATED:
      return currentOffers.sort((a, b) => b.rating - a.rating);

    default:
      return offers;
  }
},
);
