// SubredditSelector
export const  SUBREDDIT_INPUT = 'SUBREDDIT_INPUT';
export const SUBREDDIT_LIST_ADD = 'SUBREDDIT_LIST_ADD';
export const HOTREDDIT = 'HOTREDDIT';


/********************
*** ACTIONS FOR SUBREDDIT
**********************/
export function subredditInput (text) {
  return { type: SUBREDDIT_INPUT, text};
}

export function subredditListAdd (text) {
  return { type: SUBREDDIT_LIST_ADD,
    text};
}

export function hotReddit (obj) {
  return { type: HOTREDDIT,
    obj};
}
