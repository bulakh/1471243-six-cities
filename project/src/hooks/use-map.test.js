import {renderHook} from '@testing-library/react-hooks';
import useMap from './use-map.jsx';
import {fakeOffer} from '../fake.js';

let cityMock = null;
const fakeMapRef = null;

describe('Hook: useMap', () => {
  beforeEach(() => {
    jest.mock('leaflet', () => ({
      map: () => {},
    }));

    cityMock = fakeOffer.city;
  });

  it('should return map object', () => {
    const {result} = renderHook(() =>
      useMap(fakeMapRef, cityMock),
    );

    expect(result).toBeInstanceOf(Object);
  });
});

