import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// stores
import { deleteSource, editSource } from "../../../store/sources";
import { getArticlesBySource } from "../../../store/articles";

function SingleSource({ source }) {
  const sessionUser = useSelector((state) => state.session.user);

  const [showButton, setShowButton] = useState(false);
  const [showEditSource, setShowEditSource] = useState(false);
  const [sourceName, setSourceName] = useState("");
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.length === 0) {
      setShowEditSource(!showEditSource);
      const data = {
        userId: sessionUser.id,
        id: source.id,
        name: sourceName,
      };
      let editedSource = await dispatch(editSource(data));
      if (editedSource) return;
    }
  };

  const showSource = async (e) => {
    e.preventDefault();
    await dispatch(getArticlesBySource(source.id));
  };

  const handleFocusLoss = async (e) => {
    e.preventDefault();
    setShowEditSource(!showEditSource);
  };

  return (
    <div
      className="single_source"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      {!showEditSource && (
        <div className="source_name side_bar_text_button" onClick={showSource}>
          {source.name}
        </div>
      )}
      {showEditSource && (
        <form onSubmit={handleSubmit} className="add_source_form">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <input
            className="edit_text_input source_name"
            type="text"
            onBlur={handleFocusLoss}
            onChange={(e) => {
              const lengthLimit = 20;
              setErrors([]);
              const newErrors = [];
              if (e.target.value.length > lengthLimit) {
                newErrors.push(`Too long: Make name less then ${lengthLimit}`);
              }
              if (e.target.value[0] === " ") {
                newErrors.push("Can't Start with an empty space");
              }
              setErrors(newErrors);
              setSourceName(e.target.value);
            }}
            autoFocus
            defaultValue={source.name}
            placeholder="Type name"
            required
          />
        </form>
      )}
      {showButton && (
        <>
          <div
            className="edit_delete_button side_bar_text_button"
            onClick={() => {
              setShowEditSource(!showEditSource);
            }}
          >
            Edit
          </div>
          <div
            className="edit_delete_button side_bar_text_button"
            onClick={async (e) => {
              e.preventDefault();
              await dispatch(deleteSource(source.id));
            }}
          >
            Delete
          </div>
        </>
      )}
    </div>
  );
}

export default SingleSource;
