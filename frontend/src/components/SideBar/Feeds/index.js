import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// stores
import { deleteFeed, editFeed } from '../../../store/feeds';

// components
import SourceContainer from '../Sources'

function FeedsContainer({ isLoaded, feeds }) {

  const [showEditFeed, setShowEditFeed] = useState(false);
  const [feedName, setFeedName] = useState('')

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
		e.preventDefault();
    setShowEditFeed(!showEditFeed)
		const data = {
      // ownerId:sessionUser.id,
			ownerId:1,
			name:feedName
		}
		let editedFeed = await dispatch(editFeed(data))
		if (editedFeed) return
	};

  return (
    <div className='feeds_container'>
      {feeds && feeds?.map( feed => (
          <div className='feed_container' key={`feed${feed?.id}`}>
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
            <div className='source_container'>
              <SourceContainer sources={feed.Sources} />
            </div>
          </div>
        ))}
    </div>
  );
}

export default FeedsContainer;
