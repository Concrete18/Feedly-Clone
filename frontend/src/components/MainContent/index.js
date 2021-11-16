import React from 'react';
import { useSelector } from 'react-redux';

import './main_content.css';

function MainContent({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

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
