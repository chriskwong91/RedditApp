import { combineReducers } from 'redux';
import { SUBREDDIT_INPUT} from '../actions/index';

// const rootReducer = combineReducers({
//   state: (state = {}) => state,
// });
function subredditInput (state = '', action) {
  switch(action.type) {
    case SUBREDDIT_INPUT:
      return action.text;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  state: (state = {}) => state,
});

export default rootReducer;
