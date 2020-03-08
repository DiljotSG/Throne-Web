import actions from '../constants';

const initialState = { user: {} };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REQUEST_CURRENT_USER:
      return {
        ...state,
        isFetching: true,
      };
    case actions.REQUEST_USER:
      return {
        ...state,
        isFetching: true,
      };
    case actions.RECEIVE_CURRENT_USER:
      return {
        ...state,
        isFetching: false,
        status: action.status,
        user: action.user,
      };
    case actions.RECEIVE_USER:
      return {
        ...state,
        isFetching: false,
        status: action.status,
        user: action.user,
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

export default userReducer;
