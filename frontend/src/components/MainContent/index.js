import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// store
import {
  getUserArticles,
  updateUserArticles,
  cleanArticles,
} from "../../store/articles";

// components
import EntryBox from "./EntryBox";

import "./main_content.css";

function MainContent() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  let articles = useSelector((state) => Object.values(state.articles));
  // TODO change to order by savedAt if it is the read later view
  articles = articles.sort(function (a, b) {
    return new Date(b.Article.pubDate) - new Date(a.Article.pubDate);
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(cleanArticles());
      await dispatch(updateUserArticles(sessionUser.id));
      await dispatch(getUserArticles(sessionUser.id));
      await setIsLoaded(true);
    })();
  }, [dispatch, sessionUser]);

  // const markVisibleAsRead = async (e) => {
  //   e.preventDefault();
  //   console.log("PH Marked all as read");
  // };

  // TODO add article hover over effect

  // TODO make read articles grey

  return (
    <div className="main_content">
      <div className="content_container">
        {!isLoaded && <div className="loading_text">Loading Feeds...</div>}
        {isLoaded && !articles.length && (
          <div className="loading_text">There are no Articles to Show.</div>
        )}
        <div className="entry_list">
          {articles &&
            articles?.map((article) => (
              <EntryBox article={article} key={`article${article?.id}`} />
            ))}
        </div>
      </div>
      {/* TODO finish MARK ALL AS READ button*/}
      {/* {isLoaded && (
        <div className="mark_all_as_read" onClick={markVisibleAsRead}>
          MARK ALL AS READ
        </div>
      )} */}
    </div>
  );
}

export default MainContent;
