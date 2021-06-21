import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getUniqCities} from '../../utils.js';
import Logo from '../logo/logo.jsx';
import LogoFooter from '../logo/logo.jsx';
import FavoritesCard from './favorites-card.jsx';
import AccountLogged from '../account/account-logged.jsx';
import OffersProp from '../property/offers.prop.js';

function Favorites(props) {
  const {offers} = props;

  const uniqCities = getUniqCities(offers);

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

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {uniqCities.map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="/">
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {offers.map((offer) => offer.isFavorite && offer.city.name === city && <FavoritesCard offer={offer} key={offer.id}/>)}
                  </div>
                </li>))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <LogoFooter/>
      </footer>
    </div>
  );
}

Favorites.propTypes = {
  offers: PropTypes.arrayOf(OffersProp),
};

export default Favorites;
