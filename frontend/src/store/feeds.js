import { csrfFetch } from './csrf';

const LOAD = "feeds/LOAD";
const ADD = "feeds/ADD";
const REMOVE = "feeds/REMOVE";

const load = (list) => ({
  type: LOAD,
  list,
});

const add = (feed) => ({
  type: ADD,
  feed,
});

const remove = (feedId) => ({
  type: REMOVE,
  feedId,
});

export const getFeeds = (userId) => async (dispatch) => {
  const response = await fetch(`/api/feeds/user/${userId}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const feeds = await response.json();
    dispatch(load(feeds));
    return feeds
  }
}

export const addFeed = (feed) => async (dispatch) => {
  const { name, userId } = feed;
  const response = await csrfFetch("/api/feeds/new", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      userId
    }),
  });
  const data = await response.json();
  dispatch(add(data));
  return data;
}

export const deleteFeed = (feedId) => async (dispatch) => {
  const response = await csrfFetch(`/api/feeds/delete/${feedId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(remove(feedId));
    return feedId;
  }
}

export const editFeed = (formData) => async (dispatch) => {
  const response = await csrfFetch(`/api/feeds/update/${formData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (response.ok) {
    const feed = await response.json();
    dispatch(add(feed));
  }
}

const feedReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let feed of action.list) {
        newState[feed.id] = feed;
      }
      return newState;
    case ADD:
      return { ...state, [action.feed.id]: action.feed };
    case REMOVE:
      const newFeeds = { ...state };
      delete newFeeds[action.feedId];
      return newFeeds;
    default:
      return state;
  }
};

export default feedReducer;
