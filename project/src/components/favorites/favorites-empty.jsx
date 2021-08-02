import React from 'react';
import {useSelector} from 'react-redux';
import Logo from '../logo/logo.jsx';
import LogoFooter from '../logo/logo-footer.jsx';
import AccountLogged from '../account/account-logged.jsx';
import {getError} from '../../store/user/selectors.js';
import ToastError from '../toast-error/toast-error.jsx';

function FavoritesEmpty() {
  const error = useSelector(getError);

  return (
    <div className="page page--favorites-empty">
      {error !== '' && <ToastError/>}
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
            <AccountLogged/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <LogoFooter/>
      </footer>
    </div>
  );
}

export default FavoritesEmpty;
