import { combineReducers } from 'redux';
import { SUBREDDIT_INPUT, SUBREDDIT_LIST_ADD, HOTREDDIT} from '../actions/index';

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

function subredditList(state = [], action) {
  switch(action.type) {
    case  SUBREDDIT_LIST_ADD:
      return [
      ...state,
      action.text];
      default:
        return state;
  }
}

function hotReddit(state = {}, action) {
  switch(action.type) {
    case  HOTREDDIT:
      return action.obj;
      default:
        return state;
  }
}

const rootReducer = combineReducers({
  subredditInput,
  subredditList,
  hotReddit
});

export default rootReducer;
