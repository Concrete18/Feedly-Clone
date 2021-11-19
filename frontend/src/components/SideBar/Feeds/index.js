import { useDispatch } from 'react-redux';

// stores
import { deleteFeed, editFeed } from '../../../store/feeds';

// components
import SourceContainer from '../Sources'

function FeedsContainer({ isLoaded, feeds }){

  const dispatch = useDispatch();

  return (
    <div className='feeds_container'>
      {feeds && feeds?.map( feed => (
          <div className='feed_container' key={`feed${feed?.id}`}>
            <div>
              <div>{feed.name}</div>
              <svg className='x_delete_feed' onClick={ async (e) => {
                e.preventDefault();
                await dispatch(deleteFeed(feed.id))
              }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
              <svg className='pencil_edit_feed' onClick={ async (e) => {
                e.preventDefault();
                await dispatch(editFeed(feed.id))
              }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
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
  