import React from 'react';
import PropTypes from 'prop-types';
import MainScreen from '../main-screen/main-screen.jsx';

function App(props) {
  const {ordersCount} = props;

  return (
    <MainScreen ordersCount={ordersCount} />
  );
}

App.propTypes = {
  ordersCount: PropTypes.number.isRequired,
};

export default App;
