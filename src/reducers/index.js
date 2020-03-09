import { combineReducers } from 'redux';

import userReducer from './userReducer';
import washroomReducer from './washroomReducer';
import buildingReducer from './buildingReducer';

const rootReducer = combineReducers({
  userReducer,
  washroomReducer,
  buildingReducer,
});

export default rootReducer;
