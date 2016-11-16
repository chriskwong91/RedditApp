import { combineReducers } from 'redux';
import { SUBREDDIT_INPUT, SUBREDDIT_LIST_ADD, HOTREDDIT,
          SUBREDDIT_POSTS_ADD, SUBREDDIT_POSTS_DEL, SUBREDDIT_LIST_DEL
        } from '../actions/index';

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
    case  SUBREDDIT_LIST_DEL:
      var subreddits = state;
      var index;
      state.forEach((subreddit, i) => {
        if (action.text === subreddit) {
          index = i;
        }
      });
      if (index === undefined) {
        return state;
      }
      subreddits.splice(index, 1);
      return subreddits;
    default:
      return state;
  }
}

function subredditListPosts(state = [], action) {
  switch(action.type) {
    case  SUBREDDIT_POSTS_ADD:
      return [
      ...state,
      action.obj];
    case SUBREDDIT_POSTS_DEL:
      var subreddits = state;
      var index;
      state.forEach((subreddit, i) => {
        if (action.text === subreddit.name) {
          index = i;
        }
      });
      if (index === undefined) {
        return state;
      }
      subreddits.splice(index, 1);
      return subreddits;
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
  hotReddit,
  subredditListPosts
});

export default rootReducer;
