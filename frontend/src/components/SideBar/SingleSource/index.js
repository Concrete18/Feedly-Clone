import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// stores
import { deleteSource, editSource } from '../../../store/sources';
import { getArticlesBySource } from '../../../store/articles';

function SingleSource({ source }){
  const sessionUser = useSelector(state => state.session.user);
  
	const [showButton, setShowButton] = useState(false);
  const [showEditSource, setShowEditSource] = useState(false);
  const [sourceName, setSourceName] = useState('')

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
		e.preventDefault();
    setShowEditSource(!showEditSource)
		const data = {
      userId:sessionUser.id,
      id:source.id,
			name:sourceName
		}
		let editedSource = await dispatch(editSource(data))
		if (editedSource) return
	};

	const showSource = async (e) => {
		e.preventDefault();
		await dispatch(getArticlesBySource(source.id))
	};

  return (
    <div className='single_source'
			onMouseEnter={() => setShowButton(true)}
			onMouseLeave={() => setShowButton(false)}>
      {!showEditSource && (
        <div className='source_name side_bar_text_button' onClick={showSource} >{source.name}</div>
      )}
      {showEditSource && (
        <form onSubmit={handleSubmit} className='add_source_form'>
          <input className='edit_source_inputs source_name' type="text" onChange={(e) => setSourceName(e.target.value)} autoFocus defaultValue={source.name} placeholder='Type name' required />
        </form>
      )}
			{showButton && (
				<>
            <div className='edit_delete_button side_bar_text_button' onClick={() => {setShowEditSource(!showEditSource)}}>Edit</div>
					<div className='edit_delete_button side_bar_text_button' onClick={ async (e) => {
						e.preventDefault();
						await dispatch(deleteSource(source.id))
					}}>Delete</div>
				</>
			)}
    </div>
  );
}

export default SingleSource;
