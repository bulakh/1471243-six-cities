import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action.js';
import {Link} from 'react-router-dom';
import OffersProp from '../property/offers.prop.js';

function Card(props) {
  const {offer, selectPointId} = props;

  const listCardHoverHandler = (evt) => {
    selectPointId(evt.currentTarget.id);
  };

  return (
    <article className="cities__place-card place-card"
      onMouseEnter={listCardHoverHandler}
      id={offer.id}
    >
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={offer.isFavorite
            ? 'place-card__bookmark-button place-card__bookmark-button--active button'
            : 'place-card__bookmark-button button'} type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(offer.rating) * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

Card.propTypes = {
  offer: OffersProp,
  selectPointId: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  selectPointId(id) {
    dispatch(ActionCreator.selectPointId(id));
  },
});

export {Card};
export default connect(null, mapDispatchToProps)(Card);
