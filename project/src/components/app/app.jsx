import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppRoute} from '../../const.js';
import Main from '../main/main.jsx';
import Login from '../login/login.jsx';
import Favorites from '../favorites/favorites.jsx';
// import FavoritesEmpty from '../favorites/favorites-empty.jsx';
import Property from '../property/property.jsx';
// import PropertyNotLogged from '../property/property-not-logged.jsx';
import NotFoundPage from '../not-found-page/not-found-page.jsx';
import OffersProp from '../property/offers.prop.js';
import ReviewsProp from '../reviews/reviews.prop.js';

function App(props) {
  const {offers, reviews, cities} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <Main
            offers={offers}
            cities={cities}
          />
        </Route>
        <Route exact path={AppRoute.SIGN_IN}>
          <Login/>
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <Favorites
            offers={offers}
          />
        </Route>
        <Route exact path={AppRoute.ROOM}>
          <Property
            offers={offers}
            reviews={reviews}
          />
        </Route>
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  offers: PropTypes.arrayOf(OffersProp),
  reviews: PropTypes.arrayOf(ReviewsProp),
  cities: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default App;
