import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// stores
import { getFeeds, addFeed } from '../../store/feeds';

// components
import FeedsContainer from './Feeds'

import './side_bar.css';

function SideBar({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const feeds = useSelector(state => Object.values(state.feeds));

  // useStates
  const [showAddFeed, setShowAddFeed] = useState(false);
  const [feedName, setFeedName] = useState('')

  const dispatch = useDispatch();

  useEffect(() => {
    const userId = sessionUser?.id
    // dispatch(getFeeds(userId))
    dispatch(getFeeds(1))
  }, [dispatch])

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
      // ownerId:sessionUser.id,
			ownerId:1,
			name:feedName
		}
		let createdFeed = await dispatch(addFeed(data))
		if (createdFeed) return
	};

  return (
    <div className='side_bar'>
      <div>Read Later</div>
      <div>Feeds</div>
      <div>All</div>
      <FeedsContainer feeds={feeds}/>
      <div onClick={() => {setShowAddFeed(!showAddFeed)}}>Create New Feed</div>
      {showAddFeed && (
        <form onSubmit={handleSubmit} className='add_feed_form'>
          <div className='add_feed_inputs'>
            <label>Feed Name
              <input type="text" onChange={(e) => setFeedName(e.target.value)} defaultValue={feedName} placeholder='Type name' required />
            </label>
          </div>
          <div className='add_feed_button'>
            <button className='button' type="submit">Upload</button>
          </div>
        </form>
			)}
    </div>
  );
}

export default SideBar;
