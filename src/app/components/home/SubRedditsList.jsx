import React from 'react';
import {connect} from 'react-redux';
import {subredditPostsDel, subredditListDel} from '../../actions/index';
import SubRedditsListItem from './SubRedditsListItem';
import {bindActionCreators } from 'redux';

class SubRedditsList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, 'subreditlist')
    this.state = {
      list: [],
    };
  }
  componentWillReceiveProps(nextProp) {
    this.setState({
      list: nextProp.subredditList,
    });
  }

  handleClick(e) {
    var subreddit = e.target.innerText;
    var list = this.state.list;
    list.splice(list.indexOf(subreddit), 1);
    this.setState({list});
    this.props.removeSubredditPosts(subreddit);
    this.props.removeSubredditListItem(subreddit);
  }
  render() {
    return (
      <div className="container about">
        <h1>Your SubReddits(click on title to remove subreddit)</h1>
        {this.state.list.map((sublist) => {
          return <SubRedditsListItem subreddit={sublist} onClick={this.handleClick.bind(this)}/>
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    subredditList: state.subredditList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeSubredditPosts: bindActionCreators(subredditPostsDel, dispatch),
    removeSubredditListItem: bindActionCreators(subredditListDel, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubRedditsList);
