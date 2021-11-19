
function SourceContainer({ isLoaded, sources }){
  
  return (
    <div className='source_container'>
      {sources && sources?.map( source => (
          <div key={`sources${source?.id}`} >{source.name}</div>
        ))}
    </div>
  );
}

export default SourceContainer;
