// SubredditSelector
export const  SUBREDDIT_INPUT = 'SUBREDDIT_INPUT';


/********************
*** ACTIONS FOR SUBREDDIT
**********************/
export function subredditInput (text) {
  return { type: SUBREDDIT_INPUT, text};
}
