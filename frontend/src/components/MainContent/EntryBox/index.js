import React from 'react';

// import placeholder_image from '../../../../public/placeholder_image.jpg'

function EntryBox({ article }) {

  return (
    <div className='single_article'>
      {article.Article.image && <img className='article_image' src={article?.Article.image} alt="article image" />}
      {!article.Article.image && <img className='article_image' src={process.env.PUBLIC_URL + "/assets/placeholder_image.jpg"} alt="placeholder image" />}
      <div className='article article_title'>{article?.Article.title}</div>
			<div className='article article_snippet'>{article?.Article.contentSnippet}</div>
      {/* <a className='article_link' href={article?.Article?.url}>Visit Website</a> */}
    </div>
  );
}

export default EntryBox;
