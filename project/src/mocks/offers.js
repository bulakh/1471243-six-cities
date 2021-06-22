import {nanoid} from 'nanoid';
const AVATAR_URL = 'https://i.pravatar.cc/128';

const offers = [
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Cologne',
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: nanoid(),
      isPro: true,
      name: 'Angelina',
    },
    id: nanoid(),
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/room.jpg'],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    maxAdults: 4,
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    rating: 4.6,
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
  },
  {
    bedrooms: 4,
    city: {
      location: {
        latitude: 61.216,
        longitude: 7.895168,
        zoom: 10,
      },
      name: 'Cologne',
    },
    description: 'If you want to see nice city, go to Brussels.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine'],
    host: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: nanoid(),
      isPro: false,
      name: 'Jack',
    },
    id: nanoid(),
    images: ['img/apartment-02.jpg', 'img/apartment-01.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/room.jpg'],
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 61.216,
      longitude: 7.895168,
      zoom: 8,
    },
    maxAdults: 8,
    previewImage: 'img/apartment-03.jpg',
    price: 210,
    rating: 3.3,
    title: 'Our little hotel',
    type: 'hotel',
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 56.221516,
        longitude: 5.12895168,
        zoom: 10,
      },
      name: 'Paris',
    },
    description: 'So France city',
    goods: ['Heating', 'Cable TV', 'Washing machine', 'Free wi-fi'],
    host: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: nanoid(),
      isPro: false,
      name: 'Milo',
    },
    id: nanoid(),
    images: ['img/room.jpg', 'img/apartment-02.jpg', 'img/apartment-01.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg'],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 56.221516,
      longitude: 5.12895168,
      zoom: 7,
    },
    maxAdults: 3,
    previewImage: 'img/apartment-02.jpg',
    price: 150,
    rating: 3.9,
    title: 'Mummys house',
    type: 'house',
  },
  {
    bedrooms: 1,
    city: {
      location: {
        latitude: 49.21516,
        longitude: 8.1285168,
        zoom: 7,
      },
      name: 'Dusseldorf',
    },
    description: 'Beautiful place and good sausages',
    goods: ['Freshly', 'Nice view', 'Washing machine', 'Cheap wi-fi', 'Free beer'],
    host: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: nanoid(),
      isPro: true,
      name: 'Hans',
    },
    id: nanoid(),
    images: ['img/apartment-03.jpg', 'img/studio-01.jpg', 'img/room.jpg', 'img/apartment-02.jpg', 'img/apartment-01.jpg'],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 49.21516,
      longitude: 8.1285168,
      zoom: 7,
    },
    maxAdults: 1,
    previewImage: 'img/apartment-03.jpg',
    price: 120,
    rating: 2.4,
    title: 'Big best room in centre',
    type: 'room',
  },
];

export default offers;
