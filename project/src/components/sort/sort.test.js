import {SortType} from '../../const.js';
import {sorting} from './sort.js';

let fakeOffers = null;

describe('Function: Sorting', () => {
  beforeEach(() => {
    fakeOffers = [
      {
        id: 1,
        price: 400,
        rating: 3.5,
      },
      {
        id: 2,
        price: 150,
        rating: 4,
      },
      {
        id: 3,
        price: 500,
        rating: 1.5,
      },
    ];
  });

  it('should sort object on default', () => {
    expect(sorting(fakeOffers, SortType.POPULAR)[0].id).toBe(1);
  });

  it('should sort object from low to high price', () => {
    expect(sorting(fakeOffers, SortType.LOW_TO_HIGH)[0].id).toBe(2);
  });

  it('should sort object from high to low price', () => {
    expect(sorting(fakeOffers, SortType.HIGH_TO_LOW)[0].id).toBe(3);
  });

  it('should sort object top rating first', () => {
    expect(sorting(fakeOffers, SortType.TOP_RATED)[0].id).toBe(2);
  });
});
