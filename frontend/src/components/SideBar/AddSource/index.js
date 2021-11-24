import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// stores
import { addSource } from '../../../store/sources';

function AddSource({ feedId, userId }) {
  // useStates
  const [showAddSource, setShowAddSource] = useState('')
  const [sourceName, setSourceName] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')

  const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
      userId,
      feedId,
			name:sourceName,
      url:sourceUrl, 
		};
    setShowAddSource(!showAddSource);
		let createdSource = await dispatch(addSource(data));
		if (createdSource) return;
	};

  return (
    <div className='add_source_form'>
      <div onClick={() => {setShowAddSource(!showAddSource)}}>Follow New Source</div>
      {showAddSource && (
        <form onSubmit={handleSubmit} className='add_source_form'>
          <div className='add_source_inputs'>

            <label>Source Name
              <input type="text" onChange={(e) => setSourceName(e.target.value)} autoFocus placeholder='Type name' required />
            </label>
            <label>Source RSS URL
              <input type="text" onChange={(e) => setSourceUrl(e.target.value)} autoFocus placeholder='Type url' required />
            </label>

          </div>
          <button className='button add_source_button' type="submit">Follow Source</button>
        </form>
			)}
    </div>
  );
}

export default AddSource;
