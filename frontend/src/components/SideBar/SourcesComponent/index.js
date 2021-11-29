import React from 'react';
import { useSelector } from 'react-redux';

// components
import SingleSource from '../SingleSource'
import AddSource from '../AddSource';

function SingleFeed({ feed }) {
  const sessionUser = useSelector(state => state.session.user);
  const sources = useSelector(state => Object.values(state.sources));

  return (
    <div className='source_container'>
      {/* maps out the sources */}
      {sources && sources.filter(source => source.feedId === feed?.id)?.map( source => (
        <div key={`sources${source?.id}`} >
          <SingleSource source={source} />
        </div>
      ))}
      <AddSource feedId={feed.id} userId={sessionUser?.id}/>
    </div>
  );
}

export default SingleFeed;
