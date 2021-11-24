import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// stores
import { getFeeds, addFeed } from '../../store/feeds';
import { getSourcesByUser } from '../../store/sources';

// components
import SingleFeed from './Feed'
import SingleSource from './Sources'
import AddSource from './AddSource';

import './side_bar.css';

function SideBar({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const feeds = useSelector(state => Object.values(state.feeds));
  const sources = useSelector(state => Object.values(state.sources));

  // useStates
  const [showAddFeed, setShowAddFeed] = useState(false);
  const [feedName, setFeedName] = useState('')

  const dispatch = useDispatch();

  useEffect(() => {
    const userId = sessionUser?.id
    dispatch(getFeeds(userId))
    dispatch(getSourcesByUser(userId))
  }, [dispatch])

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
      userId:sessionUser.id,
			name:feedName
		};
    setShowAddFeed(!showAddFeed);
		let createdFeed = await dispatch(addFeed(data));
		if (createdFeed) return;
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
              {/* maps out the sources */}
              {sources && sources.filter(source => source.feedId === feed?.id)?.map( source => (
                <div key={`sources${source?.id}`} >
                  <SingleSource source={source} />
                </div>
              ))}
              {/* shows text saying now sources exist */}
              {!sources.filter(source => source.feedId === feed.id).length && (
                <div>No sources exist</div>
              )}
              <AddSource feedId={feed.id} userId={sessionUser?.id}/>
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
          <button className='button add_feed_button' type="submit">Add Feed</button>
        </form>
			)}
    </div>
  );
}

export default SideBar;
