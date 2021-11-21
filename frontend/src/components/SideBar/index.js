import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// stores
import { getFeeds, addFeed } from '../../store/feeds';

// components
import SingleFeed from './Feed'
import SourceContainer from './Sources'

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
    dispatch(getFeeds(userId))
  }, [dispatch])

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
      userId:sessionUser.id,
			name:feedName
		}
    setShowAddFeed(!showAddFeed)
		let createdFeed = await dispatch(addFeed(data))
		if (createdFeed) return
	};

  return (
    <div className='side_bar'>
      <div>Read Later</div>
      <div>Feeds</div>
      <div>All</div>

      <div className='feeds_container'>
      {feeds && feeds?.map( feed => (
          <div className='feed_container' key={`feed${feed?.id}`}>
      
            <SingleFeed feed={feed}/>

            <div className='source_container'>
            {/* {showWhatever && ( */}
              <SourceContainer sources={feed.Sources} />
            {/* )} */}
            </div>
          </div>
        ))}
      </div>

      <div onClick={() => {setShowAddFeed(!showAddFeed)}}>Create New Feed</div>
      {showAddFeed && (
        <form onSubmit={handleSubmit} className='add_feed_form'>
          <div className='add_feed_inputs'>
            <label>Feed Name
              <input type="text" onChange={(e) => setFeedName(e.target.value)} autoFocus placeholder='Type name' required />
            </label>
          </div>
          <div className='add_feed_button'>
            <button className='button' type="submit">Add Feed</button>
          </div>
        </form>
			)}
    </div>
  );
}

export default SideBar;
