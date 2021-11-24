import { csrfFetch } from './csrf';

const LOAD = "sources/LOAD";
const ADD = "sources/ADD";
const REMOVE = "sources/REMOVE";

const load = (list) => ({
  type: LOAD,
  list,
});

const add = (source) => ({
  type: ADD,
  source,
});

const remove = (sourceId) => ({
  type: REMOVE,
  sourceId,
});

export const getSourcesByUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/sources/user/${userId}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const sources = await response.json();
    console.log('\n\n\n\n\n', sources)
    dispatch(load(sources));
    return sources
  }
}

export const getSourcesByFeed = (feedId) => async (dispatch) => {
  const response = await fetch(`/api/sources/feed/${feedId}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const sources = await response.json();
    dispatch(load(sources));
    return sources
  }
}

export const addSource = (source) => async (dispatch) => {
  const { userId, name, url, feedId } = source;
  const response = await csrfFetch("/api/sources/new", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      url,
      userId,
      feedId
    }),
  });
  const data = await response.json();
  dispatch(add(data));
  return data;
}

export const deleteSource = (sourceId) => async (dispatch) => {
  const response = await csrfFetch(`/api/sources/delete/${sourceId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(remove(sourceId));
    return sourceId;
  }
}

export const editSource = (formData) => async (dispatch) => {
  const response = await csrfFetch(`/api/sources/update/${formData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (response.ok) {
    const source = await response.json();
    dispatch(add(source));
  }
}

const sourceReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let source of action.list) {
        newState[source.id] = source;
      }
      return newState;
    case ADD:
      return { ...state, [action.source.id]: action.source };
    case REMOVE:
      const newSources = { ...state };
      delete newSources[action.sourceId];
      return newSources;
    default:
      return state;
  }
};

export default sourceReducer;
