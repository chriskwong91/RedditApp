import React from 'react';

function SubRedditsListItem({subreddit, onClick}) {
  return (
    <div onClick={onClick}className="container about">
      <h1>{subreddit}</h1>
    </div>
  )
}

export default SubRedditsListItem;
