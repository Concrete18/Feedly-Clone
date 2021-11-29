import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

// stores
import { addSource } from '../../../store/sources';
import { updateUserArticles, getUserArticles } from "../../../store/articles";

function AddSource({ feedId, userId }) {
	const dispatch = useDispatch();

	const sessionUser = useSelector(state => state.session.user);
	// useStates
	const [showAddSource, setShowAddSource] = useState('');
	const [sourceName, setSourceName] = useState('');
	const [sourceUrl, setSourceUrl] = useState('');


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
		await dispatch(updateUserArticles(sessionUser.id));
		await dispatch(getUserArticles(sessionUser.id));
		if (createdSource) return;
	};

	return (
		<div className='add_source_form'>
			<div className='new_source_button side_bar_text_button' onClick={() => {setShowAddSource(!showAddSource)}}>Follow New Source</div>
			{showAddSource && (
				<form onSubmit={handleSubmit} className='add_source_form'>
					<div className='add_source_inputs'>
            <div className='source_name_add'>
              <label className='form_label'>Source Name</label>
              <input type="text" onChange={(e) => setSourceName(e.target.value)} autoFocus placeholder='Type name' required />
            </div>
            <div className='source_url_add'>
              <label className='form_label'>Source RSS URL</label>
              <input type="text" onChange={(e) => setSourceUrl(e.target.value)} autoFocus placeholder='Type url' required />
            </div>
					</div>
					<button className='button add_source_button' type="submit">Follow Source</button>
				</form>
			)}
		</div>
	);
}

export default AddSource;
