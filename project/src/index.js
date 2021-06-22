import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import offers from './mocks/offers.js';
import reviews from './mocks/reviews.js';
import {cities} from './const.js';

ReactDOM.render(
  <React.StrictMode>
    <App
      offers={offers}
      reviews={reviews}
      cities={cities}
    />
  </React.StrictMode>,
  document.getElementById('root'),
);
