import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const Setting = {
  ORDERS_COUNT: 6,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      ordersCount={Setting.ORDERS_COUNT}
    />
  </React.StrictMode>,
  document.getElementById('root'),
);
