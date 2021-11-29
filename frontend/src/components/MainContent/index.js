import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

// store
import { getUserArticles, updateUserArticles } from "../../store/articles";
// components
import EntryBox from './EntryBox'

import './main_content.css';

function MainContent() {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const articles = useSelector(state => Object.values(state.articles));

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(updateUserArticles(sessionUser.id));
      await setIsLoaded(true);
      await dispatch(getUserArticles(sessionUser.id));
    })();
  }, [sessionUser]);

  return (
    <div className='main_content'>
      <div className='content_container'>
        {/* <div className='top_container'>
          <div>Articles</div>
          <div>Controls</div>
        </div> */}
        {!isLoaded && (
          <div className='loading_text'>Loading Articles</div>
        )}
        <div className='entry_list'>
          {articles && articles?.map( article => (
            <EntryBox article={article} key={`article${article?.id}`}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainContent;
