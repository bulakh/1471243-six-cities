import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from '../../store/api-actions';


function AccountLogged(props) {
  const {email, logoutAccount} = props;

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
          <Link
            className="header__nav-link"
            to={'#'}
            onClick={() => {
              logoutAccount();
            }}
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

AccountLogged.propTypes = {
  email: PropTypes.string,
  logoutAccount: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  email: state.email,
});

const mapDispatchToProps = (dispatch) => ({
  logoutAccount() {
    dispatch(logout());
  },
});

export {AccountLogged};
export default connect(mapStateToProps, mapDispatchToProps)(AccountLogged);
