import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// stores
import {
  saveArticle,
  unSaveArticle,
  setRead,
  setUnread,
} from "../../../store/articles";

import "./ExpandedArticleView.css";

function ExpandedArticle({ article, saved, read }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [isSaved, setAsSaved] = useState(saved);
  const [isRead, setAsRead] = useState(true);

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

  // sets up entry metadata
  const saveButtonAction = async (e) => {
    e.preventDefault();
    if (isSaved) {
      await dispatch(unSaveArticle(article.id, sessionUser.id));
      await setAsSaved(false);
    } else {
      await dispatch(saveArticle(article.id, sessionUser.id));
      await setAsSaved(true);
    }
  };

  const readButtonAction = async (e) => {
    e.preventDefault();
    if (isRead) {
      await dispatch(setUnread(article.id, sessionUser.id));
      await setAsRead(false);
    } else {
      await dispatch(setRead(article.id, sessionUser.id));
      await setAsRead(true);
    }
  };

  // mark as read button
  let readButton = (
    <div className="article_button" onClick={readButtonAction}>
      {isRead ? "Keep Unread " : "Mark as Read "}
    </div>
  );

  // saving button
  let saveButton = (
    <div className="article_button" onClick={saveButtonAction}>
      {!isSaved ? "Save" : "Unsave"}
    </div>
  );

  // TODO set datetime to this format: October 19, 2022 at 01:05AM
  let formattedDate = new Date(article.pubDate).toLocaleString();
  let entryMetaData = (
    <div className="entry_metadata">
      {`${article.websiteName} / ${formattedDate}`}
      <span className="metadata_divider">{"//"}</span>
      {readButton}
      <span className="metadata_divider">//</span>
      {saveButton}
    </div>
  );

  return (
    <div className="expanded_article">
      <div className="article expanded_article_title">{article.title}</div>
      {entryMetaData}
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
      <div className="article expanded_article_content">{articleContent}</div>
      <a href={article.url} target="_blank" rel="noreferrer">
        <button className="article_link">Visit Website</button>
      </a>
    </div>
  );
}

export default ExpandedArticle;
