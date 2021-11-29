import React from 'react';

import './ExpandedArticleView.css';

function ExpandedArticle({ article }) {

	// const handleSave = async (e) => {
	// 	e.preventDefault();
	// 	// let editedFeed = await dispatch(editFeed(data))
	// };

	// const handleSetUnread = async (e) => {
	// 	e.preventDefault();
	// 	// let editedFeed = await dispatch(editFeed(data))
	// };

  return (
    <div className='expanded_article'>
      <div className='article article_title'>{article?.Article.title}</div>
      <div>
        <div className='article article_website_name'>{article?.Article.websiteName}</div>
        {/* <div onChange={handleSave}>Read Later</div> */}
        {/* <div onChange={handleSetUnread}>Keep Unread</div> */}
      </div>
      {article.Article.image && <img className='article_image' src={article?.Article.image} alt="article" />}
      {!article.Article.image && <img className='article_image' src={process.env.PUBLIC_URL + "/assets/placeholder_image.jpg"} alt="placeholder in case data is missing" />}
      <div className='article article_snippet'>{article?.Article.contentSnippet}</div>
      <a href={article?.Article?.url} target="_blank" rel="noreferrer">
        <button className='article_link'>Visit Website</button>
      </a>
    </div>
  );
}

export default ExpandedArticle;
