import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';
import {getError} from '../../store/user/selectors.js';
import ToastError from '../toast-error/toast-error.jsx';


function NotFoundPage() {
  const error = useSelector(getError);

  return (
    <section>
      {error !== '' && <ToastError/>}
      <h1>404. Page not found!</h1>
      <Link to={AppRoute.MAIN}>Back to Main page</Link>
    </section>
  );
}

export default NotFoundPage;
