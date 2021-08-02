import {AuthorizationStatus, MAX_COMMENTS} from './const';
import {offerAdaptToClient, commentAdaptToClient} from './store/adapter.js';

export const getUniqCities = (offers) => {
  const cities = new Set();
  offers.map((offer) => (offer.isFavorite && cities.add(offer.city.name)));
  const uniqCities = Array.from(cities);
  return uniqCities;
};

export const isCheckedAuth = (authorizationStatus) =>
  authorizationStatus === AuthorizationStatus.UNKNOWN;

export const adaptOffers = (offers) => {
  const adaptedOffers = [];

  offers.forEach((offer) => {
    adaptedOffers.push(offerAdaptToClient(offer));
  });
  return adaptedOffers;
};

export const adaptComments = (comments) => {
  const adaptedComments = [];

  comments.forEach((comment) => {
    adaptedComments.push(commentAdaptToClient(comment));
  });
  return adaptedComments;
};

export const getHeaders = (token) => {
  const headers = {
    headers: {
      'x-token': token,
    },
  };

  return headers;
};

export const getSortedComments = (comments) => {
  comments.map ((comment) => comment.date = new Date(comment.date));
  comments.sort(((a, b) => b.date - a.date));
  comments.map ((comment) => comment.date = comment.date.toUTCString());
  return comments.slice(0, MAX_COMMENTS);
};
