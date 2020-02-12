import GET_WASHROOMS from '../constants';

const washroomReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_WASHROOMS:
      return {
        ...state,
        isFetching: true,
        washrooms: action.payload,
      };
    default:
      return state;
  }
};

export default washroomReducer;
