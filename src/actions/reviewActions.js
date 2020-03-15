import actions from '../constants';

import throneApi from '../api/throneApi';
import { failure } from '.';

export function createReviewAction() {
  return {
    type: actions.CREATE_REVIEW,
  };
}

export function receiveReview(response, status) {
  return {
    type: actions.RECEIVE_REVIEW,
    review: response,
    status,
  };
}

export function requestReviewsForWashroom() {
  return {
    type: actions.REQUEST_REVIEWS_FOR_WASHROOM,
  };
}

export function requestReviewsForUser() {
  return {
    type: actions.REQUEST_REVIEWS_FOR_USER,
  };
}

export const receiveReviews = (response, status) => (
  {
    type: actions.RECEIVE_REVIEWS,
    reviews: response,
    status,
  }
);

export function getReviewsForUser(id) {
  return async function fetchReviewsAsync(dispatch) {
    dispatch(requestReviewsForUser());

    return throneApi.getReviewsForUser(id).then((response) => {
      if (response.ok) {
        response.json().then((reviews) => {
          dispatch(receiveReviews(reviews, response.status));
        });
      } else {
        dispatch(failure(response.status));
      }
    }).catch((error) => {
      dispatch(failure());
      throw (error);
    });
  };
}

export function getReviewsForWashroom(id) {
  return async function fetchReviewsAsync(dispatch) {
    dispatch(requestReviewsForUser());

    return throneApi.getReviewsForWashroom(id).then((response) => {
      if (response.ok) {
        response.json().then((reviews) => {
          dispatch(receiveReviews(reviews, response.status));
        });
      } else {
        dispatch(failure(response.status));
      }
    }).catch((error) => {
      dispatch(failure());
      throw (error);
    });
  };
}

export function createReview(washroomId, review) {
  return async function createReviewAsync(dispatch) {
    dispatch(createReviewAction());

    return throneApi.createReview(washroomId, review).then((response) => {
      if (response.ok) {
        response.json().then((createdReview) => {
          dispatch(receiveReview(createdReview, response.status));
        });
      } else {
        dispatch(failure(response.status));
      }
    }).catch((error) => {
      dispatch(failure());
      throw (error);
    });
  };
}
