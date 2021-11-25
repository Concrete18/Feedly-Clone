import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// stores
import { getFeeds } from '../../../store/feeds';
import { getSourcesByUser } from '../../../store/sources';
// components
import SingleFeed from '../SingleFeed'

function FeedsComponent() {
  const sessionUser = useSelector(state => state.session.user);
  const feeds = useSelector(state => Object.values(state.feeds));

  const dispatch = useDispatch();

  useEffect(() => {
    const userId = sessionUser?.id
    dispatch(getFeeds(userId))
    dispatch(getSourcesByUser(userId))
  }, [dispatch])
  
  return (
    <>
      <div className='feeds_container'>
        {feeds && feeds?.map( feed => (
            <div className='feed_container' key={`feed${feed?.id}`}>
              <SingleFeed feed={feed}/>
            </div>
          ))}
      </div>
    </>
  );
}

export default FeedsComponent;
