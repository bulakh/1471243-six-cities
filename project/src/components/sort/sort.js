import {SortType} from '../../const';

export const sorting = (offers, sort) => {
  switch (sort) {
    case SortType.LOW_TO_HIGH:
      offers.sort((a, b) => a.price - b.price);
      return {
        offers,
      };

    case SortType.HIGH_TO_LOW:
      offers.sort((a, b) => b.price - a.price);
      return {
        offers,
      };

    case SortType.TOP_RATED:
      offers.sort((a, b) => b.rating - a.rating);
      return {
        offers,
      };

    default:
      return {
        ...offers,
      };
  }
};
