import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// store
import { getUserArticles, updateUserArticles } from "../../store/articles";
// components
import EntryBox from './EntryBox'

import './main_content.css';

function MainContent({ isLoaded }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const articles = useSelector(state => Object.values(state.articles));

  // let sessionLinks;
  // if (sessionUser) {
  // sessionLinks = (
  //     <ProfileButton user={sessionUser} />
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <NavLink to="/signup">Sign Up</NavLink>
  //     </>
  //   );
  // }

  useEffect(() => {
    dispatch(updateUserArticles(sessionUser.id));
    dispatch(getUserArticles(sessionUser.id));
  }, [sessionUser]);

  function getArticle(object) {
    return Object.Article
  }

  return (
    <div className='main_content'>
      <div className='content_container'>
        <div className='top_container'>
          <div>Feed Name</div>
          <div>Controls</div>
        </div>
        <div className='entry_list'>
          {articles && articles?.map( article => (
            <div className='article_container' key={`article${article?.id}`}>
              <EntryBox article={article}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainContent;
