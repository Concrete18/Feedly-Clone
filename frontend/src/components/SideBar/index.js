import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// stores
import { addFeed } from "../../store/feeds";
import { getSavedArticles } from "../../store/articles";
// import { getUserArticles } from '../../store/articles';
import * as sessionActions from "../../store/session";

// components
import FeedsComponent from "./FeedsComponent";

import "./side_bar.css";

function SideBar() {
  const sessionUser = useSelector((state) => state.session.user);

  const [showAddFeed, setShowAddFeed] = useState(false);
  const [feedName, setFeedName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAddFeed(!showAddFeed);
    const data = {
      userId: sessionUser.id,
      name: feedName,
    };
    let addedFeed = await dispatch(addFeed(data));
    if (addedFeed) return;
  };

  const showSaved = async (e) => {
    e.preventDefault();
    await dispatch(getSavedArticles(sessionUser.id));
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="side_bar">
      <div className="side_bar_contents">
        {/* <div className='read_later_button side_bar_text_button bottom_padding' onClick={showSaved} >Read Later</div> */}
        <div
          className="bottom_padding side_bar_text_button"
          onClick={showSaved}
        >
          Read Later
        </div>
        <div className="bottom_padding">Feeds</div>
        <FeedsComponent />
        <div className="options">
          <div
            className="create_feed_button side_bar_text_button bottom_padding"
            onClick={() => {
              setShowAddFeed(!showAddFeed);
            }}
          >
            Create New Feed
          </div>
          {showAddFeed && (
            <form onSubmit={handleSubmit} className="add_feed_form">
              <div className="add_feed_inputs">
                <label className="form_label">Feed Name</label>
                <input
                  type="text"
                  onChange={(e) => setFeedName(e.target.value)}
                  autoFocus
                  placeholder="Type name"
                  required
                />
              </div>
              {/* <button className='button add_feed_button' type="submit">Add Feed</button> */}
            </form>
          )}
          <div className="log_out_button side_bar_text_button" onClick={logout}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
