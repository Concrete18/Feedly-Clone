import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// store
import * as sessionActions from './store/session';

import { Modal } from './context/Modal';

function AddSource() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add Source</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Insert form to add source</h1>
        </Modal>
      )}
    </>
  );
}

export default AddSource;
