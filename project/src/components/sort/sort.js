import {SortType} from '../../const';

export const sorting = (offers, sort) => {
  switch (sort) {
    case SortType.LOW_TO_HIGH:
      return offers.sort((a, b) => a.price - b.price);

    case SortType.HIGH_TO_LOW:
      return offers.sort((a, b) => b.price - a.price);

    case SortType.TOP_RATED:
      return offers.sort((a, b) => b.rating - a.rating);

    default:
      return offers;
  }
};


