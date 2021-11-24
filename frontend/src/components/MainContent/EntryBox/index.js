import React from 'react';

function EntryBox({ article }) {
  
  return (
    <div className='single_article'>
      {/* <img className='article_image' src={article?.Article.image} alt="article image" /> */}
      <img className='article_image' src={'https://lh3.googleusercontent.com/pxhHGOmNW3SBevC2cHbBQungaguCalKqDmZwsPOSR_dPWc_iw_7HPbNZ2avZAuztx5KWbrjkoCTRFj-WJJmAKUTZ9KA0mw4vz8-VWnc=s324'} alt="article image" />
      <div className='article article_title'>{article?.Article.title}</div>
			<div className='article article_snippet'>{article?.Article.contentSnippet}</div>
      {/* <a className='article_link' href={article?.Article?.url}>Visit Website</a> */}
    </div>
  );
}

export default EntryBox;