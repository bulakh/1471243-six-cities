import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../store/api-actions.js';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';
import Logo from '../logo/logo.jsx';
import AccountNotLogged from '../account/account-not-logged.jsx';
import {getError} from '../../store/user/selectors.js';
import ToastError from '../toast-error/toast-error.jsx';

function LoginScreen() {
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const loginRef = useRef();
  const passwordRef = useRef();
  let disabledBtn = false;

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(login({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    }));
  };

  const [passwordValue, setPasswordValue] = useState('');

  const handlePasswordChange = () => {
    setPasswordValue(passwordRef.current.value);
  };

  if (/\s/i.test(passwordValue) || passwordValue === '') {
    disabledBtn = true;
  }

  return (
    <div className="page page--gray page--login">
      {error !== '' && <ToastError/>}
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
            <AccountNotLogged/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  data-testid="login"
                  required=""
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  onChange={handlePasswordChange}
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  data-testid="password"
                  required=""
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={disabledBtn ? 'disabled' : ''}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.MAIN}>
                <span>Paris</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
