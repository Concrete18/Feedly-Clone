import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// store
import { getAllArticles, updateUserArticles } from "../../store/articles";


import './main_content.css';

function MainContent({ isLoaded }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  // const articles = useSelector(state => state.articles);

  // let sessionLinks;
  // if (sessionUser) {
//   sessionLinks = (
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
    // dispatch(getAllArticles(sessionUser.id));
  }, [sessionUser]);

  return (
    <div className='main_content'>
      <div className='content_container'>
        <div className='top_container'>
          <div>Feed Name</div>
          <div>Controls</div>
        </div>
        <div className='entry_list'>

        </div>
      </div>
    </div>
  );
}

export default MainContent;
