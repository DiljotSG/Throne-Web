import { combineReducers } from 'redux';

import washroomReducer from './washroomReducer';
import buildingReducer from './buildingReducer';

const rootReducer = combineReducers({
  washroomReducer,
  buildingReducer,
});

export default rootReducer;
