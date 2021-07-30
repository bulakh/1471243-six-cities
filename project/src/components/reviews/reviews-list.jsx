import React from 'react';
import {useSelector} from 'react-redux';
import ReviewsItem from './reviews-item.jsx';
import {FetchingStatus} from '../../const.js';
import {getOffer, getFetchDataStatus} from '../../store/data/selectors.js';

function ReviewsList() {
  const offer = useSelector(getOffer);
  const fetchDataStatus = useSelector(getFetchDataStatus);

  const reviews = offer.comments;

  return (
    <>
      <ul
        className="reviews__list"
        data-testid="reviewList"
      >
        {reviews.map((review) => <ReviewsItem review={review} key={review.id}/>)}
      </ul>
      {FetchingStatus.FETCHING_PART === fetchDataStatus &&
      <p>Loading...</p>}
    </>
  );
}

export default ReviewsList;
