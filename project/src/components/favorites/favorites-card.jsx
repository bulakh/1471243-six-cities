import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import OffersProp from '../property/offers.prop.js';
import {postGetFavorites, fetchFavorites} from '../../store/api-actions.js';
import {getFetchDataStatus} from '../../store/data/selectors.js';
import {FavoriteStatus, FetchingStatus} from '../../const.js';

function FavoritesCard({offer}) {
  const dispatch = useDispatch();
  const fetchDataStatus = useSelector(getFetchDataStatus);

  const removeFavorite = () => {
    dispatch(postGetFavorites(offer.id, FavoriteStatus.FALSE))
      .then(() => dispatch(fetchFavorites()));
  };

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {FetchingStatus.IDLE === fetchDataStatus &&
            <button onClick={removeFavorite} className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button>}
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

FavoritesCard.propTypes = {
  offer: OffersProp,
};

export default FavoritesCard;
