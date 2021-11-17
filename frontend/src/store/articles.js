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

const remove = (articleId) => ({
  type: REMOVE,
  articleId,
});

export const getArticles = (userId) => async (dispatch) => {
  const response = await fetch(`/api/articles/${userId}/all`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const feed = await response.json();

    console.log(feed)
    
    for (let source of feed.sources) {
      await fetch(source.url)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => console.log(data))
    }
    let articles
    dispatch(load(articles));
    return articles
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
