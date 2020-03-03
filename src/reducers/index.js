import { combineReducers } from 'redux';

import washroomReducer from './washroomReducer';

const rootReducer = combineReducers({
  washroomReducer,
});

export default rootReducer;
