// SubredditSelector
export const  SUBREDDIT_INPUT = 'SUBBREDDIT_INPUT';


/********************
*** ACTIONS FOR SUBREDDIT
**********************/
export function subreeditInput (text) {
  return { type: SUBREDDIT_INPUT, text};
}
