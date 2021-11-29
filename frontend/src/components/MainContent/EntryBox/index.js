import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';

// components
import ExpandedArticle from '../ExpandedArticleView'


function EntryBox({ article }) {
	const [showModal, setShowModal] = useState(false);
	
  return (
		<>
			{showModal && (
			<Modal onClose={() => setShowModal(false)}>
					<ExpandedArticle article={article} />
			</Modal>
			)}
			<div className='single_article' onClick={() => setShowModal(true)}>
				{article.Article.image && <img className='article_image' src={article?.Article.image} alt="article image" />}
				{!article.Article.image && <img className='article_image' src={process.env.PUBLIC_URL + "/assets/placeholder_image.jpg"} alt="placeholder image" />}
				<div className='article article_title'>{article?.Article.title}</div>
				<div className='article article_website_name'>{article?.Article.websiteName}</div>
				<div className='article article_snippet'>{article?.Article.contentSnippet}</div>
				{/* <a className='article_link' href={article?.Article?.url}>Visit Website</a> */}
			</div>
		</>
  );
}

export default EntryBox;
