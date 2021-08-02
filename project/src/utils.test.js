import {getUniqCities, isCheckedAuth, adaptOffers, adaptComments, getHeaders} from './utils.js';
import {fakeOffer, fakeComment, adaptedFakeComment, adaptedFakeOffer} from './fake.js';
import {AuthorizationStatus} from './const.js';


let authorizationStatus = null;
let fakeCity = null;

describe('Functions: Utils', () => {

  beforeEach(() => {
    authorizationStatus = AuthorizationStatus.UNKNOWN;
    fakeCity = 'Amsterdam';
  });

  it('should return getUniqCities is correct', () => {

    expect(getUniqCities([adaptedFakeOffer])).toStrictEqual([fakeCity]);
  });

  it('should return isCheckedAuth is correct', () => {

    expect(isCheckedAuth(authorizationStatus)).toBe(true);
  });


  it('should return adaptOffers is correct', () => {
    expect(adaptOffers([fakeOffer])[0]).toStrictEqual(adaptedFakeOffer);
  });

  it('should return adaptComments is correct', () => {
    expect(adaptComments([fakeComment])[0]).toStrictEqual(adaptedFakeComment);
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
