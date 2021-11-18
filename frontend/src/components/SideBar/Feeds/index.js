// components
import SourceContainer from '../Sources'

function FeedsContainer({ isLoaded, feeds }){

  return (
    <div className='feeds_container'>
      {feeds && feeds?.map( feed => (
          <div className='feed_container' key={`feed${feed?.id}`}>
            <div>{feed.name}</div>
            <div className='source_container'>
              <SourceContainer sources={feed.Sources} />
            </div>
          </div>
        ))}
    </div>
  );
}

export default FeedsContainer;
  