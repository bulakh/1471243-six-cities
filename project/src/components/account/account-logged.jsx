import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../store/api-actions';
import {getEmail} from '../../store/user/selectors.js';


function AccountLogged() {

  const email = useSelector(getEmail);
  const dispatch = useDispatch();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{email}</span>
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
            onClick={() => dispatch(logout())}
          >
            <span className="header__signout">Sign out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default AccountLogged;
