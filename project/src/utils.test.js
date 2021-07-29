import {getUniqCities, getFilteredOffers, isCheckedAuth, adaptedOffers, adaptedComments, getHeaders} from './utils.js';
import {fakeOffer, fakeComment, adaptedFakeComment, adaptedFakeOffer} from './fake.js';
import {AuthorizationStatuses} from './const.js';


let authorizationStatus = null;
let fakeCity = null;

describe('Functions: Utils', () => {

  beforeEach(() => {
    authorizationStatus = AuthorizationStatuses.UNKNOWN;
    fakeCity = 'Amsterdam';
  });

  it('should return getUniqCities is correct', () => {

    expect(getUniqCities([adaptedFakeOffer])).toStrictEqual([fakeCity]);
  });

  it('should return getFilteredOffers is correct', () => {

    expect(getFilteredOffers([adaptedFakeOffer], fakeCity)[0]).toStrictEqual(adaptedFakeOffer);
  });

  it('should return isCheckedAuth is correct', () => {

    expect(isCheckedAuth(authorizationStatus)).toBe(true);
  });


  it('should return adaptedOffers is correct', () => {
    expect(adaptedOffers([fakeOffer])[0]).toStrictEqual(adaptedFakeOffer);
  });

  it('should return adaptedComments is correct', () => {
    expect(adaptedComments([fakeComment])[0]).toStrictEqual(adaptedFakeComment);
  });

  it('should return getHeader is correct', () => {
    const fakeHeaders = {
      'headers': {
        'x-token': 'someToken',
      },
    };

    expect(getHeaders('someToken')).toStrictEqual(fakeHeaders);
  });
});
