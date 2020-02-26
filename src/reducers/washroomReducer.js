import actions from '../constants';

const initialState = { washrooms: [] };

const washroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REQUEST_WASHROOMS:
      return {
        ...state,
        isFetching: true,
      };
    case actions.RECEIVE_WASHROOMS:
      return {
        ...state,
        isFetching: false,
        status: action.status,
        washrooms: action.washrooms,
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

export default washroomReducer;
