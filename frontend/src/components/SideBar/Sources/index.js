
function SourceContainer({ isLoaded, sources }){
  
  console.log(sources)

  return (
    <div className='source_container'>
      {sources && sources?.map( source => (
          <div>{source.name}</div>
        ))}
    </div>
  );
}

export default SourceContainer;
