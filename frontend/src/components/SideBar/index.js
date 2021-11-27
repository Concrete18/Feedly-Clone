import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// stores
import { addFeed } from '../../store/feeds';

// components
import FeedsComponent from './FeedsComponent'

import './side_bar.css';

function SideBar(){
  const sessionUser = useSelector(state => state.session.user);

  const [showAddFeed, setShowAddFeed] = useState(false);
  const [feedName, setFeedName] = useState('')

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
		e.preventDefault();
    setShowAddFeed(!showAddFeed)
		const data = {
      userId:sessionUser.id,
			name:feedName
		}
		let addedFeed = await dispatch(addFeed(data))
		if (addedFeed) return
	};

	return (
    <div className='side_bar'>
      <div>Feeds</div>
      <div className='all_feeds_button text_button'>All</div>
      <FeedsComponent/>
      <div className='create_feed_button text_button' onClick={() => {setShowAddFeed(!showAddFeed)}}>Create New Feed</div>
      {showAddFeed && (
        <form onSubmit={handleSubmit} className='add_feed_form'>
          <div className='add_feed_inputs'>
            <label>Feed Name
              <input type="text" onChange={(e) => setFeedName(e.target.value)} autoFocus placeholder='Type name' required />
            </label>
          </div>
          <button className='button add_feed_button' type="submit">Add Feed</button>
        </form>
      )}
    </div>
  );
}

export default SideBar;
