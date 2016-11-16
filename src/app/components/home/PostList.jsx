import React from 'react';
import PostListItem from './PostListItem';

function PostList({posts}) {
  console.log('posts in postlist', posts);

  return (
    posts.length === 0 ?
    <div className='container loader posts'></div> :
    <div className="container posts">
      {posts.map((post, index) => {
        return <PostListItem post={post} index={index}/>
      })}
    </div>
  )
}

export default PostList;
