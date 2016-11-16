import React from 'react';
import SubredditSelector from './SubredditSelector';
import SubRedditsList from './SubRedditsList';
import PostList from './PostList';
import * as actionCreators from '../../actions/index';
import {subredditListAdd} from '../../actions/index';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import _ from 'underscore';

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.fetchHotReddit();
    this.state = {
      mergeSublist: [],
      hotList: [],
      lastUpdate: 0,
    };

    this.setUpScroll();
  }

  componentWillReceiveProps(nextProp) {
  }

  setUpScroll() {
    window.onscroll = function(ev) {
      if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
          if (this.state.lastUpdate === 0) {
            this.setState({
              lastUpdate: new Date().getTime(),
            });
            this.getLastPosts();
          }

          var now = new Date().getTime();
          if (now - this.state.lastUpdate > 3000) {
            this.getLastPosts();
            this.setState({
              lastUpdate: now,
            });
          }
      }
    }.bind(this);
  }

  getLastPosts() {
    $('#loader').removeClass('hide');
    var subreddits = this.props.state.subredditListPosts;
    subreddits.forEach((post) => {
      var query = post.name + '.json?after=' + post.posts.data.after;
      this.fetchSubreddit(query);
    });


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
        this.setState({
          mergeSublist: results.data.children,
          hotList: results.data.children,
        });
      },
      error: (err) => {
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
    $.ajax({
      url: 'http://localhost:3000/api/subreddit/' + subreddit,
      method: 'GET',
      success: (results) => {
        this.props.actions.subredditPostsAdd({
          name:subreddit.split('.')[0],
          posts: JSON.parse(results)
        });
        this.mergeSubreddits();
      },
      error: (err) => {
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
    this.fetchSubreddit(subreddit + '.json');
  }

  mergeSubreddits() {
    $('#loader').addClass('hide');
    var list = [];
    if (this.props.state.subredditListPosts.length===0) {
      list = this.state.hotList;
    }
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
    this.setState({
      mergeSublist: list
    });

  }
  render() {
    var subreddits = this.props.state.subredditList;
    return (
      <div className="container home">
        <h1>Welcome to the Subreddit Reader</h1>
        <SubredditSelector handleSubreddit={this.handleSubreddit.bind(this)}/>
        <SubRedditsList remerge={this.mergeSubreddits.bind(this)}/>
        <PostList posts={this.state.mergeSublist} subreddits={this.props.state.subredditList} />
        <div id='loader' className='container hide loader'></div>
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

