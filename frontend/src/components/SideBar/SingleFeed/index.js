import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import Sources from '../SourcesComponent'
// stores
import { deleteFeed, editFeed } from '../../../store/feeds';
import { getArticlesByFeed } from '../../../store/articles';

function SingleFeed({ feed }) {
  const sessionUser = useSelector(state => state.session.user);

  // hide sources state
  const [showSources, setShowSources] = useState(false);

  // edit feed state
	const [showButton, setShowButton] = useState(false);
  const [showEditFeed, setShowEditFeed] = useState(false);
  const [feedName, setFeedName] = useState(feed.name)

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
		e.preventDefault();
    setShowEditFeed(!showEditFeed)
		const data = {
      userId:sessionUser.id,
      id:feed.id,
			name:feedName
		}
		let editedFeed = await dispatch(editFeed(data))
		if (editedFeed) return
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		await dispatch(deleteFeed(feed.id))
	};

	const showFeed = async (e) => {
		e.preventDefault();
		await dispatch(getArticlesByFeed(feed.id))
	};
  
  return (
    <>
      <div className='single_feed'
				onMouseEnter={() => setShowButton(true)}
				onMouseLeave={() => setShowButton(false)}>
        <div className='feed_name side_bar_text_button' onClick={() => {setShowSources(!showSources)}}>
				{showSources && (
					<svg transform='rotate(90)' width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="side_bar_icon"><path d="M6.432 3.218a.5.5 0 01.638-.058l.07.058 6.428 6.428a.5.5 0 01.058.638l-.058.07-6.429 6.428a.5.5 0 01-.765-.638l.058-.069 6.075-6.076-6.075-6.074a.5.5 0 01-.058-.638l.058-.07z" fill="currentColor" fill-rule="nonzero"></path></svg>
          )}
				{!showSources && (
					<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="side_bar_icon"><path d="M6.432 3.218a.5.5 0 01.638-.058l.07.058 6.428 6.428a.5.5 0 01.058.638l-.058.07-6.429 6.428a.5.5 0 01-.765-.638l.058-.069 6.075-6.076-6.075-6.074a.5.5 0 01-.058-.638l.058-.07z" fill="currentColor" fill-rule="nonzero"></path></svg>
				)}
				</div>
        {!showEditFeed && (<div className='feed_name side_bar_text_button' onClick={showFeed} >{feed.name}</div>)}
        {showEditFeed && (
          <form onSubmit={handleSubmit} className='add_feed_form'>
            <input className='edit_feed_inputs feed_name' type="text" onChange={(e) => setFeedName(e.target.value)} autoFocus defaultValue={feed.name} placeholder='Type name' required />
          </form>
        )}
				{showButton && !showEditFeed &&(
					<>
						<div className='edit_delete_button side_bar_text_button' onClick={() => {setShowEditFeed(!showEditFeed)}}>Edit</div>
						<div className='edit_delete_button side_bar_text_button' onClick={handleDelete}>Delete</div>
					</>
				)}
      </div>
      {showSources && (
        <Sources feed={feed} />
      )}
    </>
  );
}

export default SingleFeed;
