import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Logo from '../logo/logo.jsx';
import AccountLogged from '../account/account-logged.jsx';
import AccountNotLogged from '../account/account-not-logged.jsx';
import CardList from '../card/card-list.jsx';
import ReviewForm from '../reviews/review-form.jsx';
import ReviewsList from '../reviews/reviews-list.jsx';
import Map from '../map/map.jsx';
import LoadingScreen from '../loading-screen/loading-screen.jsx';
import {AuthorizationStatus, FetchingStatus} from '../../const.js';

function Property(props) {
  const {offer, authorizationStatus, fetchDataStatus} = props;
  const currentOffer = offer.offer;
  const comments = offer.comments;
  const nearOffers = offer.nearby;

  const changedPin = false;


  if (fetchDataStatus === FetchingStatus.FETCHING) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
            {authorizationStatus === AuthorizationStatus.AUTH
              ? <AccountLogged/>
              : <AccountNotLogged/>}
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {currentOffer.images.map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt={currentOffer.type}/>
                </div>))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {currentOffer.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentOffer.title}
                </h1>
                <button className={currentOffer.isFavorite
                  ? 'property__bookmark-button property__bookmark-button--active button'
                  : 'property__bookmark-button button'} type="button"
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${Math.round(currentOffer.rating) * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{currentOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {currentOffer.goods.map((thing) => (
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
                    <img className="property__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <ReviewsList/>
                {authorizationStatus === AuthorizationStatus.AUTH
                  && <ReviewForm/>}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              city={currentOffer.city}
              points={nearOffers}
              changedPin={changedPin}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <CardList
                offers={nearOffers}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

Property.propTypes = {
  offer: PropTypes.object.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  fetchDataStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  offer: state.offer,
  fetchDataStatus: state.fetchDataStatus,
});

export {Property};
export default connect(mapStateToProps)(Property);
