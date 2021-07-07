import React from 'react';
import PropTypes from 'prop-types';
import Card from './card.jsx';
import OffersProp from '../property/offers.prop.js';

function CardList(props) {
  const {offers, onCardListHover} = props;

  return (
    <>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          onCardListHover={onCardListHover}
        />),
      )}
    </>
  );
}

CardList.propTypes = {
  offers: PropTypes.arrayOf(OffersProp),
  onCardListHover: PropTypes.func.isRequired,
};

export default CardList;
