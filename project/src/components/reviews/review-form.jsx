import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {valueRatings, FetchingStatus} from '../../const.js';
import {postGetComment} from '../../store/api-actions.js';
import {getFetchDataStatus} from '../../store/data/selectors.js';
import browserHistory from '../../browser-history.js';

function ReviewForm() {

  const dispatch = useDispatch();
  const fetchDataStatus = useSelector(getFetchDataStatus);

  const CURRENT_OFFER = browserHistory.location.pathname.replace(/\/offer[/]/, '');
  const MIN_LENGTH_TEXT = 50;
  const MAX_LENGTH_TEXT = 300;
  let blockedBtn = false;

  const formRef = useRef();
  const [comment, setComment] = useState('');
  const [rate, setRate] = useState('');
  const [blockedControl, setBlockedControl] = useState(false);

  const getReview = (review, rating) => {
    const note = {
      'comment': review,
      'rating': rating,
    };
    return note;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setBlockedControl(true);
    dispatch(postGetComment(CURRENT_OFFER, getReview(comment, rate)))
      .then(() => {
        formRef.current.reset();
        setComment('');
        setRate('');
        setBlockedControl(false);
      })
      .catch(() => setBlockedControl(false));
  };


  const handleFieldChange = (evt) => {
    setComment(evt.target.value);
  };

  const handleRatingChange = (evt) => {
    setRate(evt.target.value);
  };

  if (comment === '' || comment.split('').length < MIN_LENGTH_TEXT || rate === '' || fetchDataStatus !== FetchingStatus.IDLE) {
    blockedBtn = true;
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      data-testid="reviewForm"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" onClick={handleRatingChange}>
        {
          valueRatings.map((rating) => (
            <React.Fragment key={rating.id}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={rating.id}
                id={`${rating.id}-stars`}
                type="radio"
                disabled={blockedControl ? 'disabled' : ''}
              />
              <label htmlFor={`${rating.id}-stars`} className="reviews__rating-label form__rating-label" title={rating.title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          ))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFieldChange}
        value={comment}
        maxLength={MAX_LENGTH_TEXT}
        disabled={blockedControl ? 'disabled' : ''}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={blockedControl || blockedBtn ? 'disabled' : ''}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
