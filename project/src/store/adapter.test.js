import {fakeOffer, fakeComment, adaptedFakeComment, adaptedFakeOffer} from '../fake.js';
import {offerAdaptToClient, commentAdaptToClient} from './adapter.js';

describe('Functions: Adapter', () => {
  it('should return offerAdaptToClient is correct', () => {
    expect(offerAdaptToClient(fakeOffer)).toStrictEqual(adaptedFakeOffer);
  });

  it('should return commentAdaptToClient is correct', () => {
    expect(commentAdaptToClient(fakeComment)).toStrictEqual(adaptedFakeComment);
  });
});
