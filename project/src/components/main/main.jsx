import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../card/card.jsx';
import Logo from '../logo/logo.jsx';
import Location from '../location/location.jsx';
import AccountLogged from '../account/account-logged.jsx';
import Map from '../map/map.jsx';
import OffersProp from '../property/offers.prop.js';

function Main(props) {
  const {offers, cities} = props;
  const [showedSort, setShowedSort] = useState(false);

  const toggleSort = () => {
    setShowedSort(!showedSort);
  };

  const [selectedPoint, setSelectedPoint] = useState({});

  const onListCardHover = (cardID) => {
    const currentPoint = offers.find((offer) =>
      offer.id === cardID,
    );
    setSelectedPoint(currentPoint);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
            <AccountLogged/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((name) => <Location name={name} key={name}/>)}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get"
                onClick = {toggleSort}
              >
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                {showedSort &&
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>}
              </form>
              <div className="cities__places-list places__list tabs__content">
                {offers.map((offer) => (
                  <PlaceCard
                    key={offer.id}
                    offer={offer}
                    onListCardHover={onListCardHover}
                  />),
                )}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={offers[0].city}
                  points={offers}
                  selectedPoint={selectedPoint}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

Main.propTypes = {
  offers: PropTypes.arrayOf(OffersProp),
  cities: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default Main;
