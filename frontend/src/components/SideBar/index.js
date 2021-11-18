import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// stores
import { getFeeds } from '../../store/feeds';

// components
import FeedsContainer from './Feeds'

import './side_bar.css';

function SideBar({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const feeds = useSelector(state => Object.values(state.feeds));

  const dispatch = useDispatch();

  useEffect(() => {
    const userId = sessionUser?.id
    // dispatch(getFeeds(userId))
    dispatch(getFeeds(1))
  }, [dispatch])

  return (
    <div className='side_bar'>
      <div>Read Later</div>
      <div>Feeds</div>
      <div>All</div>
        <FeedsContainer feeds={feeds}/>
    </div>
  );
}

export default SideBar;
