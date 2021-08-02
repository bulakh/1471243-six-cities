import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../store/api-actions';
import {getEmail, getAvatar} from '../../store/user/selectors.js';
import {fetchFavorites, fetchOffersList} from '../../store/api-actions.js';

function AccountLogged() {

  const email = useSelector(getEmail);
  const avatar = useSelector(getAvatar);
  const dispatch = useDispatch();

  const handleSessionClose = () => {
    dispatch(logout())
      .then(() => dispatch(fetchOffersList()));
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile"
            to={AppRoute.FAVORITES}
            onClick={() => dispatch(fetchFavorites())}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper">
              <img style={{borderRadius: '50%'}} src={avatar} alt="This is me"/>
            </div>
            <span className="header__user-name user__name" data-testid="email">{email}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <button
            className="header__nav-link"
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
            onClick={handleSessionClose}
          >
            <span className="header__signout">Sign out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default AccountLogged;
