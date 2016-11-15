import { combineReducers } from 'redux';
impport { SUBREDDIT_INPUT} from '../actions/index';

const rootReducer = combineReducers({
  state: (state = {}) => state,
});

export default rootReducer;
