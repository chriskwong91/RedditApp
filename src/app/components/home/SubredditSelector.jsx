import React from 'react';
import {subredditInput} from '../../actions/index';
import {connect} from 'react-redux';

function SubredditSelector(props) {

  /**
   * @name handleChange
   * @desc updates the state of the subreddit input to add
   * @param event target
   * @returns {nothing}
   */
  function handleChange(e) {
    props.dispatch(subredditInput(e.target.value));
  }

  return (
    <div className="container subredditselector">
        <input type="text" onChange={handleChange}></input>
        <button>Add</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    subredditInput: state.subredditInput
  }
}
export default connect(mapStateToProps)(SubredditSelector);
