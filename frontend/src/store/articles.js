let Parser = require('rss-parser');

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


let parser = new Parser();

export const getArticles = (userId) => async (dispatch) => {
  const response = await fetch(`/api/articles/user/${userId}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const feed = await response.json();
    const sources = feed[0].Sources

    let articles = []
    for (let source of sources) {
      console.log(source)
      try {
        // const url = `${source.url}`
        const url = `https://cors-anywhere.herokuapp.com/${source.url}`
        let feed = await parser.parseURL(url);
        console.log(feed.title);
      
        feed.items.forEach(item => {
          const entry = {
            title:item.title,
            creator:item.creator,
            link:item.link,
            pubDate:item.pubDate,
            content:item.content,
            contentSnippet:item.contentSnippet,
          }
          articles.push(entry)
        });
      } catch (typeError) {
        console.log('Failed to get feed')
      }

      // try {
      //   let rss_response = await fetch(source.url, { mode: 'o-cors' })
      //   if (rss_response.ok) {
      //     rss_response = rss_response.text()
      //     let data = new window.DOMParser().parseFromString(rss_response, "text/xml")
      //     const items = data.querySelectorAll("item");
      //     console.log(items)
      //     articles.push(data)
      //   }
      // } catch (typeError) {

      // }
    }
    console.log(articles)
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
