import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';

// components
import ExpandedArticle from '../ExpandedArticleView'

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "mo";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "min";
  }
  return Math.floor(seconds) + "s";
}

function EntryBox({ article }) {
	const [showModal, setShowModal] = useState(false);

	const timeSinceCreation = timeSince(new Date(article?.Article.pubDate))
  
  return (
		<>
			{showModal && (
			<Modal onClose={() => setShowModal(false)}>
					<ExpandedArticle article={article.Article} timeSinceCreation={timeSinceCreation} saved={article.saved} read={article.read}/>
			</Modal>
			)}
			<div className='single_article' onClick={() => setShowModal(true)}>
				{article.Article.image && <img className='article_image' src={article?.Article.image} alt="article" />}
				{!article.Article.image && <img className='article_image' src={process.env.PUBLIC_URL + "/assets/placeholder_image.jpg"} alt="placeholder in case data is missing" />}
				<div className='article article_title'>{article?.Article.title}</div>
				<div className='article article_pub_date'>{timeSinceCreation}</div>
        <div className='article article_website_name'>{article?.Article.websiteName}</div>
				<div className='article article_snippet'>{article?.Article.contentSnippet}</div>
			</div>
		</>
  );
}

export default EntryBox;
