# Feedler

![Feedler Logo](https://raw.githubusercontent.com/Concrete18/Feedly-Clone/main/frontend/public/assets/Feedler_Logo.png)


This is an RSS Reader website based on [Feedly](https://feedly.com/). It allows you to set up feeds for whatever you want with many sources in each.
With Feedler you can view all your articles easily and get to them with just a single click from the expanded view.

Here is my [Live Site](https://feedly-clone.herokuapp.com/).

![Articles Screenshot](https://raw.githubusercontent.com/Concrete18/Feedly-Clone/main/frontend/public/assets/Articles.png)


![Feeds Screenshot](https://raw.githubusercontent.com/Concrete18/Feedly-Clone/main/frontend/public/assets/Feeds.png)

---
## Features

* Feeds with full CRUD
* Sources with full CRUD
* Auto populated articles based on sources
* View articles by feed, source, or all at once.
* Full Sign up and login with a quick to access Demo user.

---
## How To

### Create Feeds

Click on `Create New Feed` in order to type in your new feeds name. Click it again if you do not want to create a new feed after pressing.

### Edit & Delete Feeds

Hover over the feed you want to edit or delete, then click the corresponding button that appears.

### Create Sources

1. After clicking the arrow that expands feeds, click `Follow New Source` in order to bring up the inputs. Click it again if you do not want to follow a new source.
2. Type in your new sources name.
3. Type in your new sources url to the rss feed. It must lead to an .XML file for the feed. Examples are given [here](#Example-RSS-Feeds).
4. This will add the source and pull the articles for that source into the bottom of your feed as if you clicked the show all feeds button.

### Edit & Delete Sources

Hover over the source you want to edit or delete, then click the corresponding button that appears.

### Show Articles

All articles are shown by default. You can click any feed or source in order to only show the articles within the clicked feed/source.

---

## Future Features

* Read Status
* Saved for Later
* Search

---
## Stack

* JavaScript
* React & Redux
* PostgreSQL
* Sequelize 
* Express

---
## Example RSS Feeds

```
http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml
https://www.polygon.com/rss/index.xml
https://blog.playstation.com/feed/
https://www.autoblog.com/rss.xml
https://www.wired.com/feed/rss
http://www.techradar.com/rss
```
