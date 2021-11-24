import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// store
import { getUserArticles, updateUserArticles } from "../../store/articles";
// components
import EntryBox from './EntryBox'

import './main_content.css';

function MainContent() {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const articles = useSelector(state => Object.values(state.articles));

  useEffect(() => {
    dispatch(updateUserArticles(sessionUser.id));
    dispatch(getUserArticles(sessionUser.id));
  }, [sessionUser]);

  return (
    <div className='main_content'>
      <div className='content_container'>
          <div className='top_container'>
            <div>Articles</div>
            <div>Controls</div>
          </div>
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
