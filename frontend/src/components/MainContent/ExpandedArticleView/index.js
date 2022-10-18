import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// stores
import {
  saveArticle,
  unSaveArticle,
  setRead,
  setUnread,
} from "../../../store/articles";

import "./ExpandedArticleView.css";

function ExpandedArticle({ article, timeSinceCreation, saved, read }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const handleSave = async (e) => {
    e.preventDefault();
    await dispatch(saveArticle(article.id, sessionUser.id));
  };

  const handleUnSave = async (e) => {
    e.preventDefault();
    await dispatch(unSaveArticle(article.id, sessionUser.id));
  };

  const handleSetRead = async (e) => {
    e.preventDefault();
    await dispatch(setRead(article.id, sessionUser.id));
  };

  const handleSetUnread = async (e) => {
    e.preventDefault();
    await dispatch(setUnread(article.id, sessionUser.id));
  };

  useEffect(() => {
    (async () => {
      await dispatch(setRead(article.id, sessionUser.id));
    })();
  }, [dispatch, article.id, sessionUser.id]);

  let articleContent;
  if (article.content.includes("<")) {
    articleContent = article.contentSnippet;
  } else {
    articleContent = article.content;
  }

  return (
    <div className="expanded_article">
      <div className="article article_title">{article.title}</div>
      <div className="article_info">
        <div className="article article_website_name article_entry">
          {article.websiteName}
        </div>
        <div className="article_entry"> | </div>
        <div className="article_pub_date article_entry">
          {timeSinceCreation}
        </div>
        <div className="article_entry"> || </div>
        {read && (
          <div
            className="article_entry article_button"
            onClick={handleSetUnread}
          >
            Keep Unread
          </div>
        )}
        {!read && (
          <div className="article_entry article_button" onClick={handleSetRead}>
            Mark as Read
          </div>
        )}
        <div className="article_entry"> || </div>
        {saved && (
          <div className="article_entry article_button" onClick={handleUnSave}>
            Remove from Read Later
          </div>
        )}
        {!saved && (
          <div className="article_entry article_button" onClick={handleSave}>
            Read Later
          </div>
        )}
      </div>
      {article.image && (
        <img
          className="expanded_article_image"
          src={article.image}
          alt="article"
        />
      )}
      {!article.image && (
        <img
          className="expanded_article_image"
          src={process.env.PUBLIC_URL + "/assets/placeholder_image.jpg"}
          alt="placeholder in case data is missing"
        />
      )}
      <div className="article article_content">{articleContent}</div>
      <a href={article.url} target="_blank" rel="noreferrer">
        <button className="article_link">Visit Website</button>
      </a>
    </div>
  );
}

export default ExpandedArticle;
