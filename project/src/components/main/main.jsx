import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getFilteredOffers} from '../../utils.js';
import {ActionCreator} from '../../store/action';
import MainEmpty from './main-empty.jsx';
import CardList from '../card/card-list.jsx';
import SortList from '../sort/sort-list.jsx';
import Logo from '../logo/logo.jsx';
import LocationList from '../location/location-list.jsx';
import AccountLogged from '../account/account-logged.jsx';
import Map from '../map/map.jsx';
import OffersProp from '../property/offers.prop.js';
import {sorting} from '../sort/sort.js';

function Main(props) {
  const {offers, cities, city, sort, fillOffersList} = props;

  const offersOfOneCity = getFilteredOffers(offers, city);

  fillOffersList(offersOfOneCity);
  fillOffersList(sorting(offersOfOneCity, sort));

  const [showedSort, setShowedSort] = useState(false);

  const toggleSort = () => {
    setShowedSort(!showedSort);
  };

  const [selectedPoint, setSelectedPoint] = useState({});

  const onCardListHover = (cardID) => {
    const currentPoint = offers.find((offer) =>
      offer.id === cardID,
    );
    setSelectedPoint(currentPoint);
  };

  const changedPin = true;

  if (offersOfOneCity.length === 0) {
    return (
      <MainEmpty cities={cities}/>
    );
  }

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
            <LocationList cities={cities}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersOfOneCity.length} places to stay in {city}</b>
              <form className="places__sorting" action="#" method="get"
                onClick = {toggleSort}
              >
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  {sort}
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <SortList offers={offersOfOneCity} active={showedSort}/>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <CardList
                  offers={offersOfOneCity}
                  onCardListHover={onCardListHover}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={offersOfOneCity[0].city}
                  points={offersOfOneCity}
                  selectedPoint={selectedPoint}
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

Main.propTypes = {
  offers: PropTypes.arrayOf(OffersProp),
  fillOffersList: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string.isRequired),
  city: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  sort: state.sort,
});

const mapDispatchToProps = (dispatch) => ({
  fillOffersList(offers) {
    dispatch(ActionCreator.fillOffersList(offers));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

