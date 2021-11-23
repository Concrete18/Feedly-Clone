import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// stores
import { deleteFeed, editFeed } from '../../../store/feeds';

function SingleFeed({ feed }) {
  const sessionUser = useSelector(state => state.session.user);

  const [showEditFeed, setShowEditFeed] = useState(false);
  const [feedName, setFeedName] = useState('')

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
		e.preventDefault();
    setShowEditFeed(!showEditFeed)
    // TODO move edit into its own component
		const data = {
      userId:sessionUser.id,
      id:feed.id,
			name:feedName
		}
		let editedFeed = await dispatch(editFeed(data))
		if (editedFeed) return
	};

  return (
    <div className='single_feed'>
      {!showEditFeed && (
        <div className='feed_name'>{feed.name}</div>
      )}
      {showEditFeed && (
        <form onSubmit={handleSubmit} className='add_feed_form'>
          <input className='edit_feed_inputs feed_name' type="text" onChange={(e) => setFeedName(e.target.value)} autoFocus defaultValue={feed.name} placeholder='Type name' required />
        </form>
      )}
      <div className='edit_delete_button' onClick={ async (e) => {
          e.preventDefault();
          await dispatch(deleteFeed(feed.id))
        }}>Delete</div>
      <div className='edit_delete_button' onClick={() => {setShowEditFeed(!showEditFeed)}}>Edit</div>
    </div>
  );
}

export default SingleFeed;
