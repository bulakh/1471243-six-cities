import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReviewsItem from './reviews-item.jsx';
import {FetchingStatus} from '../../const.js';

function ReviewsList(props) {
  const {offer, fetchDataStatus} = props;

  const reviews = offer.comments;

  return (
    <>
      <ul className="reviews__list">
        {reviews.map((review) => <ReviewsItem review={review} key={review.id}/>)}
      </ul>
      {FetchingStatus.FETCHING_PART === fetchDataStatus &&
      <p>Loading...</p>}
    </>
  );
}

ReviewsList.propTypes = {
  offer: PropTypes.object.isRequired,
  fetchDataStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
  fetchDataStatus: state.fetchDataStatus,
});

export {ReviewsList};
export default connect(mapStateToProps)(ReviewsList);
