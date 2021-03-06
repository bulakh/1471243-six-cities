import React from 'react';
import {useSelector} from 'react-redux';
import MainEmpty from './main-empty.jsx';
import CardList from '../card/card-list.jsx';
import SortList from '../sort/sort-list.jsx';
import Logo from '../logo/logo.jsx';
import LocationList from '../location/location-list.jsx';
import AccountLogged from '../account/account-logged.jsx';
import AccountNotLogged from '../account/account-not-logged.jsx';
import Map from '../map/map.jsx';
import {AuthorizationStatus, cities} from '../../const.js';
import {getSortedOffersOfOneCity} from '../../store/data/selectors.js';
import {getSort, getCity} from '../../store/navigation/selectors.js';
import {getAuthorizationStatus, getError} from '../../store/user/selectors.js';
import useToggle from '../../hooks/use-toggle.js';
import ToastError from '../toast-error/toast-error.jsx';

function Main() {
  const OFFERS_LENGTH = 0;

  const city = useSelector(getCity);
  const sort = useSelector(getSort);
  const error = useSelector(getError);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const [showSort, toggleShowSort] = useToggle(false);

  const offersOfOneCity = useSelector(getSortedOffersOfOneCity);

  const changedPin = true;

  if (offersOfOneCity.length === OFFERS_LENGTH) {
    return (
      <MainEmpty city={city}/>
    );
  }

  return (
    <div className="page page--gray page--main">
      {error !== '' && <ToastError/>}
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList cities={cities}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersOfOneCity.length} places to stay in {city}</b>
              <form className="places__sorting" action="#" method="get"
                onClick = {toggleShowSort}
              >
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  {sort}
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <SortList offers={offersOfOneCity} active={showSort}/>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <CardList
                  offers={offersOfOneCity}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  currentOffer={offersOfOneCity[0]}
                  points={offersOfOneCity}
                  changedPin={changedPin}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
