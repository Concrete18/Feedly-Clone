import React, { useState } from "react";
import { Modal } from "../../../context/Modal";

// components
import ExpandedArticle from "../ExpandedArticleView";

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

  const timeSinceCreation = timeSince(new Date(article?.Article.pubDate));

  // read later status on article view
  let readLater = (
    <>
      <span className="saved_to_read ">Read Later</span>
      <span className="dot_divider">•</span>
    </>
  );
  // sets up metadata
  let entryMetaData = (
    <>
      {article.saved ? readLater : ""}
      <span>
        {article?.Article.websiteName} / {timeSinceCreation}
      </span>
    </>
  );

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ExpandedArticle
            article={article.Article}
            saved={article.saved}
            read={article.read}
          />
        </Modal>
      )}
      <div className="single_article" onClick={() => setShowModal(true)}>
        {article.Article.image && (
          <img
            className="article_image"
            src={article?.Article.image}
            alt="article"
          />
        )}
        {!article.Article.image && (
          <img
            className="article_image"
            src={process.env.PUBLIC_URL + "/assets/placeholder_image.jpg"}
            alt="placeholder in case data is missing"
          />
        )}
        <div className="article article_title">{article?.Article.title}</div>
        <div className="article entry_metadata">{entryMetaData}</div>
        <div className="article article_snippet">
          {article?.Article.contentSnippet}
        </div>
      </div>
    </>
  );
}

export default EntryBox;
