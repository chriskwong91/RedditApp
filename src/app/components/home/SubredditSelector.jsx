import React from 'react';
import {subredditInput} from '../../actions/index';
import {connect} from 'react-redux';

class SubredditSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.subredditInput === '') {
      this.refs.input.value = '';
    }
  }
  /**
   * @name handleChange
   * @desc updates the state of the subreddit input to add
   * @param event target
   * @returns {nothing}
   */
  handleChange(e) {
    if(e.keyCode === 13) {
      this.props.handleSubreddit();
    } else {
      this.props.dispatch(subredditInput(e.target.value));
    }
  }

  render() {
    return (
      <div className="container subredditselector">
          <input type="text" onKeyUp={this.handleChange.bind(this)} ref='input'></input>
          <button onClick={this.props.handleSubreddit}>Add SubReddit</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    subredditInput: state.subredditInput
  }
}
export default connect(mapStateToProps)(SubredditSelector);
