import { csrfFetch } from "./csrf";

const LOAD = "articles/LOAD";
const ADD = "articles/ADD";
const REMOVE = "articles/REMOVE";

const load = (list) => ({
  type: LOAD,
  list,
});

const add = (article) => ({
  type: ADD,
  article,
});

// const remove = (articleId) => ({
//   type: REMOVE,
//   articleId,
// });

export const updateUserArticles = (userId) => async () => {
  // get all sources from backend
  await csrfFetch(`/api/articles/update/user/${userId}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  })
}

export const getUserArticles = (userId) => async (dispatch) => {
  // get all sources from backend
  const response = await fetch(`/api/articles/user/${userId}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const articles = await response.json();
    // get articles from the given source id
    dispatch(load(articles))
  }
}

export const getArticlesByFeed = (feedId) => async (dispatch) => {
  // get all sources from backend
  const response = await fetch(`/api/articles/feed/${feedId}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const articles = await response.json();
    // get articles from the given source id
    dispatch(load(articles))
  }
}

export const getArticlesBySource = (sourceId) => async (dispatch) => {
  // get all sources from backend
  const response = await fetch(`/api/articles/source/${sourceId}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const articles = await response.json();
    // get articles from the given source id
    dispatch(load(articles))
  }
}

export const setRead = (articleId, userId) => async (dispatch) => {
  // get all sources from backend
  const response = await csrfFetch(`/api/articles/${articleId}/user/${userId}/read/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const articleJoin = await response.json();
    dispatch(add(articleJoin))
  }
}

export const setUnread = (articleId, userId) => async (dispatch) => {
  // get all sources from backend
  const response = await csrfFetch(`/api/articles/${articleId}/user/${userId}/unread/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const articleJoin = await response.json();
    dispatch(add(articleJoin))
  }
}

export const saveArticle = (articleId, userId) => async (dispatch) => {
  // get all sources from backend
  const response = await csrfFetch(`/api/articles/${articleId}/user/${userId}/save`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const articleJoin = await response.json();
    dispatch(add(articleJoin))
  }
}

export const unSaveArticle = (articleId, userId) => async (dispatch) => {
  // get all sources from backend
  const response = await csrfFetch(`/api/articles/${articleId}/user/${userId}/unsave`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const articleJoin = await response.json();
    dispatch(add(articleJoin))
  }
}

const articleReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let article of action.list) {
        newState[article.id] = article;
      }
      return newState;
    case ADD:
      return { ...state, [action.article.id]: action.article };
    case REMOVE:
      const newArticles = { ...state };
      delete newArticles[action.articleId];
      return newArticles;
    default:
      return state;
  }
};

export default articleReducer;
