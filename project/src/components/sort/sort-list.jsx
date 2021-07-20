import React from 'react';
import PropTypes from 'prop-types';
import {sortOffersList} from '../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import {sortVariants} from '../../const.js';
import {getSort} from '../../store/navigation/selectors.js';

function SortList({active}) {

  const sort = useSelector(getSort);
  const dispatch= useDispatch();

  return (
    <ul className={`places__options places__options--custom ${active && 'places__options--opened'}`}
      onClick={(evt) => {
        dispatch(sortOffersList(evt.target.dataset.name));
      }}
    >
      {sortVariants.map((variant) => (
        <li className={`places__option ${sort === variant ? 'places__option--active' : ''}`} tabIndex="0" data-name={variant} key={variant}>{variant}
        </li>
      ))}
    </ul>
  );
}

SortList.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default SortList;
