import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';

function NotFoundPage() {

  return (
    <section>
      <h1>404. Page not found!</h1>
      <Link to={AppRoute.MAIN}>Back to Main page</Link>
    </section>
  );
}

export default NotFoundPage;
