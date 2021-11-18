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
