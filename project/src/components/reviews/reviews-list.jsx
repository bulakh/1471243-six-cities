import React from 'react';
import PropTypes from 'prop-types';
import ReviewItem from './reviews-item.jsx';
import ReviewsProp from './reviews.prop.js';

function ReviewList(props) {
  const {reviews} = props;

  return (
    <ul className="reviews__list">
      {reviews.map((review) => <ReviewItem review={review} key={review.id}/>)}
    </ul>
  );
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(ReviewsProp),
};

export default ReviewList;
