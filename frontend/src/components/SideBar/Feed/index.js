import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// stores
import { deleteFeed, editFeed } from '../../../store/feeds';

function FeedContainer({ isLoaded, feed }) {

  const [showEditFeed, setShowEditFeed] = useState(false);
  const [feedName, setFeedName] = useState('')

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
		e.preventDefault();
    setShowEditFeed(!showEditFeed)
    // TODO move edit into its own component
		const data = {
      // userId:sessionUser.id,
			userId:1,
      feedId:feed.id,
			name:feedName
		}
		let editedFeed = await dispatch(editFeed(data))
		if (editedFeed) return
	};

  return (
    <div>
      {!showEditFeed && (
        <div>{feed.name}</div>
      )}
      {showEditFeed && (
        <form onSubmit={handleSubmit} className='add_feed_form'>
          <input className='edit_feed_inputs' type="text" onChange={(e) => setFeedName(e.target.value)} placeholder='Type name' required />
        </form>
      )}
      <div className='delete_feed' onClick={ async (e) => {
          e.preventDefault();
          await dispatch(deleteFeed(feed.id))
        }}>Delete</div>
      <div onClick={() => {setShowEditFeed(!showEditFeed)}}>Edit</div>
    </div>
  );
}

export default FeedContainer;
