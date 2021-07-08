export const getUniqCities = (offers) => {
  const cities = new Set();
  offers.map((offer) => (offer.isFavorite && cities.add(offer.city.name)));
  const uniqCities = Array.from(cities);
  return uniqCities;
};

export const getMatchOffer = (offers, id) => {
  let matchedOffer;
  offers.map((offer) => offer.id === id ? matchedOffer = offer : '');
  return matchedOffer;
};

export const getFilteredOffers = (offers, city) =>
  offers.filter((offer) => offer.city.name === city);

