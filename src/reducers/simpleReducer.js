import GET_WASHROOMS from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
   case GET_WASHROOMS:
    return {
      ...state,
      locations: action.payload
    }
   default:
    return state
  }
}