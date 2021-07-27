import React from 'react';
import PropTypes from 'prop-types';
import Card from './card.jsx';
import OffersProp from '../property/offers.prop.js';

function CardList({offers}) {

  return (
    <>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
        />),
      )}
    </>
  );
}

CardList.propTypes = {
  offers: PropTypes.arrayOf(OffersProp),
};

export default CardList;
