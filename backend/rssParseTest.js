const axios = require('axios');
const cheerio = require('cheerio');

async function getMetaData(url) {
  const res = await axios.get(url)
  .catch(function (error) {
    if (error.request) {
      // The request was made but no response was received
      return false;
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log('Error', error.message);
    }
  });
  if (!res) return false;
  const $ = cheerio.load(res.data);
  metaData = {
    'image': [
      'meta[property="og:image"]',
      'meta[name="parsely-image-url"]',
      'meta[name="twitter:image"]',
      'meta[name="twitter:image:src"]'
    ],
    'siteName': [
      'meta[property="og:site_name"]',
      'meta[name="twitter:site"]'
    ],
    'pubDate': [
      'meta[property="article:published_time"]',
      'meta[name="parsely-pub-date"]',
      'meta[name="publish-date"]',
      'meta[name="pub_date"]'
    ],
    'creator': [
      'meta[name="author"]'
    ],
    'description': [
      'meta[property="og:description"]'
    ]
  };
  let foundMetaData = {};
  for (const [name, keys] of Object.entries(metaData)) {
    for (const key of keys) {
      content = $(key).attr('content');
      if (content) {
        foundMetaData[name] = content;
        continue;
      }
    }
  }
  return foundMetaData;
}

// getMetaData('https://blog.playstation.com/2021/12/07/uncharted-legacy-of-thieves-collection-details-on-the-remastered-bundle/')
// getMetaData('https://www.polygon.com/22832955/succession-and-on-cinema-media')
// getMetaData('https://www.techradar.com/reviews/the-matrix-resurrections')
// getMetaData('https://kotaku.com/xbox-game-pass-pc-gets-a-new-name-and-four-more-day-one-1848181194')
// getMetaData('https://gizmodo.com/5-predictions-for-the-near-future-from-bill-gates-1848191710')
// getMetaData('https://www.nytimes.com/2021/12/21/movies/lucille-ball-being-the-ricardos.html')
console.log(getMetaData('https://www.wired.com/story/the-quest-to-trap-carbon-in-stone-and-beat-climate-change/'))



function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  // if (interval > 1) {
  //   return Math.floor(interval) + "y";
  // }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "mo";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "min";
  }
  return Math.floor(seconds) + "s";
}
