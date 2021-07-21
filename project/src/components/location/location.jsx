import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeCity} from '../../store/action';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';
import {getCity} from '../../store/navigation/selectors.js';

function Location({name}) {
  const city = useSelector(getCity);
  const dispatch = useDispatch();

  const ACTIVE_CLASS = 'tabs__item--active';

  return (
    <li className="locations__item">
      <Link to={AppRoute.MAIN} className={`locations__item-link tabs__item ${ name === city ? ACTIVE_CLASS : ''}`} onClick = {(evt) => {
        dispatch(changeCity(evt.target.textContent));
      }}
      >
        <span>{name}</span>
      </Link>
    </li>
  );
}

Location.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Location;
