import React from 'react';
import SubredditSelector from './SubredditSelector';
import * as actionCreators from '../../actions/index';
import {subredditListAdd} from '../../actions/index';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hotReddits: {},
    };
    this.fetchHotReddit();
    console.log(props, 'home this.props');
  }

  componentWillReceiveProps(nextProp) {
    console.log(nextProp);
  }

  fetchHotReddit() {
    console.log('making request');
    $.ajax({
      url: 'http://localhost:3000/api/hot',
      method: 'GET',
      success: (results) => {
        var hotResults = JSON.parse(results);
        console.log('success', hotResults)
      },
      error: (err) => {
        console.log('there was an error', err);
      }
    });
  }

  /**
   * @name handleSubreddit
   * @desc Grabs the input from the input box when enter or add is clicked
   * @param none
   * @returns {nothing}
   */
  handleSubreddit() {
    var subreddit = this.props.state.subredditInput;
    this.props.actions.subredditListAdd(subreddit);
    this.props.actions.subredditInput('');
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
    state: {
      subredditInput: state.subredditInput,
      subredditList: state.subredditList
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

