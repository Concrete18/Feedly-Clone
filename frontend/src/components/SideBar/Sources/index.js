import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// stores
import { deleteSource, editSource } from '../../../store/sources';

function SingleSource({ isLoaded, source }){
  
  const [showEditSource, setShowEditSource] = useState(false);
  const [sourceName, setSourceName] = useState('')

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
		e.preventDefault();
    setShowEditSource(!showEditSource)
    // TODO move edit into its own component
		const data = {
      // userId:sessionUser.id,
			userId:1,
      id:source.id,
			name:sourceName
		}
		let editedSource = await dispatch(editSource(data))
		if (editedSource) return
	};

  return (
    <div className='single_source'>
      {!showEditSource && (
        <div className='source_name'>{source.name}</div>
      )}
      {showEditSource && (
        <form onSubmit={handleSubmit} className='add_source_form'>
          <input className='edit_source_inputs source_name' type="text" onChange={(e) => setSourceName(e.target.value)} autoFocus defaultValue={source.name} placeholder='Type name' required />
        </form>
      )}
      <div className='delete_source' onClick={ async (e) => {
          e.preventDefault();
          await dispatch(deleteSource(source.id))
        }}>Delete</div>
      <div className='edit_source' onClick={() => {setShowEditSource(!showEditSource)}}>Edit</div>
    </div>
  );
}

export default SingleSource;
