import React from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {getMatchOffer} from '../../utils.js';
import Logo from '../logo/logo.jsx';
import AccountLogged from '../account/account-logged.jsx';
import PlaceCard from '../card/card.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import OffersProp from './offers.prop.js';
import ReviewsProp from './reviews.prop.js';

function Property(props) {
  const {offers, reviews} = props;

  const params = useParams();

  const id = params.id;
  const offerMatched = getMatchOffer(offers, id);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
            <AccountLogged/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offerMatched.images.map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt={offerMatched.type}/>
                </div>))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offerMatched.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offerMatched.title}
                </h1>
                <button className={offerMatched.isFavorite
                  ? 'property__bookmark-button property__bookmark-button--active button'
                  : 'property__bookmark-button button'} type="button"
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{offerMatched.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${Math.round(offerMatched.rating) * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offerMatched.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offerMatched.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offerMatched.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offerMatched.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offerMatched.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offerMatched.goods.map((thing) => (
                    <li className="property__inside-item" key={thing}>
                      {thing}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={offerMatched.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {offerMatched.host.name}
                  </span>
                  {offerMatched.host.isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offerMatched.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ul className="reviews__list">
                  {reviews.map((review) => (
                    <li className="reviews__item" key={review.id}>
                      <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
                        </div>
                        <span className="reviews__user-name">
                          {review.user.name}
                        </span>
                      </div>
                      <div className="reviews__info">
                        <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span style={{width: `${Math.round(review.rating) * 20}%`}}></span>
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <p className="reviews__text">
                          {review.comment}
                        </p>
                        <time className="reviews__time" dateTime={review.date}>{`${new Date(review.date).toLocaleString('en-US', { month: 'long' })} ${new Date(review.date).getFullYear()}`}</time>
                      </div>
                    </li>))}
                </ul>
                <ReviewForm/>
              </section>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {offers.map((offer) => (offerMatched.city.name === offer.city.name && <PlaceCard key={offer.id} offer={offer}/>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

Property.propTypes = {
  offers: PropTypes.arrayOf(OffersProp),
  reviews: PropTypes.arrayOf(ReviewsProp),
};

export default Property;
