import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// stores
import { saveArticle, unSaveArticle, setRead, setUnread } from '../../../store/articles';

import './ExpandedArticleView.css';

function ExpandedArticle({ article, timeSinceCreation, saved, read }) {

  const dispatch = useDispatch();

	const handleSave = async (e) => {
		e.preventDefault();
		await dispatch(saveArticle(article.id))
	};

  const handleUnSave = async (e) => {
		e.preventDefault();
		await dispatch(unSaveArticle(article.id))
	};

  const handleSetRead = async (e) => {
    e.preventDefault();
    await dispatch(setRead(article.id))
  };

	const handleSetUnread = async (e) => {
		e.preventDefault();
		await dispatch(setUnread(article.id))
	};

  useEffect(() => {
    (async () => {
      await dispatch(setRead(article.id))
    })();
  }, [dispatch, article]);

  return (
    <div className='expanded_article'>
      <div className='article article_title'>{article.title}</div>
      <div className='article_info'>
        <div className='article article_website_name'>{article.websiteName}</div>
        {saved && (<div onClick={handleUnSave}>Remove from Read Later</div>)}
        {!saved && (<div onClick={handleSave}>Read Later</div>)}
        <div className='article article_pub_date'>{timeSinceCreation}</div>
        {read && (<div onClick={handleSetUnread}>Keep Unread</div>)}
        {!read && (<div onClick={handleSetRead}>Mark as Read</div>)}
      </div>
      {article.image && <img className='expanded_article_image' src={article.image} alt="article" />}
      {!article.image && <img className='expanded_article_image' src={process.env.PUBLIC_URL + "/assets/placeholder_image.jpg"} alt="placeholder in case data is missing" />}
      <div className='article article_snippet'>{article.contentSnippet}</div>
      <a href={article.url} target="_blank" rel="noreferrer">
        <button className='article_link'>Visit Website</button>
      </a>
    </div>
  );
}

export default ExpandedArticle;
