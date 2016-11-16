import React from 'react';
import SubredditSelector from './SubredditSelector';
import SubRedditsList from './SubRedditsList';
import * as actionCreators from '../../actions/index';
import {subredditListAdd} from '../../actions/index';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.fetchHotReddit();
    console.log(props, 'home this.props');
  }

  componentWillReceiveProps(nextProp) {
    console.log('next prop', nextProp);
  }

  /**
   * @name fetchHotReddit
   * @desc Initiall grabs the top reddit posts
   * @param none
   * @returns {nothing}
   */
  fetchHotReddit() {
    console.log('making request');
    $.ajax({
      url: 'http://localhost:3000/api/hot',
      method: 'GET',
      success: (results) => {
        this.props.actions.hotReddit(JSON.parse(results));
        console.log('success', this.props.state.hotReddit);
      },
      error: (err) => {
        console.log('there was an error', err);
      }
    });
  }

  /**
   * @name fetchSubreddit
   * @desc Initiall grabs the top reddit posts
   * @param none
   * @returns {nothing}
   */
  fetchSubreddit(subreddit) {
    console.log('making subreddit request');
    $.ajax({
      url: 'http://localhost:3000/api/subreddit/' + subreddit,
      method: 'GET',
      success: (results) => {
        this.props.actions.subredditPostsAdd({
          name:subreddit,
          posts: JSON.parse(results)
        });
        this.mergeSubreddits();
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
    this.fetchSubreddit(subreddit);
  }

  mergeSubreddits() {
    console.log('merging subs', this.props.state.subReddits)

  }
  render() {
    return (
      <div className="container home">
        <h1>Welcome to the Subreddit Reader</h1>
        <SubredditSelector handleSubreddit={this.handleSubreddit.bind(this)}/>
        <SubRedditsList />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    state: {
      subredditInput: state.subredditInput,
      subredditList: state.subredditList,
      hotReddit: state.hotReddit,
      subredditListPosts: state.subredditListPosts
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

