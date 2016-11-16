import React from 'react';

function SubRedditsListItem({subreddit, onClick}) {
  return (
    <div onClick={onClick} className="container about">
      <h4 className='col-md-3'>{subreddit}</h4>
    </div>
  )
}

export default SubRedditsListItem;
