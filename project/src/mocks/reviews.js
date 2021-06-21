import {nanoid} from 'nanoid';
const AVATAR_URL = 'https://i.pravatar.cc/128';

const reviews = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2019-05-08T14:13:56.569Z',
    id: nanoid(),
    rating: 4,
    user: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: nanoid(),
      isPro: true,
      name: 'Max',
    },
  },
  {
    comment: 'Very awful place',
    date: '2019-06-07T14:10:16.569Z',
    id: nanoid(),
    rating: 2,
    user: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: nanoid(),
      isPro: false,
      name: 'Irina',
    },
  },
  {
    comment: 'Neploho',
    date: '2020-10-07T14:12:03.569Z',
    id: nanoid(),
    rating: 4.5,
    user: {
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      id: nanoid(),
      isPro: false,
      name: 'Andrey',
    },
  },
];

export default reviews;
