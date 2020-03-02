import actions from '../constants';

const initialState = { buildings: [] };

const buildingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REQUEST_BUILDINGS:
      return {
        ...state,
        isFetching: true,
      };
    case actions.RECEIVE_BUILDINGS:
      return {
        ...state,
        isFetching: false,
        status: action.status,
        buildings: action.buildings,
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

export default buildingReducer;
