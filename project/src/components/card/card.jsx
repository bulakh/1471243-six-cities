import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectPointId} from '../../store/action.js';
import {Link} from 'react-router-dom';
import OffersProp from '../property/offers.prop.js';
import {fetchDataForOffer, postGetFavorites} from '../../store/api-actions.js';
import {FavoriteStatus, FetchingStatus} from '../../const.js';
import {getFetchDataStatus} from '../../store/data/selectors.js';
import useToggle from '../../hooks/use-toggle.js';


function Card({offer}) {

  const dispatch = useDispatch();
  const fetchDataStatus = useSelector(getFetchDataStatus);
  const [isActive, toggleActive] = useToggle(offer.isFavorite);

  const handleCardListHover = (evt) => {
    dispatch(selectPointId(evt.currentTarget.id));
  };

  const handleCardListClick = (evt) => {
    dispatch(fetchDataForOffer(evt.currentTarget.id));
  };

  const handleFavoriteToggle = () => {
    dispatch(postGetFavorites(offer.id, isActive ? FavoriteStatus.FALSE : FavoriteStatus.TRUE));
    toggleActive();
  };

  return (
    <article className="cities__place-card place-card"
      onMouseEnter={handleCardListHover}
      id={offer.id}
    >
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link
          to={`/offer/${offer.id}`}
          onClick={handleCardListClick}
          id={offer.id}
        >
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {FetchingStatus.IDLE === fetchDataStatus &&
            <button
              className={isActive
                ? 'place-card__bookmark-button place-card__bookmark-button--active button'
                : 'place-card__bookmark-button button'}
              type="button"
              onClick = {handleFavoriteToggle}
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
            </button>}
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(offer.rating) * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={`/offer/${offer.id}`}
            onClick={handleCardListClick}
            id={offer.id}
          >
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}</p>
      </div>
    </article>
  );
}

Card.propTypes = {
  offer: OffersProp,
};

export default Card;
