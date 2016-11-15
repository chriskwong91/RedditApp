import React from 'react';
import SubredditSelector from './SubredditSelector';
import {subredditInput} from '../../actions/index';
import {connect} from 'react-redux';

class Home extends React.Component{
  constructor(props) {
    super(props);
  }

  /**
   * @name handleSubreddit
   * @desc Grabs the input from the input box when enter or add is clicked
   * @param none
   * @returns {nothing}
   */
  handleSubreddit() {
    console.log('handling subreddit', this.props.subredditInput);
    var subreddit = this.props.subredditInput;
    this.props.dispatch(subredditInput(''));
  }
  render() {
    return (
      <div className="container home">
        <h1>Home page</h1>
        <SubredditSelector handleSubreddit={this.handleSubreddit.bind(this)}/>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    subredditInput: state.subredditInput
  }
}
export default connect(mapStateToProps)(Home);

