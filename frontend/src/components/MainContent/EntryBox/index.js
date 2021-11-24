import React, { useEffect, useState } from 'react';

const metascraper = require('metascraper')([
	// require('metascraper-author')(),
	// require('metascraper-date')(),
	require('metascraper-image')(),
	// require('metascraper-logo')(),
])
const got = require('got')


function EntryBox({ article }) {
 
  async function parseMetadata(articleUrl) {
    ;(async () => {
      const { body: html, url } = await got(articleUrl)
      const metadata = await metascraper({ html, url })
      console.log(metadata)
    })()
  }

  useEffect(() => {
    parseMetadata(article?.Article?.url)
  }, [])

  return (
    <div className='single_article'>
      {/* <img className='article_image' src={article?.Article.image} alt="article image" /> */}
      <img className='article_image' src={'https://lh3.googleusercontent.com/pxhHGOmNW3SBevC2cHbBQungaguCalKqDmZwsPOSR_dPWc_iw_7HPbNZ2avZAuztx5KWbrjkoCTRFj-WJJmAKUTZ9KA0mw4vz8-VWnc=s324'} alt="article image" />
      <div className='article article_title'>{article?.Article.title}</div>
			<div className='article article_snippet'>{article?.Article.contentSnippet}</div>
      {/* <a className='article_link' href={article?.Article?.url}>Visit Website</a> */}
    </div>
  );
}

export default EntryBox;
