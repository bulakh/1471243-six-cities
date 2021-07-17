import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Router as BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppRoute, FetchingStatus} from '../../const.js';
import Main from '../main/main.jsx';
import Login from '../login/login-screen.jsx';
import Favorites from '../favorites/favorites.jsx';
// import FavoritesEmpty from '../favorites/favorites-empty.jsx';
import Property from '../property/property.jsx';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../not-found-page/not-found-page.jsx';
import LoadingScreen from '../loading-screen/loading-screen.jsx';
import {isCheckedAuth} from '../../utils.js';
import browserHistory from '../../browser-history.js';

function App(props) {
  const {authorizationStatus, fetchDataStatus} = props;

  if (isCheckedAuth(authorizationStatus) || fetchDataStatus === FetchingStatus.FETCHING) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <Main/>
        </Route>
        <Route exact path={AppRoute.SIGN_IN}>
          <Login/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => <Favorites/>}
        >
        </PrivateRoute>
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
  authorizationStatus: PropTypes.string.isRequired,
  fetchDataStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  fetchDataStatus: state.fetchDataStatus,
});

export {App};
export default connect(mapStateToProps)(App);
