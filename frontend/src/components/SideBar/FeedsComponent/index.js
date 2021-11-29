import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// stores
import { getFeeds } from '../../../store/feeds';
import { getSourcesByUser } from '../../../store/sources';
import { getUserArticles } from '../../../store/articles';
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

  const showAll = async (e) => {
    e.preventDefault();
    await dispatch(getUserArticles(sessionUser.id))
	};
  
  return (
    <>
      <div className='feeds_container'>
				<div className='feed_name all_feeds_button side_bar_text_button single_feed' onClick={showAll}>
					<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="side_bar_icon"><g fill="currentColor" fill-rule="nonzero"><path d="M16.429 15.929a.5.5 0 01.09.992l-.09.008H3.57a.5.5 0 01-.09-.992l.09-.008H16.43zM7.857 2.357H4.286c-.67 0-1.215.544-1.215 1.214v3.572c0 .67.544 1.214 1.215 1.214h3.571c.67 0 1.214-.544 1.214-1.214V3.57c0-.67-.543-1.214-1.214-1.214zm-3.571 1h3.571c.118 0 .214.096.214.214v3.572a.214.214 0 01-.214.214H4.286a.214.214 0 01-.215-.214V3.57c0-.118.096-.214.215-.214zM16.429 10.929a.5.5 0 01.09.992l-.09.008H3.57a.5.5 0 01-.09-.992l.09-.008H16.43zM16.429 5.214a.5.5 0 01.09.992l-.09.008h-5a.5.5 0 01-.09-.992l.09-.008h5z"></path></g></svg>
        	<div className='feed_name side_bar_text_button'>All</div>
				</div>
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
