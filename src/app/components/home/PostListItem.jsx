import React from 'react';

function SubRedditsListItem({post, index}) {
  return (
    <div className="container postlist row">
      <img className='col-md-2'src={post.data.thumbnail} />
      <div className='col-md-4'>
        <p>{index}</p>
        <p className='subreddit'>SubReddit: {post.data.subreddit}</p>
        <p>Score: {post.data.score}</p>
      </div>
      <div className='col-md-6'>
        <p>{post.data.title}</p>
        <p>by {post.data.author}</p>
        <div className='inline'>
          <a href={post.data.url} target="_blank">open original</a>
          <p>   </p>
          <a href={'https://reddit.com' + post.data.permalink} target="_blank">view comments</a>
        </div>
      </div>
    </div>
  )
}

export default SubRedditsListItem;
