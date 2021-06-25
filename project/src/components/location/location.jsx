import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';

function Location(props) {
  const {name} = props;
  const [locationLink, setLocationLink] = useState('locations__item-link tabs__item');

  return (
    <li className="locations__item">
      <Link to={AppRoute.MAIN} className={locationLink} onClick = {() => setLocationLink(`${locationLink} tabs__item--active`)}>
        <span>{name}</span>
      </Link>
    </li>
  );
}

Location.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Location;
