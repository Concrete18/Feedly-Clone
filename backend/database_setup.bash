# npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string

npx sequelize model:generate --name Feeds --attributes name:string,userId:integer

npx sequelize model:generate --name Sources --attributes feedId:integer,name:string,url:string

npx sequelize model:generate --name Articles --attributes sourceId:integer,name:string,url:string

npx sequelize model:generate --name Reads --attributes userId:integer,articleId:integer

npx sequelize model:generate --name Saved --attributes userId:integer,articleId:integer

npx sequelize model:generate --name Filter --attributes userId:integer,filter_string:string

npx sequelize seed:generate --name seed_user

npx sequelize seed:generate --name seed_feeds

npx sequelize seed:generate --name seed_sources

npx sequelize seed:generate --name seed_articles

npx sequelize seed:generate --name seed_reads

npx sequelize seed:generate --name seed_saved

npx sequelize seed:generate --name seed_filters
