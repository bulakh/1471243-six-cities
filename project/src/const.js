export const houseTypes = ['hotel', 'house', 'apartment', 'room'];

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const sortVariants = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export const valueRatings = [
  {
    id: 5,
    title: 'perfect',
  },
  {
    id: 4,
    title: 'good',
  },
  {
    id: 3,
    title: 'not bad',
  },
  {
    id: 2,
    title: 'badly',
  },
  {
    id: 1,
    title: 'terribly',
  },
];

export const AppRoute = {
  MAIN: '/',
  SIGN_IN: '/login',
  FAVORITES: '/favorites',
  ROOM: '/offer/:id',
};

export const SortType = {
  POPULAR: 'Popular',
  LOW_TO_HIGH: 'Price: low to high',
  HIGH_TO_LOW: 'Price: high to low',
  TOP_RATED: 'Top rated first',
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};

export const APIRoute = {
  HOTELS: '/hotels',
  FAVORITE: '/favorite',
  COMMENTS: '/comments',
  LOGIN: '/login',
  LOGOUT: '/logout',
  NEARBY: '/nearby',
};

export const FetchingStatus = {
  IDLE: 'IDLE',
  FETCHING: 'FETCHING',
  FETCHING_PART: 'FETCHING_PART',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED',
};

export const FavoriteStatus = {
  TRUE: '1',
  FALSE: '0',
};

export const ErrorStatus = {
  UNAUTHORIZED: '401',
  BAD_REQUEST: '400',
};
