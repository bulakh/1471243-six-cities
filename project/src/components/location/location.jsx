import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';

function Location(props) {
  const {name, city, changeCity} = props;

  const activeClass = 'tabs__item--active';


  return (
    <li className="locations__item">
      <Link to={AppRoute.MAIN} className={`locations__item-link tabs__item ${ name === city ? activeClass : ''}`} onClick = {(evt) => {
        changeCity(evt.target.textContent);
      }}
      >
        <span>{name}</span>
      </Link>
    </li>
  );
}

Location.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  changeCity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  changeCity(name) {
    dispatch(ActionCreator.changeCity(name));
  },
});

export {Location};
export default connect(mapStateToProps, mapDispatchToProps)(Location);
