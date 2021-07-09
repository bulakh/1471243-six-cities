import React from 'react';
import PropTypes from 'prop-types';
import {ActionCreator} from '../../store/action';
import {connect} from 'react-redux';
import {sortVariants} from '../../const.js';

function SortList(props) {
  const {active, sortOffersList, sort} = props;

  return (
    <ul className={`places__options places__options--custom ${active && 'places__options--opened'}`}
      onClick={(evt) => {
        sortOffersList(evt.target.textContent);
      }}
    >
      {sortVariants.map((variant) => (
        <li className={`places__option ${sort === variant ? 'places__option--active' : ''}`} tabIndex="0" key={variant}>{variant}
        </li>
      ))}
    </ul>
  );
}

SortList.propTypes = {
  active: PropTypes.bool.isRequired,
  sortOffersList: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  sort: state.sort,
});

const mapDispatchToProps = (dispatch) => ({
  sortOffersList(variant) {
    dispatch(ActionCreator.sortOffersList(variant));
  },
});

export {SortList};
export default connect(mapStateToProps, mapDispatchToProps)(SortList);
