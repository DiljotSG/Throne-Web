import actions from '../constants';

const initialState = { reviews: [] };

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
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
        reviews: action.reviews,
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