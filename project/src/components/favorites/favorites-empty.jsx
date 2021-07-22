import React from 'react';
import Logo from '../logo/logo.jsx';
import LogoFooter from '../logo/logo-footer.jsx';
import AccountLogged from '../account/account-logged.jsx';

function FavoritesEmpty() {
  return (
    <div className="page page--favorites-empty">
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
