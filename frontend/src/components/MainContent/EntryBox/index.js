import React from 'react';

function EntryBox({ article }) {

  return (
    <div className='single_article'>
      <div>{article?.Article.title}</div>
			<div>{article?.Article.creator}</div>
			<div>{article?.Article.pubDate}</div>
			<div>{article?.Article.contentSnippet}</div>
			<div>{article?.Article.creator}</div>
     <a href={article.Article?.url}>Article Link</a>
    </div>
  );
}

export default EntryBox;
