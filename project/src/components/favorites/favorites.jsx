import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUniqCities} from '../../utils.js';
import Logo from '../logo/logo.jsx';
import LogoFooter from '../logo/logo.jsx';
import FavoritesCard from './favorites-card.jsx';
import AccountLogged from '../account/account-logged.jsx';
import {getAllOffers} from '../../store/data/selectors.js';

function Favorites() {
  const allOffers = useSelector(getAllOffers);

  const uniqCities = getUniqCities(allOffers);

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
                    {allOffers.map((offer) => offer.isFavorite && offer.city.name === city && <FavoritesCard offer={offer} key={offer.id}/>)}
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

export default Favorites;
