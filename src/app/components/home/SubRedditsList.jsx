import React from 'react';
import {connect} from 'react-redux';
import SubRedditsListItem from './SubRedditsListItem';

class SubRedditsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  componentWillReceiveProps(nextProp) {
    this.setState({
      list: nextProp.subredditList,
    });
  }
  render() {
    return (
      <div className="container about">
        <h1>Your SubReddits</h1>
        {this.state.list.map((sublist) => {
          return <SubRedditsListItem subreddit={sublist}/>
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
export default connect(mapStateToProps)(SubRedditsList);
