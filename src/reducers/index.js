import { combineReducers } from 'redux';

import userReducer from './userReducer';
import washroomReducer from './washroomReducer';
import buildingReducer from './buildingReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
  userReducer,
  washroomReducer,
  buildingReducer,
  reviewReducer,
});

export default rootReducer;
