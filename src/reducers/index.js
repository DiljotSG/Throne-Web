import { combineReducers } from 'redux';

import washroomReducer from './washroomReducer';
import washroomsReducer from './washroomsReducer';

const rootReducer = combineReducers({
  washroomReducer,
  washroomsReducer,
});

export default rootReducer;
