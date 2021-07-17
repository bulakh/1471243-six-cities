import {AuthorizationStatus} from './const';
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
  authorizationStatus === AuthorizationStatus.UNKNOWN;

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
