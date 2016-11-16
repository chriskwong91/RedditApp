import React from 'react';
import SubredditSelector from './SubredditSelector';
import SubRedditsList from './SubRedditsList';
import PostList from './PostList';
import * as actionCreators from '../../actions/index';
import {subredditListAdd} from '../../actions/index';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.fetchHotReddit();
    this.state = {
      mergeSublist: [],
      hotList: [],
    };
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
    $.ajax({
      url: 'http://localhost:3000/api/hot',
      method: 'GET',
      success: (results) => {
        var results = JSON.parse(results);
        this.props.actions.hotReddit(results);
        console.log(results);
        this.setState({
          mergeSublist: results.data.children,
          hotList: results.data.children,
        });
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
    this.setState({
      mergeSublist: []
    });
    var subreddit = this.props.state.subredditInput;
    this.props.actions.subredditListAdd(subreddit);
    this.props.actions.subredditInput('');
    this.fetchSubreddit(subreddit);
  }

  mergeSubreddits() {
    console.log(this.props);
    var list = [];
    if (this.props.state.subredditListPosts.length===0) {
      list = this.state.hotList;
    }
    console.log('merging subs', this.props.state.subredditListPosts);
    this.props.state.subredditListPosts.forEach((post) => {
      list = list.concat(post.posts.data.children);
    });

    list.sort((a,b) =>{
      if (a.data.score < b.data.score) {
        return 1;
      }
      if (a.data.score > b.data.score) {
        return -1;
      }
      return 0;
    });
    console.log(list, 'list after merging');
    this.setState({
      mergeSublist: list
    });

    console.log('current state', this.state);
  }
  render() {
    return (
      <div className="container home">
        <h1>Welcome to the Subreddit Reader</h1>
        <SubredditSelector handleSubreddit={this.handleSubreddit.bind(this)}/>
        <SubRedditsList remerge={this.mergeSubreddits.bind(this)}/>
        <PostList posts={this.state.mergeSublist} />
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

