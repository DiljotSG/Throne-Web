import actions from '../constants';

const initialState = { reviews: [] };

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_REVIEW:
      return {
        ...state,
        creatingReview: true,
      };
    case actions.RECEIVE_REVIEW:
      return {
        ...state,
        creatingReview: false,
        createStatus: action.status,
        reviews: [action.review, ...state.reviews],
      };
    case actions.REQUEST_REVIEWS_FOR_USER:
      return {
        ...state,
        isFetching: true,
      };
    case actions.REQUEST_REVIEWS_FOR_WASHROOM:
      return {
        ...state,
        isFetching: true,
      };
    case actions.RECEIVE_REVIEWS:
      return {
        ...state,
        isFetching: false,
        status: action.status,
        reviews: action.reviews.reverse(),
      };
    case actions.FAILURE: {
      return {
        ...state,
        isFetching: false,
        status: action.status,
      };
    }
    default:
      return state;
  }
};

export default reviewReducer;
