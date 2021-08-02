import React from 'react';
import {useSelector} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {AppRoute, FetchingStatus, AuthorizationStatus, LENGTH_OF_OFFER} from '../../const.js';
import Main from '../main/main.jsx';
import Login from '../login/login-screen.jsx';
import Favorites from '../favorites/favorites.jsx';
import Property from '../property/property.jsx';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../not-found-page/not-found-page.jsx';
import LoadingScreen from '../loading-screen/loading-screen.jsx';
import {isCheckedAuth} from '../../utils.js';
import {getAuthorizationStatus} from '../../store/user/selectors.js';
import {getOffer, getFetchDataStatus} from '../../store/data/selectors.js';

function App() {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const fetchDataStatus = useSelector(getFetchDataStatus);
  const offer = useSelector(getOffer);

  if (isCheckedAuth(authorizationStatus) || fetchDataStatus === FetchingStatus.FETCHING) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <Switch>
      <Route
        exact
        path={AppRoute.MAIN}
      >
        <Main/>
      </Route>
      <Route
        exact
        path={AppRoute.SIGN_IN}
        render={() => authorizationStatus === AuthorizationStatus.AUTH
          ? <Redirect to={AppRoute.MAIN}/>
          : <Login/>}
      >
      </Route>
      <PrivateRoute
        exact
        path={AppRoute.FAVORITES}
        render={() => <Favorites/>}
      >
      </PrivateRoute>
      <Route
        exact
        path={AppRoute.ROOM}
        render={() => Object.keys(offer).length === LENGTH_OF_OFFER
          ? <Property/>
          : <NotFoundPage/>}
      >
      </Route>
      <Route>
        <NotFoundPage/>
      </Route>
    </Switch>
  );
}

export default App;
