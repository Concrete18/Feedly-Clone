import React, { useState } from "react";
import { Modal } from "../../context/Modal";

// components
import SignupFormPage from "../SignupFormPage";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="sign_up_button" onClick={() => setShowModal(true)}>
        Sign Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
