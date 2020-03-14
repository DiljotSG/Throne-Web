import actions from '../constants';

const initialState = { washroom: {}, washrooms: [] };

const washroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REQUEST_WASHROOMS:
      return {
        ...state,
        isFetching: true,
      };
    case actions.REQUEST_WASHROOM:
      return {
        ...state,
        isFetching: true,
      };
    case actions.REQUEST_WASHROOMS_FOR_BUILDING:
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
    case actions.RECEIVE_WASHROOMS_FOR_BUILDING:
      return {
        ...state,
        isFetching: false,
        status: action.status,
        buildingWashrooms: action.washrooms,
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
