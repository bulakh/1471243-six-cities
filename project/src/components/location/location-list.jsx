import React from 'react';
import PropTypes from 'prop-types';
import Location from './location.jsx';


function LocationList(props) {
  const {cities} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.map((name) => <Location name={name} key={name}/>)}
    </ul>
  );
}

LocationList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string.isRequired),
};


export default LocationList;
