import {AuthorizationStatuses} from './const';
import {offerAdaptToClient, commentAdaptToClient} from './store/adapter.js';

export const getUniqCities = (offers) => {
  const cities = new Set();
  offers.map((offer) => (offer.isFavorite && cities.add(offer.city.name)));
  const uniqCities = Array.from(cities);
  return uniqCities;
};

export const getFilteredOffers = (offers, city) =>
  offers.filter((offer) => offer.city.name === city);

export const isCheckedAuth = (authorizationStatus) =>
  authorizationStatus === AuthorizationStatuses.UNKNOWN;

export const adaptedOffers = (offers) => {
  const adaptOffers = [];

  offers.forEach((offer) => {
    adaptOffers.push(offerAdaptToClient(offer));
  });
  return adaptOffers;
};

export const adaptedComments = (comments) => {
  const adaptComments = [];

  comments.forEach((comment) => {
    adaptComments.push(commentAdaptToClient(comment));
  });
  return adaptComments;
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
  return comments.slice(0, 10);
};
