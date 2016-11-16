import React from 'react';
import PostListItem from './PostListItem';

function PostList({posts, subreddits}) {
  return (
    posts.length === 0 ?
    <div className='container loader posts'></div> :
    <div className="container posts">
      <div className='postitle'>
        <h2>You are viewing  {
          subreddits.length === 0 ? "Reddit's front page" :
          subreddits.reduce((acc, curr, index) => {
            if (!index) return acc += curr;
            return acc += ', ' + curr;
          },'the following subreddits: ')
        }</h2>
      </div>
      {posts.map((post, index) => {
        return <PostListItem post={post} index={index}/>
      })}
    </div>
  )
}

export default PostList;
