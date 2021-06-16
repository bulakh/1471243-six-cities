import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppRoute} from '../../const.js';
import Main from '../main/main.jsx';
// import MainEmpty from '../main/main-empty.jsx';
import Login from '../login/login.jsx';
import Favorites from '../favorites/favorites.jsx';
// import FavoritesEmpty from '../favorites/favorites-empty.jsx';
import Property from '../property/property.jsx';
// import PropertyNotLogged from '../property/property-not-logged.jsx';
import NotFoundPage from '../not-found-page/not-found-page.jsx';

function App(props) {
  const {cards} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <Main cards={cards} />
        </Route>
        <Route exact path={AppRoute.SIGN_IN}>
          <Login/>
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <Favorites/>
        </Route>
        <Route exact path={AppRoute.ROOM}>
          <Property/>
        </Route>
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};

export default App;
