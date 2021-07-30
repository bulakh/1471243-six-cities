import {FetchingStatus, SortType, AuthorizationStatuses} from './const.js';

export const fakeOffer = {
  'bedrooms': 3,
  'city': {
    'location': {
      'latitude': 52.370216,
      'longitude': 4.895168,
      'zoom': 10,
    },
    'name': 'Amsterdam',
  },
  'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'goods': ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  'host': {
    'avatar_url': 'img/1.png',
    'id': 3,
    'is_pro': true,
    'name': 'Angelina',
  },
  'id': 1,
  'images': ['img/1.png', 'img/2.png'],
  'is_favorite': true,
  'is_premium': false,
  'location': {
    'latitude': 52.35514938496378,
    'longitude': 4.673877537499948,
    'zoom': 8,
  },
  'max_adults': 4,
  'preview_image': 'img/1.png',
  'price': 120,
  'rating': 4.8,
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
};

export const fakeComment = {
  'comment': 'Sun shine very good! I am so happy, gut in tac',
  'date': '2019-05-08T14:13:56.569Z',
  'id': 1,
  'rating': 4,
  'user': {
    'avatar_url': 'img/1.png',
    'id': 4,
    'is_pro': false,
    'name': 'Max',
  },
};

export const adaptedFakeOffer = {
  'bedrooms': 3,
  'city': {
    'location': {
      'latitude': 52.370216,
      'longitude': 4.895168,
      'zoom': 10,
    },
    'name': 'Amsterdam',
  },
  'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'goods': ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  'host': {
    'avatarUrl': 'img/1.png',
    'id': 3,
    'isPro': true,
    'name': 'Angelina',
  },
  'id': 1,
  'images': ['img/1.png', 'img/2.png'],
  'isFavorite': true,
  'isPremium': false,
  'location': {
    'latitude': 52.35514938496378,
    'longitude': 4.673877537499948,
    'zoom': 8,
  },
  'maxAdults': 4,
  'previewImage': 'img/1.png',
  'price': 120,
  'rating': 4.8,
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
};

export const adaptedFakeComment = {
  'comment': 'Sun shine very good! I am so happy, gut in tac',
  'date': '2019-05-08T14:13:56.569Z',
  'id': 1,
  'rating': 4,
  'user': {
    'avatarUrl': 'img/1.png',
    'id': 4,
    'isPro': false,
    'name': 'Max',
  },
};

export const SortedAdaptedFakeComments = [{
  'comment': 'Sun shine very good! I am so happy, gut in tac',
  'date': 'Wed May 08 2019 17:13:56 GMT+0300 (GMT+03:00)',
  'id': 1,
  'rating': 4,
  'user': {
    'avatarUrl': 'img/1.png',
    'id': 4,
    'isPro': false,
    'name': 'Max',
  },
}];

export const fakeUser = {
  'avatar_url': 'img/1.png',
  'email': 'Oliver.conner@gmail.com',
  'id': 1,
  'is_pro': false,
  'name': 'Oliver.conner',
  'token': 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
};


export const fakeStore = {
  DATA: {
    offer: {
      offer: adaptedFakeOffer,
      comments: [adaptedFakeComment],
      nearby: [adaptedFakeOffer],
    },
    allOffers: [adaptedFakeOffer],
    favorites: [adaptedFakeOffer],
    fetchDataStatus: FetchingStatus.IDLE,
  },
  NAVIGATION: {
    city: 'Amsterdam',
    selectedPointId: '1',
    sort: SortType.POPULAR,
  },
  USER: {
    authorizationStatus: AuthorizationStatuses.AUTH,
    email: 'foma@mail.com',
    avatar: 'https://7.react.pages.academy/static/avatar/2.jpg',
    error: 'Server give up! Pls later',
  },
};
