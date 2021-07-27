import {data} from './data.js';
import {ActionType} from '../action.js';
import {FetchingStatus} from '../../const.js';

const offer = {
  offer: {
    city: {
      name: '',
      location: {
        latitude: 54,
        longitude: 2,
        zoom: 13,
      },
    },
    images: [],
    title: '',
    rating: 5,
    type: '',
    bedrooms: 2,
    price: 150,
    goods: [],
    host: {
      id: 1,
      name: '',
      avatarUrl: '',
      isPro: false,
    },
    description: '',
    location: {
      latitude: 54,
      longitude: 2.5,
      zoom: 16,
    },
    id: 2,
    isFavorite: false,
    isPremium: true,
    maxAdults: 8,
    previewImage: '',
  },
  comments: [
    {
      id: 1,
      user: {
        id: 16,
        name: '',
        avatarUrl: '',
        isPro: true,
      },
      rating: 3,
      comment: '',
      date: '',
    },
  ],
  nearby: [],
};

describe('Reducer: data', () => {

  const state = {
    offer: {},
    allOffers: [],
    favorites: [],
    fetchDataStatus: FetchingStatus.IDLE,
  };

  it('without additional parameters should return initial state', () => {
    expect(data(undefined, {}))
      .toEqual({
        offer: {},
        allOffers: [],
        favorites: [],
        fetchDataStatus: FetchingStatus.IDLE,
      });
  });

  it('should put data for offer in store', () => {
    const loadOfferAction = {
      type: ActionType.LOAD_OFFER,
      payload: offer,

    };

    expect(data(state, loadOfferAction))
      .toEqual({
        offer: {},
        allOffers: [],
        favorites: [],
        fetchDataStatus: FetchingStatus.IDLE,
      });
  });

  it('should put all offers in store', () => {
    const loadOffersAction = {
      type: ActionType.LOAD_OFFERS,
      payload: [offer.offer],
    };

    expect(data(state, loadOffersAction))
      .toEqual({
        offer: {},
        allOffers: [offer.offer],
        favorites: [],
        fetchDataStatus: FetchingStatus.IDLE,
      });
  });

  it('should put comments in store', () => {
    const loadCommentsAction = {
      type: ActionType.LOAD_COMMENTS,
      payload: [offer.comments],
    };

    expect(data(state, loadCommentsAction))
      .toEqual({
        offer: {
          comments: [offer.comments],
        },
        allOffers: [],
        favorites: [],
        fetchDataStatus: FetchingStatus.IDLE,
      });
  });

  it('should put favorite offers in store', () => {
    const loadFavoritesAction = {
      type: ActionType.LOAD_FAVORITES,
      payload: [offer.offer],
    };

    expect(data(state, loadFavoritesAction))
      .toEqual({
        offer: {},
        allOffers: [],
        favorites: [offer.offer],
        fetchDataStatus: FetchingStatus.IDLE,
      });
  });

  it('get fetching data status and put it in store', () => {
    const fetchDataStatusAction = {
      type: ActionType.FETCH_DATA_STATUS,
      payload: FetchingStatus.FETCHED,
    };

    expect(data(state, fetchDataStatusAction))
      .toEqual({
        offer: {},
        allOffers: [],
        favorites: [],
        fetchDataStatus: FetchingStatus.FETCHED,
      });
  });

  it('should update offer and change it in store', () => {
    const updateOfferAction = {
      type: ActionType.UPDATE_OFFER,
      payload: offer.offer,
    };

    expect(data(state, updateOfferAction))
      .toEqual({
        offer: {
          offer: offer.offer,
        },
        allOffers: [],
        favorites: [],
        fetchDataStatus: FetchingStatus.IDLE,
      });
  });

});
