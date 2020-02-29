import actions from '../constants';

const initialState = { washroom: {} };

const washroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REQUEST_WASHROOM:
      return {
        ...state,
        isFetching: true,
      };
    case actions.RECEIVE_WASHROOM:
      return {
        ...state,
        isFetching: false,
        status: action.status,
        washroom: action.washroom,
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
