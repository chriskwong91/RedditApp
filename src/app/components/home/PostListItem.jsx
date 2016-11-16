import React from 'react';

function SubRedditsListItem({post, index}) {
  return (
    <div className="container postlist row">
      <img className='col-md-2'src={post.data.thumbnail} />
      <div className='col-md-4'>
        {index}
        <div>Score: {post.data.score}</div>
      </div>
      <div className='col-md-6'>
        <p>{post.data.title}</p>
        <p>by {post.data.author}</p>
        <a href={post.data.url} target="_blank">open in new tab</a>
      </div>
    </div>
  )
}

export default SubRedditsListItem;
