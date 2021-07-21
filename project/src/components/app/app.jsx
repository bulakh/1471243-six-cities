import React from 'react';
import {useSelector} from 'react-redux';
import {Router as BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppRoute, FetchingStatus} from '../../const.js';
import Main from '../main/main.jsx';
import Login from '../login/login-screen.jsx';
import Favorites from '../favorites/favorites.jsx';
import Property from '../property/property.jsx';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../not-found-page/not-found-page.jsx';
import LoadingScreen from '../loading-screen/loading-screen.jsx';
import {isCheckedAuth} from '../../utils.js';
import browserHistory from '../../browser-history.js';
import {getAuthorizationStatus} from '../../store/user/selectors.js';
import {getFetchDataStatus} from '../../store/data/selectors.js';

function App() {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const fetchDataStatus = useSelector(getFetchDataStatus);

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

export default App;
